import { SearchProps } from "../types/types"
import Form from 'next/form'

export default function Search({ placeholder }: SearchProps) {
    return (
        <Form action="/" className="flex gap-x-4 justify-center">
            {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
            <input placeholder={placeholder} className="p-2 bg-blue-200" name="symbol" />
            <button className="py-1 px-2 bg-blue-200" type="submit">Submit</button>
        </Form>
    )
}
