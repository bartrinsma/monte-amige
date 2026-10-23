"use client";

import { useActionState } from "react";
import { login, setupPassword } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="adm-form">
      <div className="adm-field">
        <label htmlFor="password">Wachtwoord</label>
        <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" />
      </div>
      {state?.error && <p className="adm-error">{state.error}</p>}
      <button type="submit" className="adm-btn block" disabled={pending}>
        {pending ? "Bezig…" : "Inloggen"}
      </button>
    </form>
  );
}

/** Eerste bezoek: wachtwoord kiezen. */
export function SetupForm() {
  const [state, action, pending] = useActionState(setupPassword, undefined);

  return (
    <form action={action} className="adm-form">
      <p className="adm-flash info" style={{ margin: 0 }}>
        Welkom! Kies een wachtwoord voor het beheer. Daarmee log je voortaan in.
      </p>
      <div className="adm-field">
        <label htmlFor="password">Nieuw wachtwoord</label>
        <input id="password" name="password" type="password" required minLength={8} autoFocus autoComplete="new-password" />
        <p className="hint">Minimaal 8 tekens.</p>
      </div>
      <div className="adm-field">
        <label htmlFor="repeat">Herhaal wachtwoord</label>
        <input id="repeat" name="repeat" type="password" required minLength={8} autoComplete="new-password" />
      </div>
      {state?.error && <p className="adm-error">{state.error}</p>}
      <button type="submit" className="adm-btn block" disabled={pending}>
        {pending ? "Bezig…" : "Wachtwoord opslaan en inloggen"}
      </button>
    </form>
  );
}
