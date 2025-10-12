import { useState } from "react"

export default function Search({ placeholder, onSearch }: { placeholder: string, onSearch: (symbol: string) => void }) {
    const [input, setInput] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            onSearch(input.trim().toUpperCase())
            setInput("")
        }
    }

    return (
        <form method="GET" onSubmit={handleSubmit} className="flex gap-x-4 justify-center">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="p-2 bg-blue-100 border-2 rounded-xl"
                name="symbol" />
            <button className="py-1 px-2 bg-blue-100 border-2 rounded-xl"
                type="submit">
                Submit
            </button>
        </form>
    )
}
