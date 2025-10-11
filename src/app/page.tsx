import { Suspense } from "react"
import PortfolioClient from "./components/PortfolioClient"

export default function Page() {
    return (
        <Suspense fallback={<div>Loading portfolio...</div>}>
            <PortfolioClient />
        </Suspense>
    )
}
