export interface Shipment {
  id: string
  origin: string
  originAddress: string
  destination: string
  destinationAddress: string
  status: "In Transit" | "Delivered" | "Pending" | "Delayed" | "Cancelled"
  carrier: string
  weight: string
  eta: string
  priority: "High" | "Medium" | "Low"
  cost: string
  customer: string
  shipDate: string
  distance: string
  trackingNumber: string
  containerType: string
  serviceType: string
  contact: {
    email: string
    phone: string
  }
  trackingHistory: {
    status: string
    location: string
    timestamp: string
  }[]
}
