export interface PortfolioItem {
    fifty: any
    symbol: string
    name: string
    change: number
    percent_change: number
    key: string
    low: string
    high: string
    previous_close: string
    fifty_two_week: string
}

export interface SearchProps {
    placeholder: string
    handleSubmit: (e: React.FormEvent) => void
    symbolInput: string
    setSymbolInput: React.Dispatch<React.SetStateAction<string>>
}