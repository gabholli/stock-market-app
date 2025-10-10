"use client"

import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { PortfolioItem } from "./src/app/types/types"
import Search from "./src/app/components/Search"

export default function Home() {
  const searchParams = useSearchParams()
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])

  useEffect(() => {
    const symbolQuery = searchParams.get("symbol")
    if (!symbolQuery) return

    axios.get("/api/stockData?" + new URLSearchParams({ symbol: symbolQuery }).toString())
      .then((response) => {
        console.log('API Response:', response.data)
        setPortfolio(response.data["Time Series (5min)"])
      }).catch((error: string) => {
        console.error('API Error:', error)
      })
  }, [])

  console.log(portfolio)

  return (
    <div>
      <Search placeholder="Enter symbol" />
    </div>
  )
}
