"use client"

import { PortfolioItem } from "@/app/types/types"
import axios from "axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"
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
            <React.Fragment key={item.symbol}>
                <table className="md:table-auto border border-black">
                    <tbody>
                        <tr>
                            <td className="border border-black p-3">Price low</td>
                            <td className="border border-black p-3">${item.low}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-3">Price high</td>
                            <td className="border border-black p-3">${item.high}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-3">Previous close</td>
                            <td className="border border-black p-3">${item.previous_close}</td>
                        </tr>
                    </tbody>
                </table>
                <h1>52-Week Data:</h1>
                <table className="md:table-auto border border-black">
                    <tbody>
                        <tr>
                            <td className="border border-black p-3">Price low</td>
                            <td className="border border-black p-3">${item.fifty_two_week.low}</td>
                        </tr>
                        <tr>
                            <td className="border border-black p-3">Price high</td>
                            <td className="border border-black p-3">${item.fifty_two_week.high}</td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        )
    })

    return (
        <main className="flex flex-col justify-center items-center gap-y-12">
            <Link
                className="underline"
                href="/">Back to Portfolio
            </Link>
            <h1 className="border-b-2 border-black">Details for {symbolValue}:</h1>
            {stockInfo}
        </main>
    )
}

export default StockDetails