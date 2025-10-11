"use client"

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { PortfolioItem } from "./types/types"
import Search from "./components/Search"

export default function Home() {
    const searchParams = useSearchParams()
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])

    useEffect(() => {
        const symbolQuery = searchParams.get("symbol")
        if (!symbolQuery) return

        axios.get("/api/stockData?" + new URLSearchParams({ symbol: symbolQuery }).toString())
            .then((response) => {
                console.log('API Response:', response.data)
                setPortfolio(response.data)
            }).catch((error: string) => {
                console.error('API Error:', error)
            })
    }, [])

    console.log(portfolio)
    const portfolioData = portfolio?.map(item => {
        return (
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col justify-center items-start">
                        <h1>
                            {item.symbol}
                        </h1>
                        <p>
                            {item.name}
                        </p>
                    </div>
                    <div>
                        <p>
                            {item.price}
                        </p>
                        <p>
                            {item.changePercentage}%
                        </p>
                    </div>
                </div>


            </div>
        )
    })

    return (
        <div>
            <Search placeholder="Enter symbol..." />
            {portfolioData}
        </div>
    )
}