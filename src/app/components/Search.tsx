// components/Search.tsx
"use client"

import { useState } from "react"

export default function Search({ placeholder, onSearch }: { placeholder: string, onSearch: (symbol: string) => void }) {
    const [input, setInput] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            onSearch(input.trim().toUpperCase()) // normalize symbol
            setInput("")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Search
            </button>
        </form>
    )
}

// import { SearchProps } from "../types/types"

// export default function Search({ placeholder }: SearchProps) {
//     return (
//         <form method="GET" className="flex gap-x-4 justify-center">
//             <input placeholder={placeholder} className="p-2 bg-blue-100 border-2 rounded-xl" name="symbol" />
//             <button className="py-1 px-2 bg-blue-100 border-2 rounded-xl" type="submit">Submit</button>
//         </form>
//     )
// }
