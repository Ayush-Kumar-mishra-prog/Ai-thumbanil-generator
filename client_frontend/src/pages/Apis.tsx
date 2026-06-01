import { KeyRoundIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  apiProviders,
  openRouterModels,
  useApiSettings,
} from "../context/apiSettingsContext";
import { useNotify } from "../context/notificationContext";

const OPENROUTER_KEYS_URL = "https://openrouter.ai/settings/keys";

export default function Apis() {
  const { provider, setProvider, model, setModel, apiKey, setApiKey } =
    useApiSettings();
  const { notify } = useNotify();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  const handleSave = () => {
    if (!apiKey.trim()) {
      notify("Please enter your API key first", "error");
      return;
    }

    notify("API settings saved successfully");
    if (redirectTo) navigate(redirectTo);
  };

  const handleGetApiKey = () => {
    if (provider === "OpenRouter") {
      window.open(OPENROUTER_KEYS_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main className="min-h-screen px-6 pb-20 pt-28 md:px-16 lg:px-24 xl:px-32">
      <section className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          <p className="w-max rounded-full border border-[var(--brand)]/20 bg-[var(--paper)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
            API setup
          </p>
          <h1 className="max-w-xl text-4xl font-bold leading-tight text-[var(--brand)] md:text-5xl">
            Connect your model before generating thumbnails.
          </h1>
          <p className="max-w-xl text-base leading-7 text-[var(--brand)]/70">
            Your key stays in this browser and is sent only when you generate a
            thumbnail.
          </p>
        </div>

        <div className="rounded-lg border border-[var(--brand)]/15 bg-[var(--paper)] p-6 shadow-2xl shadow-[var(--brand)]/10">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-lg bg-[var(--brand)] text-[var(--paper)]">
              <KeyRoundIcon className="size-5" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-[var(--brand)]">
                Model access
              </h2>
              <p className="text-sm text-[var(--brand)]/60">
                Choose provider, model, and API key.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[var(--brand)]">
                Model provider
              </span>
              <select
                value={provider}
                onChange={(event) => setProvider(event.target.value as any)}
                className="w-full rounded-lg border border-[var(--brand)]/20 bg-[#fff8f0] px-4 py-3 text-[var(--brand)] outline-none transition focus:border-[var(--brand)]"
              >
                {apiProviders.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-[var(--brand)]">
                Thumbnail model
              </span>
              <select
                value={model}
                onChange={(event) => setModel(event.target.value)}
                className="w-full rounded-lg border border-[var(--brand)]/20 bg-[#fff8f0] px-4 py-3 text-[var(--brand)] outline-none transition focus:border-[var(--brand)]"
              >
                {openRouterModels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-[var(--brand)]">
                Enter API key
              </span>
              <input
                type="password"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                placeholder="sk-or-v1-..."
                className="w-full rounded-lg border border-[var(--brand)]/20 bg-[#fff8f0] px-4 py-3 text-[var(--brand)] outline-none transition placeholder:text-[var(--brand)]/35 focus:border-[var(--brand)]"
              />
            </label>

            <button
              type="button"
              onClick={handleGetApiKey}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--brand)]/25 px-4 py-2.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)]/10"
            >
              Get API key
              <SquareArrowOutUpRightIcon className="size-4" />
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="w-full rounded-lg bg-[var(--brand)] px-5 py-3 font-semibold text-[var(--paper)] transition hover:bg-[var(--brand-dark)]"
            >
              Save API settings
            </button>
          </div>
        </div>

        <div className="lg:col-start-2 rounded-lg border border-[var(--brand)]/15 bg-[var(--brand)] px-6 py-5 text-[var(--paper)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
            Selected model
          </p>
          <p className="mt-2 break-all text-lg font-semibold">{model}</p>
          <p className="mt-1 text-sm opacity-75">{provider}</p>
        </div>
      </section>
    </main>
  );
}
