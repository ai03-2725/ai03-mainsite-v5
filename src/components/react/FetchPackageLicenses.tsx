import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import type React from "preact/compat";
import { Spinner } from "./Spinner";


const queryClient = new QueryClient()


// The fetch function
async function fetchLicensesText(): Promise<string> {
  return fetch(`/package-licenses`)
  .then((response) => {
    if (response.status === 429) {
      throw new Error("429")
    } else if (!response.ok) {
      throw new Error("Response was not OK")
    } 
    return response.text()
  })
  .catch((error) => {
    console.error(error)
    throw error
  })
}


const PackageLicenseDisplay: React.FC<{}> = () => {
  const { 
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['fetchLicensesText'],
    queryFn: fetchLicensesText,
    staleTime: Infinity,
  })

  if (isError) {
    return (
      <div>
        <p>Couldn't fetch package data.</p>
        <p>Please open it <a class="underline" href="/package-licenses">here</a>.</p>
      </div>
    )
  } 
  else if (isLoading) {
    return (
      <div class="flex flex-row justify-center items-center">
        <div>
          <Spinner size={36} width={3} />
        </div>
      </div>
    )
  } 
  else {
    return (
      <pre class="whitespace-pre-wrap break-words pt-4">
        {data}
      </pre>
    )
  }
  
}

export const FetchPackageLicenses: React.FC<{}> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PackageLicenseDisplay />
    </QueryClientProvider>
  )
}