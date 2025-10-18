import axios from 'axios'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    const url = new URL(req.url)

    const symbol = url.searchParams.get('symbol')
    console.log('Symbol from query:', symbol)

    if (!symbol) {
        return new Response('Symbol is missing from the URL', { status: 400 })
    }
    try {
        const response = await axios.get(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.FINANCIAL_KEY}`, {
        })

        return new Response(JSON.stringify(response.data), { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response('Failed to fetch symbol details', { status: 500 })
    }
}
