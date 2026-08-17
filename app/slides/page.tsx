import { SlideDeck } from "@/components/SlideDeck";

export default async function SlidesPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string; section?: string; start?: string }>;
}) {
  const sp = await searchParams;
  return (
    <SlideDeck
      embed={sp.embed === "1"}
      section={sp.section}
      start={sp.start}
    />
  );
}
