import { siteConfig } from "@/config/site"

const currencyFormatter = new Intl.NumberFormat(siteConfig.locale, {
  style: "currency",
  currency: siteConfig.currency,
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  weekday: "short",
  day: "numeric",
  month: "short",
})

const timeFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  hour: "numeric",
  minute: "2-digit",
})

export const formatPrice = (amount: number) => currencyFormatter.format(amount)
export const formatEventDate = (iso: string) => dateFormatter.format(new Date(iso))
export const formatEventTime = (iso: string) => timeFormatter.format(new Date(iso))
