import Link from "next/link"

const Header = () => {
    return (
        <header className="mb-8 flex flex-col justify-center items-center gap-y-8">

            <div className="flex justify-center items-center">
                <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-center">Financial Data App</h1>
            </div>

        </header>
    )
}

export default Header