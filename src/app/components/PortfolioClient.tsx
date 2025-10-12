"use client"

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { PortfolioItem } from "../types/types"
import Search from "../components/Search"

export default function PortfolioClient() {
    const [list, setList] = useState<PortfolioItem[]>([])

    const handleSearch = async (symbol: string) => {
        try {
            const response = await axios.get("/api/stockData?" + new URLSearchParams({ symbol }).toString())
            const newItem: PortfolioItem = response.data

            setList(prevList => {
                const alreadyExists = prevList.some(item => item.symbol === newItem.symbol)
                return alreadyExists ? prevList : [...prevList, newItem]
            })
        } catch (error) {
            console.error("API Error:", error)
        }
    }

    const deleteAllItems = (() => {
        setList([])
    })

    return (
        <div className="flex flex-col justify-center items-center">
            <button className="bg-blue-100 px-2 py-1 rounded-xl border-black border-2
                mb-10 cursor-pointer"
                onClick={deleteAllItems}>Delete All</button>
            <Search placeholder="Enter symbol..." onSearch={handleSearch} />
            <main className="mt-6">
                {list.map((item) => (
                    <div
                        key={item.symbol}
                        onClick={() => {
                            setList(prevList => prevList.filter(i => i.symbol !== item.symbol))
                        }}
                        className="border-2 text-center p-2 max-w-xl mb-4 cursor-pointer hover:bg-red-100 transition"
                        title="Click to remove"
                    >
                        <div className="border-b-2 p-1">
                            <h1>{item.symbol}</h1>
                            <p>{item.name}</p>
                        </div>
                        <div className="p-1">
                            <p>{item.change}</p>
                            <p>{item.percent_change}%</p>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    )
}