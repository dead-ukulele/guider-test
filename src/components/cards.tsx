import Card from "./card.tsx";
import {type BooksDto} from "./api.ts";


type CardProps = {
    books: BooksDto[]
}

export default function Cards({books}: CardProps) {
   return (
        <div className="flex flex-col gap-5 p-2 sm:p-6">
        {books.length>0 && books?.map((book) => (
            <Card
                key={book.id}
                author={book.author || 'No author'}
                date={book.date || 'No date'}
                price={`${book.price}$` || 'No price'}
                title={book.title || 'No title'}
                id={book.id || 1}
                tags={book.tags || []}
            />
        ))}
    </div>)
}


