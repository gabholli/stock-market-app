import axios from 'axios'
import { NextRequest } from 'next/server'

// export async function GET(req: NextRequest) {
//     const url = new URL(req.url)

//     const identifier = url.searchParams.get('identifier')
//     console.log('Symbol from query:', identifier)

//     if (!identifier) {
//         return new Response('Symbol is missing from the URL', { status: 400 })
//     }
//     try {
//         const response = await axios.get(`https://financialdata.net/api/v1/stock-prices?identifier=${identifier}&key=${process.env.FINANCIAL_KEY}`, {
//         })

//         return new Response(JSON.stringify(response.data), { status: 200 })
//     } catch (error) {
//         console.error(error)
//         return new Response('Failed to fetch symbol details', { status: 500 })
//     }
// }

export async function GET() {
    try {
        const response = await axios.get(`https://financialmodelingprep.com/stable/quote?symbol=AAPL&&apikey=${process.env.FINANCIAL_KEY}`, {
        })

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to fetch symbol', { status: 500 });
    }
}

