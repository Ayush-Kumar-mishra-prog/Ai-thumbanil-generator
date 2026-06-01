import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2Icon, XCircleIcon, XIcon } from "lucide-react";

type NotificationType = "success" | "error";

type Notification = {
  id: number;
  message: string;
  type: NotificationType;
};

type NotificationContextValue = {
  notify: (message: string, type?: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextValue>({
  notify: () => {},
});

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: number) => {
    setNotifications((current) => current.filter((item) => item.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, type: NotificationType = "success") => {
      const id = Date.now();
      setNotifications((current) => [...current, { id, message, type }]);
      window.setTimeout(() => removeNotification(id), 3500);
    },
    [removeNotification],
  );

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed right-4 top-24 z-[120] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
        {notifications.map((notification) => {
          const Icon =
            notification.type === "success" ? CheckCircle2Icon : XCircleIcon;

          return (
            <div
              key={notification.id}
              className="flex items-start gap-3 rounded-lg border border-[var(--brand)]/20 bg-[var(--paper)] px-4 py-3 text-[var(--brand)] shadow-2xl shadow-[var(--brand)]/15"
            >
              <Icon className="mt-0.5 size-5 shrink-0" />
              <p className="flex-1 text-sm font-medium">
                {notification.message}
              </p>
              <button
                type="button"
                onClick={() => removeNotification(notification.id)}
                className="rounded p-0.5 text-[var(--brand)]/70 transition hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]"
                aria-label="Dismiss message"
              >
                <XIcon className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
}

export const useNotify = () => useContext(NotificationContext);
