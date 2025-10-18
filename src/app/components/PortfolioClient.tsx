"use client"

import axios from "axios"
import { useState } from "react"
import { PortfolioItem } from "../types/types"
import Search from "../components/Search"

const PortfolioClient = () => {
    const [input, setInput] = useState("")
    const [items, setItems] = useState<PortfolioItem[]>([])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input) return

        axios.get("/api/stockData?" + new URLSearchParams({ symbol: input }).toString())
            .then((response) => {
                console.log('API Response:', response.data)
                const newItem = response.data
                setItems(prevItems => {
                    const alreadyExists = prevItems.some(item => item.symbol === newItem.symbol)
                    return alreadyExists ? prevItems : [...prevItems, newItem]
                })
                setInput("")
            }).catch((error: string) => {
                console.error('API Error:', error)
            })
    }

    const handleDelete = (symbolItem: string) => {
        const newItems = items?.filter((item) => item.symbol !== symbolItem)
        setItems(newItems)
    }

    console.log(items)

    const portfolioData = items?.map((currentItem) => {
        return (
            <div
                onClick={() => handleDelete(currentItem.symbol)}
                key={currentItem.symbol}
                className="border-2 text-center p-2 w-3xs md:w-xl mb-6 hover:bg-red-100">
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
            <Search placeholder="Enter symbol..."
                setSymbolInput={setInput}
                symbolInput={input}
                handleSubmit={handleSubmit} />
            <main className="mt-6">
                {portfolioData}
            </main>
        </div>
    )
}

export default PortfolioClient