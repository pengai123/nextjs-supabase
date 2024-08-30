import { Suspense } from "react"
import PrivateData from "@/components/PrivateData"

export default async function PrivatePage() {
  return (
    <>
      <h2 className="text-xl font-semibold my-5">Private Data Page</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <PrivateData />
      </Suspense>
    </>
  )
}