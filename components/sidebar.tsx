"use client"

import { X, Home, Package, MapPin, BarChart3, FileText, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                <svg className="h-5 w-5 text-sidebar-primary-foreground" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="7" cy="6" r="1.5" fill="currentColor" />
                  <circle cx="7" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="7" cy="18" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">TransportHub</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-sidebar-foreground">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            <Link
              href="/shipments"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-primary-foreground bg-sidebar-primary"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>

            {/* Shipments with submenu */}
            <div>
              <button
                onClick={() => toggleMenu("shipments")}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5" />
                  Shipments
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform", openMenu === "shipments" && "rotate-180")} />
              </button>
              {openMenu === "shipments" && (
                <div className="ml-8 mt-1 space-y-1 border-l border-sidebar-border pl-3">
                  <Link
                    href="/shipments"
                    className="block rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Active Shipments
                  </Link>
                  <Link
                    href="/shipments?status=Pending"
                    className="block rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Pending
                  </Link>
                  <Link
                    href="/shipments?status=Delivered"
                    className="block rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Delivered
                  </Link>
                </div>
              )}
            </div>

            {/* Tracking with submenu */}
            <div>
              <button
                onClick={() => toggleMenu("tracking")}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  Tracking
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform", openMenu === "tracking" && "rotate-180")} />
              </button>
              {openMenu === "tracking" && (
                <div className="ml-8 mt-1 space-y-1 border-l border-sidebar-border pl-3">
                  <a
                    href="#"
                    className="block rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Live Map
                  </a>
                  <a
                    href="#"
                    className="block rounded-lg px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    Route History
                  </a>
                </div>
              )}
            </div>

            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <BarChart3 className="h-5 w-5" />
              Analytics
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <FileText className="h-5 w-5" />
              Reports
            </a>

            <div className="pt-4">
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Settings className="h-5 w-5" />
                Settings
              </a>
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}
