export interface PortfolioItem {
    symbol: string
    name: string
    change: number
    percent_change: number
    key: string
    low: string
    high: string
}

export interface SearchProps {
    placeholder: string
    handleSubmit: (e: React.FormEvent) => void
    symbolInput: string
    setSymbolInput: React.Dispatch<React.SetStateAction<string>>
}