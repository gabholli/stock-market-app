"use client"

import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect } from "react"

const StockDetails = () => {
    const params = useParams()
    const rawSymbol = params.symbol
    const symbolValue = Array.isArray(rawSymbol) ? rawSymbol[0] : rawSymbol ?? ""

    useEffect(() => {
        if (!symbolValue) return

        axios.get("/api/stockData?" + new URLSearchParams({ symbol: symbolValue }).toString())
            .then((response) => {
                console.log('Stock Details API Response:', response.data)
            }).catch((error: any) => {
                console.error('Stock Details API Error:', error)
            })
        console.log("Fetching details for symbol:", symbolValue)
    }, [symbolValue])

    return (
        <div>Stock details here for {symbolValue}</div>
    )
}

export default StockDetails