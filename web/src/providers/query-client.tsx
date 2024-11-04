import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

const queryClient = new QueryClient()

interface queryClientProps {
  children: ReactNode
}

export function QueryClientProvider({children}: queryClientProps){
  return(
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  )
}