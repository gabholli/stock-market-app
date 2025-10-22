"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { PortfolioItem } from "../types/types"
import Search from "../components/Search"
import Link from "next/link"

// const getInitialItems = () => {
//     if (typeof localStorage !== "undefined") {
//         const portfolioItem = localStorage.getItem("Items")
//         return portfolioItem ? JSON.parse(portfolioItem) : []
//     }

// }

const PortfolioClient = () => {
    const [input, setInput] = useState("")
    const [items, setItems] = useState<PortfolioItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const storedItems = localStorage.getItem("Items")
        if (storedItems) {
            setItems(JSON.parse(storedItems))
        }
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("Items", JSON.stringify(items))
        }
    }, [items])

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
            <div className="flex gap-x-4 justify-center items-center" key={currentItem.symbol}>

                <Link href={"/stockDetails/" + currentItem.symbol}>
                    <div
                        key={currentItem.symbol}
                        className="border-2 text-center p-2 w-3xs md:w-xs lg:w-xl mb-6 hover:bg-red-100 rounded-xl">
                        <div className="border-b-2 p-1">
                            <h1>{currentItem.symbol}</h1>
                            <p>{currentItem.name}</p>
                        </div>
                        <div className="p-1">
                            <p>{currentItem.change}</p>
                            <p>{currentItem.percent_change}%</p>
                        </div>
                    </div>
                </Link>
                <button
                    onClick={() => handleDelete(currentItem.symbol)}
                    className="mb-6 bg-blue-100 px-2 py-1 cursor-pointer rounded-xl border-2">
                    X
                </button>
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