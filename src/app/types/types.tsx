export interface PortfolioItem {
    symbol: string
    name: string
    change: number
    percent_change: number
    key: string
}

export interface SearchProps {
    placeholder: string;
    handleSubmit: (e: React.FormEvent) => void
}