import {useDispatch, useSelector} from "react-redux";
import {toggleSort, resetSort} from "../shared/state-manager/store.tsx";
import TagsDropdown from "./tags-dropdown.tsx";
import type {BooksDto} from "./api.ts";

interface MenuProps {
    books: BooksDto[];
}

export default function Menu({ books }: MenuProps) {

    const activeFilter = useSelector((state: any) => state.filter.activeFilter)
    const sortValue = useSelector((state: any) => state.filter.value)
    const dispatch = useDispatch()

    return (
        <div className="flex justify-between items-center md:flex-row flex-col md:text-xl text-base md:gap-4 rounded-3xl md:p-4 p-2 text-[#242424]">
            <div className={'flex flex-row gap-3 flex-shrink-0'}>
                <div className={`inline-flex flex-row gap-1 items-center cursor-pointer rounded-2xl px-2 md:px-2 md:py-1 ${
                    activeFilter === 'price' ? 'bg-[#758693] text-[#FFF8F3]' : 'hover:bg-[#758693] hover:text-[#FFF8F3]'
                }`}
                     onClick={() => dispatch(toggleSort('price'))} role={'button'}>
                    price
                    <SortArrow field="price" activeFilter={activeFilter} sortValue={sortValue}/>
                </div>
                <div className={`inline-flex flex-row gap-1 items-center cursor-pointer rounded-2xl px-4 py-1 ${
                    activeFilter === 'date' ? 'bg-[#758693] text-[#FFF8F3]' : 'hover:bg-[#758693] hover:text-[#FFF8F3]'
                }`}
                     onClick={() => dispatch(toggleSort('date'))} role={'button'}>
                    date
                    <SortArrow field="date" activeFilter={activeFilter} sortValue={sortValue}/>
                </div>
                <div className={`inline-flex flex-row gap-1 items-center cursor-pointer rounded-2xl px-4 py-1 ${
                    activeFilter === 'author' ? 'bg-[#758693] text-[#FFF8F3]' : 'hover:bg-[#758693] hover:text-[#FFF8F3]'
                }`}
                     onClick={() => dispatch(toggleSort('author'))} role={'button'}>
                    author
                    <SortArrow field="author" activeFilter={activeFilter} sortValue={sortValue}/>
                </div>
            </div>
            <div className={'flex flex-row gap-5 items-center flex-shrink-0'}>
                <TagsDropdown books={books} />

                <div className='inline-flex flex-row gap-1 items-center cursor-pointer rounded-2xl px-4 py-1 hover:bg-[#758693] '
                     onClick={() => dispatch(resetSort())} role={'button'}>Reset results
                </div>
            </div>
        </div>

    )
}

export function SortArrow({ field, activeFilter, sortValue }: { field: string, activeFilter: string, sortValue: number }) {
    if (activeFilter !== field) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="18" height="18" stroke={'grey'}>
                <path d="m6.706 8.207 5.293-5.293V23h1V1.914l5.295 5.294.707-.707L12.499 1l-6.5 6.5.707.707z"/>
            </svg>
        )
    }

    if (sortValue === 1) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="18" height="18" stroke={'#FFF8F3'}>
                <path d="m6.706 8.207 5.293-5.293V23h1V1.914l5.295 5.294.707-.707L12.499 1l-6.5 6.5.707.707z"/>
            </svg>
        )
    } else if (sortValue === 2) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="18" height="18" stroke={'#FFF8F3'}>
                <path d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"/>
            </svg>
        )
    }

    return null
}
