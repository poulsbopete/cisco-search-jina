import { redirect } from "next/navigation";

/** Legacy /ech deep links → /deploy */
export default function EchRedirectPage() {
  redirect("/deploy");
}
