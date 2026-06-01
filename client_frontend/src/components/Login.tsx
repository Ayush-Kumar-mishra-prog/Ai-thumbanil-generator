import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LockKeyholeIcon, MailIcon, UserIcon } from "lucide-react";

export default function Login() {
  const [state, setState] = useState("login");

  const { user, login, signup, authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "login") {
      void login(formData);
    } else {
      void signup(formData);
    }
  };
  useEffect(() => {
    if (user) {
      navigate(redirectTo);
    }
  }, [user, navigate, redirectTo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <div className="flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,var(--brand)_0%,rgba(129,11,56,0.08)_72%,transparent_100%)]" />
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-md rounded-lg border border-[var(--brand)]/15 bg-[var(--paper)] px-7 py-8 text-center shadow-2xl shadow-[var(--brand)]/15"
        >
          <p className="mx-auto mb-5 flex size-12 items-center justify-center rounded-lg bg-[var(--brand)] text-xl font-bold text-[var(--paper)]">
            T
          </p>
          <h1 className="text-3xl font-semibold text-[var(--brand)]">
            {state === "login" ? "Login" : "Sign up"}
          </h1>

          <p className="mt-2 text-sm text-[var(--brand)]/65">
            Continue to Thumblify
          </p>

          {state !== "login" && (
            <div className="mt-7 flex h-12 w-full items-center gap-2 overflow-hidden rounded-lg border border-[var(--brand)]/20 bg-[#fff8f0] pl-4">
              <UserIcon className="size-4 text-[var(--brand)]/55" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full border-none bg-transparent text-[var(--brand)] outline-none placeholder:text-[var(--brand)]/40"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div
            className={`${state === "login" ? "mt-7" : "mt-4"} flex h-12 w-full items-center gap-2 overflow-hidden rounded-lg border border-[var(--brand)]/20 bg-[#fff8f0] pl-4`}
          >
            <MailIcon className="size-4 text-[var(--brand)]/55" />
            <input
              type="email"
              name="email"
              placeholder="Email id"
              className="w-full border-none bg-transparent text-[var(--brand)] outline-none placeholder:text-[var(--brand)]/40"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4 flex h-12 w-full items-center gap-2 overflow-hidden rounded-lg border border-[var(--brand)]/20 bg-[#fff8f0] pl-4">
            <LockKeyholeIcon className="size-4 text-[var(--brand)]/55" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border-none bg-transparent text-[var(--brand)] outline-none placeholder:text-[var(--brand)]/40"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4 text-left">
            <button
              type="button"
              className="text-sm text-[var(--brand)]/70 hover:text-[var(--brand)]"
            >
              Forget password?
            </button>
          </div>

          {authLoading ? (
            <div className="mt-2 h-11 w-full rounded-lg bg-[var(--brand)] text-[var(--paper)] flex items-center justify-center">
              <span className="w-5 h-5 border-2 border-[var(--paper)]/40 border-t-[var(--paper)] rounded-full animate-spin" />
            </div>
          ) : (
            <button
              type="submit"
              className="mt-2 h-11 w-full rounded-lg bg-[var(--brand)] text-[var(--paper)] transition hover:bg-[var(--brand-dark)]"
            >
              {state === "login" ? "Login" : "Sign up"}
            </button>
          )}

          <p
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className="mt-4 cursor-pointer text-sm text-[var(--brand)]/65"
          >
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span className="ml-1 font-semibold text-[var(--brand)] hover:underline">
              click here
            </span>
          </p>
        </form>
      </div>
    </>
  );
}
