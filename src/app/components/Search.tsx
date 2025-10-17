import { SearchProps } from "../types/types"

const Search = ({ placeholder, handleSubmit }: SearchProps) => {
    return (
        <form onSubmit={handleSubmit} method="GET" className="flex gap-x-4 justify-center">
            <input placeholder={placeholder} className="p-2 bg-blue-100 border-2 rounded-xl" name="symbol" />
            <button className="py-1 px-2 bg-blue-100 border-2 rounded-xl cursor-pointer" type="submit">Submit</button>
        </form>
    )
}

export default Search