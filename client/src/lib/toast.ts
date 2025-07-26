import { toast as toastFn } from "@/hooks/use-toast"

export const toast = {
  success: (message: string) => {
    toastFn({
      title: "Success",
      description: message,
      variant: "default",
    })
  },
  error: (message: string) => {
    toastFn({
      title: "Error", 
      description: message,
      variant: "destructive",
    })
  },
  info: (message: string) => {
    toastFn({
      title: "Info",
      description: message,
      variant: "default",
    })
  }
}