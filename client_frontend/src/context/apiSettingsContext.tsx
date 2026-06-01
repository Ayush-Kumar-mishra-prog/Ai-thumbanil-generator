import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const apiProviders = ["OpenRouter"] as const;
export type ApiProvider = (typeof apiProviders)[number];

export const openRouterModels = [
  "google/gemini-3.1-flash-image-preview",
  "google/gemini-2.5-flash-image-preview",
  "openai/gpt-image-1",
] as const;

type ApiSettings = {
  provider: ApiProvider;
  model: string;
  apiKey: string;
  setProvider: (provider: ApiProvider) => void;
  setModel: (model: string) => void;
  setApiKey: (apiKey: string) => void;
  hasApiKey: boolean;
};

const ApiSettingsContext = createContext<ApiSettings>({
  provider: "OpenRouter",
  model: openRouterModels[0],
  apiKey: "",
  setProvider: () => {},
  setModel: () => {},
  setApiKey: () => {},
  hasApiKey: false,
});

export function ApiSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [provider, setProvider] = useState<ApiProvider>(() => {
    const savedProvider = localStorage.getItem("thumblify_api_provider");
    return savedProvider === "OpenRouter" ? savedProvider : "OpenRouter";
  });
  const [model, setModel] = useState(() => {
    return localStorage.getItem("thumblify_api_model") || openRouterModels[0];
  });
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("thumblify_api_key") || "";
  });

  useEffect(() => {
    localStorage.setItem("thumblify_api_provider", provider);
    localStorage.setItem("thumblify_api_model", model);
    localStorage.setItem("thumblify_api_key", apiKey);
  }, [apiKey, model, provider]);

  const value = useMemo(
    () => ({
      provider,
      model,
      apiKey,
      setProvider,
      setModel,
      setApiKey,
      hasApiKey: Boolean(apiKey.trim()),
    }),
    [apiKey, model, provider],
  );

  return (
    <ApiSettingsContext.Provider value={value}>
      {children}
    </ApiSettingsContext.Provider>
  );
}

export const useApiSettings = () => useContext(ApiSettingsContext);
