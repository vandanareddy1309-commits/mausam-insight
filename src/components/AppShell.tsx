import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Map, CalendarDays, BellRing, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { sortedAlerts } from "@/lib/weather-data";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/map", label: "Map", icon: Map },
  { to: "/forecast", label: "Forecast", icon: CalendarDays },
  { to: "/alerts", label: "Alerts", icon: BellRing },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideNav = pathname.startsWith("/onboarding");
  const extremeCount = sortedAlerts().filter((a) => a.level === "extreme").length;

  return (
    <div className="min-h-dvh bg-primary-deep/5 sm:py-4">
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] bg-background sm:min-h-[calc(100dvh-2rem)] sm:overflow-hidden sm:rounded-[2.4rem] sm:shadow-float sm:ring-8 sm:ring-primary-deep/90">
        <main className={hideNav ? "min-h-dvh" : "min-h-dvh pb-24"}>{children}</main>

        {!hideNav && (
          <nav
            aria-label="Main navigation"
            className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:absolute sm:left-0 sm:translate-x-0"
          >
            <div className="glass-light flex items-center justify-between rounded-[1.6rem] px-2 py-2 shadow-float">
              {NAV.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="group relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-1.5 text-[10.5px] font-semibold text-muted-foreground transition-all press"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: to === "/" }}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`relative flex h-9 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                          isActive ? "bg-primary text-primary-foreground shadow-glow" : "group-hover:bg-secondary"
                        }`}
                      >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.4 : 2} />
                        {to === "/alerts" && extremeCount > 0 && (
                          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-level-extreme px-1 text-[9px] font-bold text-primary-foreground ring-2 ring-card">
                            {extremeCount}
                          </span>
                        )}
                      </span>
                      <span>{label}</span>
                    </>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
