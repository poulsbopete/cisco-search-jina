#!/bin/bash
# Track-level cleanup — delete the per-learner Elastic Cloud Serverless project.
# Runs on: learner Stop, idle timeout, track time limit, or host teardown.
#
# Exit 0 when there is nothing to delete so Instruqt teardown stays clean.
set -u

echo "=== Serverless project cleanup ==="

# Agent vars from setup (preferred), then config.yml env, then Search default.
_av_type="$(agent variable get ES_PROJECT_TYPE 2>/dev/null || true)"
_av_regions="$(agent variable get ES_REGIONS 2>/dev/null || true)"
_av_id="$(agent variable get ES_DEPLOYMENT_ID 2>/dev/null || true)"

PROJECT_TYPE="${_av_type:-${PROJECT_TYPE:-elasticsearch}}"
case "$PROJECT_TYPE" in
  elasticsearch|observability|security) ;;
  *) PROJECT_TYPE=elasticsearch ;;
esac

REGIONS="${_av_regions:-${REGIONS:-aws-us-east-1}}"
DEPLOYMENT_ID="${_av_id:-}"
if [ "${DEPLOYMENT_ID}" = "null" ]; then DEPLOYMENT_ID=""; fi

if [ -z "${DEPLOYMENT_ID}" ] && [ -f /tmp/project_results.json ]; then
  DEPLOYMENT_ID="$(jq -r --arg r "$REGIONS" '.[$r].id // empty' /tmp/project_results.json 2>/dev/null || true)"
  if [ "${DEPLOYMENT_ID}" = "null" ]; then DEPLOYMENT_ID=""; fi
fi

echo "Project type: $PROJECT_TYPE"
echo "Regions: $REGIONS"
echo "Deployment ID: ${DEPLOYMENT_ID:-<not set>}"

PME_CLOUD_INSTRUQT_API_KEY="${PME_CLOUD_INSTRUQT_API_KEY:-${ESS_CLOUD_API_KEY:-}}"
if [ -z "${PME_CLOUD_INSTRUQT_API_KEY}" ]; then
  PME_CLOUD_INSTRUQT_API_KEY="$(agent variable get ESS_CLOUD_API_KEY 2>/dev/null || true)"
fi
if [ -z "${PME_CLOUD_INSTRUQT_API_KEY}" ]; then
  PME_CLOUD_INSTRUQT_API_KEY="$(agent variable get PME_CLOUD_INSTRUQT_API_KEY 2>/dev/null || true)"
fi

if [ -z "${DEPLOYMENT_ID}" ]; then
  echo "No Serverless project ID — nothing to delete (setup may have failed before create)."
  exit 0
fi
if [ -z "${PME_CLOUD_INSTRUQT_API_KEY}" ]; then
  echo "ERROR: ESS_CLOUD_API_KEY not set — cannot delete project $DEPLOYMENT_ID" >&2
  exit 1
fi

export PME_CLOUD_INSTRUQT_API_KEY

set +e
python3 bin/es3-api.py \
  --operation delete \
  --project-type "$PROJECT_TYPE" \
  --regions "$REGIONS" \
  --project-id "$DEPLOYMENT_ID" \
  --api-key "${PME_CLOUD_INSTRUQT_API_KEY}"
rc=$?
set -e

if [ "$rc" -ne 0 ]; then
  echo "WARN: delete returned status $rc (project may already be gone)" >&2
  exit 0
fi

echo "Deleted Serverless project: $DEPLOYMENT_ID"
echo "Done"
exit 0
