export type BooksDto =  {
    title?: string,
    author?: string,
    date?: string,
    price?: string,
    id?: number
    tags?: string[]
}

export const validate = (res: BooksDto[]) => {

    for (const book of res) {
        if (!book.title || !book.author || !book.date || !book.price || !book.id) {
            console.error('Invalid book data:', book);
        }
    }
   return  res.filter(book => book.title && book.author && book.date && book.price && book.id)
}

