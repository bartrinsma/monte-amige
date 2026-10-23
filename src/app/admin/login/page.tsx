import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { LoginForm, SetupForm } from "./LoginForm";

export const metadata: Metadata = { title: "Inloggen" };

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin/");
  const configured = await adminConfigured();
  return (
    <main className="adm-login">
      <div className="adm-card">
        <div className="adm-card-body">
          <div className="adm-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo.png" alt="" />
            <span>
              Monte Amigo
              <small>Beheer</small>
            </span>
          </div>
          {configured ? <LoginForm /> : <SetupForm />}
        </div>
      </div>
    </main>
  );
}
