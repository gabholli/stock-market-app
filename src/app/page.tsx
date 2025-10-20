import { Suspense } from "react"
import PortfolioClient from "./components/PortfolioClient"

export default function Page() {
    return (
        <Suspense fallback={<div
            className="flex justify-center items-center min-h-dvh"
        >Loading content...</div>}>
            <PortfolioClient />
        </Suspense>
    )
}
