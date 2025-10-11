"use client"

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { PortfolioItem } from "../types/types"
import Search from "../components/Search"

export default function PortfolioClient() {
    const searchParams = useSearchParams()
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
    const [list, setList] = useState([])

    useEffect(() => {
        const symbolQuery = searchParams.get("symbol")
        if (!symbolQuery) return

        axios.get("/api/stockData?" + new URLSearchParams({ symbol: symbolQuery }).toString())
            .then((response) => {
                console.log('API Response:', response.data)
                setPortfolio([response.data])
            }).catch((error: string) => {
                console.error('API Error:', error)
            })
    }, [searchParams])

    const portfolioData = portfolio?.map((item) => {
        return (
            <div key={item.symbol}
                className="border-2 text-center p-2 max-w-84">
                <div className="border-b-2 p-1">
                    <h1>{item.symbol}</h1>
                    <p>{item.name}</p>
                </div>
                <div className="p-1">
                    <p>{item.change}</p>
                    <p>{item.percent_change}%</p>
                </div>
            </div>
        )
    })

    return (
        <div className="flex flex-col justify-center items-center">
            <Search placeholder="Enter symbol..." />
            <main className="mt-6">
                {portfolioData}
            </main>
        </div>
    )
}