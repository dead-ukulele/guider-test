import { type ReactNode } from "react";
import Menu from "./menu.tsx";
import Footer from "./footer.tsx";
import { type BooksDto } from "./api.ts";

type LayoutProps = {
    children: ReactNode;
    books: BooksDto[];
    filteredBooks: BooksDto[];
}

export default function Layout({ children, books, filteredBooks }: LayoutProps) {
    return (
        <div className="flex flex-col h-full md:min-h-screen border-x-[#758693] border-x-2 md:rounded-3xl">
            <header className="flex-shrink-0">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-xl font-bold md:rounded-t-2xl rounded-none xs:p-4 p-1 text-[#FFF8F3] bg-[#758693]">
                        Book Store
                    </h1>
                    <div className="px-4">
                        <Menu books={books}/>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto bg-[#758693]">
                <div className="max-w-2xl mx-auto">
                    {children}
                </div>
            </main>

            <footer>
                <div className="max-w-2xl mx-auto">
                    <Footer books={filteredBooks}/>
                </div>
            </footer>
        </div>
    )
}
