import { createRoot } from "react-dom/client";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.js";
import { NotificationProvider } from "./context/notificationContext.js";
import { ApiSettingsProvider } from "./context/apiSettingsContext.js";
import ScrollToTop from "./components/ScrollToTop.js";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <NotificationProvider>
      <ApiSettingsProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApiSettingsProvider>
    </NotificationProvider>
  </BrowserRouter>,
);
