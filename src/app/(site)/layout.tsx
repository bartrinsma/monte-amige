import "../site.css";
import "../calendar.css";
import type { Metadata } from "next";
import { connection } from "next/server";
import { Analytics } from "@/components/site/Analytics";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteStructuredData } from "@/components/site/StructuredData";
import { googleSettings } from "@/lib/settings";

// Google-koppelingen komen uit de database (Instellingen → Google koppelingen); daarom per request.
export async function generateMetadata(): Promise<Metadata> {
  await connection();
  const google = await googleSettings();
  return google.searchConsole ? { verification: { google: google.searchConsole } } : {};
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  await connection();
  const google = await googleSettings();
  return (
    <div className="site">
      <SiteStructuredData />
      <SiteHeader />
      {children}
      <SiteFooter />
      {google.analyticsId && <Analytics id={google.analyticsId} />}
    </div>
  );
}
