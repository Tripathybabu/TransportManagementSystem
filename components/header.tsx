"use client"

import { Menu, LayoutGrid, LayoutList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeaderProps {
  onMenuClick: () => void
  viewMode: "grid" | "tiles"
  onViewModeChange: (mode: "grid" | "tiles") => void
}

export function Header({ onMenuClick, viewMode, onViewModeChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-8">
        {/* Hamburger Menu */}
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="7" cy="6" r="1.5" fill="currentColor" />
              <circle cx="7" cy="12" r="1.5" fill="currentColor" />
              <circle cx="7" cy="18" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <span className="text-lg font-semibold">TransportHub</span>
        </div>

        {/* Horizontal Navigation */}
        <nav className="hidden flex-1 items-center gap-6 px-6 lg:flex">
          <a href="#" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Dashboard
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Shipments
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Tracking
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Analytics
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Reports
          </a>
        </nav>

        {/* View Toggle */}
        <div className="ml-auto flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-7 w-7", viewMode === "grid" && "bg-background shadow-sm")}
            onClick={() => onViewModeChange("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-7 w-7", viewMode === "tiles" && "bg-background shadow-sm")}
            onClick={() => onViewModeChange("tiles")}
          >
            <LayoutList className="h-4 w-4" />
            <span className="sr-only">Tile view</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
