import { type BooksDto } from "./api.ts";

type FooterProps = {
    books: BooksDto[]
}

export default function Footer({ books }: FooterProps) {
    const totalPrice = books.reduce((sum, book) => {
        const price = parseFloat(book.price || '0')
        return sum + price
    }, 0)

    const formattedTotalPrice = totalPrice.toFixed(2)

    return (
        <div className="flex justify-between items-center p-4 text-[#FFF8F3] bg-[#758693] md:rounded-b-2xl">
            <div className="text-sm">
                Showing: <span className="font-semibold">{books.length}</span> {books.length === 1 ? 'book' : 'books'}
            </div>
            <div className="text-sm">
                Total: <span className="font-semibold">${formattedTotalPrice}</span>
            </div>
        </div>
    )
}
