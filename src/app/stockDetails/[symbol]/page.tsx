"use client"

import { PortfolioItem } from "@/app/types/types"
import axios from "axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const StockDetails = () => {
    const params = useParams()
    const rawSymbol = params.symbol
    const symbolValue = Array.isArray(rawSymbol) ? rawSymbol[0] : rawSymbol ?? ""
    const [shareData, setShareData] = useState<PortfolioItem[]>([])

    useEffect(() => {
        if (!symbolValue) return

        axios.get("/api/stockData?" + new URLSearchParams({ symbol: symbolValue }).toString())
            .then((response) => {
                console.log('Stock Details API Response:', response.data)
                setShareData([response.data])
            }).catch((error: string) => {
                console.error('Stock Details API Error:', error)
            })
        console.log("Fetching details for symbol:", symbolValue)
    }, [])

    const stockInfo = shareData?.map((item: PortfolioItem) => {
        return (
            <section>
                <p>Price low: ${item.low}</p>
                <p>Price high ${item.high}</p>
            </section>
        )
    })

    return (
        <main className="flex flex-col justify-center items-center gap-y-12">
            <Link
                className="underline"
                href="/">Back to Portfolio
            </Link>
            <h1 className="border-b-2 border-black">Stock details here for {symbolValue}:</h1>
            {stockInfo}
        </main>
    )
}

export default StockDetails