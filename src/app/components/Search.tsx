import { SearchProps } from "../types/types"

export default function Search({ placeholder }: SearchProps) {
    return (
        <form method="GET" className="flex gap-x-4 justify-center">
            <input placeholder={placeholder} className="p-2 bg-blue-100" name="symbol" />
            <button className="py-1 px-2 bg-blue-100" type="submit">Submit</button>
        </form>
    )
}
