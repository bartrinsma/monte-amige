import Link from "next/link";

const TABS = [
  { href: "/admin/instellingen/", label: "Algemeen", key: "algemeen" },
  { href: "/admin/instellingen/google/", label: "Google koppelingen", key: "google" },
] as const;

export function SettingsTabs({ active }: { active: (typeof TABS)[number]["key"] }) {
  return (
    <nav className="adm-tabs" aria-label="Instellingen">
      {TABS.map((t) => (
        <Link key={t.key} href={t.href} aria-current={t.key === active ? "page" : undefined}>
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
