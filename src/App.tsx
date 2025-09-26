import './App.css'
import Layout from "./components/layout.tsx";
import Cards from "./components/cards.tsx";
import {useEffect, useState} from "react";
import type {BooksDto} from "./components/api.ts";
import {validate} from "./components/api.ts";
import {useSelector} from "react-redux";
import { booksData } from "./data/books.ts";

function App() {
    const [books, setBooks] = useState<BooksDto[]>([])
    const activeFilter = useSelector((state: any) => state.filter.activeFilter)
    const sortValue = useSelector((state: any) => state.filter.value)
    const activeTags = useSelector((state: any) => state.filter.activeTags)

    useEffect(() =>{
        // fetch('http://localhost:3001/books')
            // .then(response => response.json())
            // .then(res => validate(res))
            // .then(data => setBooks(data))
        setBooks(validate(booksData))
    },[])

    const getFilteredBooks = (): BooksDto[] => {
        if (activeTags.length === 0) {
            return books
        }
        
        return books.filter(book => 
            book.tags && book.tags.some(tag => activeTags.includes(tag))
        )
    }

    const getSortedBooks = (): BooksDto[] => {
        const filteredBooks = getFilteredBooks()
        
        if (activeFilter === 'none' || sortValue === 0) {
            return filteredBooks
        }

        const sortedBooks = [...filteredBooks]

        if (activeFilter === 'price') {
            return sortedBooks.sort((a, b) => {
                const priceA = parseFloat(a?.price || '0')
                const priceB = parseFloat(b?.price || '0')
                
                if (sortValue === 1) {
                    return priceA - priceB
                } else if (sortValue === 2) {
                    return priceB - priceA
                }
                return 0
            })
        }

        if (activeFilter === 'date') {
            return sortedBooks.sort((a, b) => {
                const parseDate = (dateStr: string) => {
                    if (!dateStr) return 0
                    
                    const parts = dateStr.split(' ')
                    if (parts.length !== 2) return 0
                    
                    const month = parts[0]
                    const year = parseInt(parts[1])

                    const monthMap: { [key: string]: number } = {
                        'january': 0, 'jan': 0,
                        'february': 1, 'feb': 1,
                        'march': 2, 'mar': 2,
                        'april': 3, 'apr': 3,
                        'may': 4,
                        'june': 5, 'jun': 5,
                        'july': 6, 'jul': 6,
                        'august': 7, 'aug': 7,
                        'september': 8, 'sep': 8, 'sept': 8,
                        'october': 9, 'oct': 9,
                        'november': 10, 'nov': 10,
                        'december': 11, 'dec': 11
                    }
                    
                    const monthNum = monthMap[month.toLowerCase()]
                    if (monthNum === undefined || isNaN(year)) {
                        return 0
                    }
                    
                    return (year + monthNum) as number
                }
                
                const dateA = parseDate(a.date || '')
                const dateB = parseDate(b.date || '')
                
                if (sortValue === 1) {
                    return dateA - dateB
                } else if (sortValue === 2) {
                    return dateB - dateA
                }
                return 0
            })
        }

        if (activeFilter === 'author') {
            return sortedBooks.sort((a, b) => {
                const authorA = a.author || ''
                const authorB = b.author || ''
                
                const getLastName = (fullName: string) => {
                    const parts = fullName.trim().split(' ')
                    return parts[parts.length - 1] || ''
                }
                
                const lastNameA = getLastName(authorA)
                const lastNameB = getLastName(authorB)
                
                if (sortValue === 1) {
                    return lastNameA.localeCompare(lastNameB)
                } else if (sortValue === 2) {
                    return lastNameB.localeCompare(lastNameA)
                }
                return 0
            })
        }

        return filteredBooks
    }


  return (
    <Layout books={books} filteredBooks={getSortedBooks()}>
      <Cards books={getSortedBooks()}/>
    </Layout>
  )
}

export default App
