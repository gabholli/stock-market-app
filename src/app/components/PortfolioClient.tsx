"use client"

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { PortfolioItem } from "../types/types"
import Search from "../components/Search"

const PortfolioClient = () => {
    const searchParams = useSearchParams()
    const [items, setItems] = useState<PortfolioItem[]>([])

    // useEffect(() => {
    //     const symbolQuery = searchParams.get("symbol")
    //     if (!symbolQuery) return

    //     axios.get("/api/stockData?" + new URLSearchParams({ symbol: symbolQuery }).toString())
    //         .then((response) => {
    //             console.log('API Response:', response.data)
    //             setItem([response.data])
    //         }).catch((error: string) => {
    //             console.error('API Error:', error)
    //         })
    // }, [searchParams])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const symbolQuery = searchParams.get("symbol")
        if (!symbolQuery) return

        axios.get("/api/stockData?" + new URLSearchParams({ symbol: symbolQuery }).toString())
            .then((response) => {
                console.log('API Response:', response.data)
                // setItem([response.data])
                setItems(prevItem => [...prevItem, response.data])
            }).catch((error: string) => {
                console.error('API Error:', error)
            })
    }

    console.log(items)

    const portfolioData = items?.map((currentItem) => {
        return (
            <div key={currentItem.symbol}
                className="border-2 text-center p-2 max-w-xl">
                <div className="border-b-2 p-1">
                    <h1>{currentItem.symbol}</h1>
                    <p>{currentItem.name}</p>
                </div>
                <div className="p-1">
                    <p>{currentItem.change}</p>
                    <p>{currentItem.percent_change}%</p>
                </div>
            </div>
        )
    })

    return (
        <div className="flex flex-col justify-center items-center">
            <Search placeholder="Enter symbol..." handleSubmit={handleSubmit} />
            <main className="mt-6">
                {portfolioData}
            </main>
        </div>
    )
}

export default PortfolioClient