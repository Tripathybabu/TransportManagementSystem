import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusColor(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "In Transit":
      return "default"
    case "Delivered":
      return "secondary"
    case "Delayed":
    case "Cancelled":
      return "destructive"
    case "Pending":
      return "outline"
    default:
      return "default"
  }
}
