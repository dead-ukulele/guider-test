import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTag } from '../shared/state-manager/store.tsx';
import type { BooksDto } from './api.ts';

interface TagsDropdownProps {
    books: BooksDto[];
}

export default function TagsDropdown({ books }: TagsDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const activeTags = useSelector((state: any) => state.filter.activeTags);

    const allTags = Array.from(
        new Set(
            books
                .filter(book => book.tags && book.tags.length > 0)
                .flatMap(book => book.tags!)
        )
    ).sort();

    const handleTagToggle = (tag: string) => {
        dispatch(toggleTag(tag));
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);



    return (
        <div className="relative flex-shrink-0" ref={dropdownRef}>
            <div 
                className={`inline-flex flex-row items-center cursor-pointer rounded-xl gap-1 px-2 sm:px-2 sm:py-1 transition-colors whitespace-nowrap ${
                    activeTags.length > 0 || isOpen ? 'text-[#FFF8F3] bg-[#758693]' : 'hover:text-[#FFF8F3] hover:bg-[#758693]'
                }`}
                onClick={() => setIsOpen(!isOpen)}
                role="button"
            >
                tags
                <DropdownArrow isOpen={isOpen} />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-[180px] sm:min-w-[200px] max-w-[280px] sm:max-w-[300px] right-0 sm:right-auto">
                    <div className="p-2 sm:p-3">
                         <div className="flex justify-between items-center mb-2 sm:mb-3">
                             <h3 className="text-xs sm:text-sm font-semibold text-gray-800">Tags</h3>
                             <span className="text-xs text-gray-500">
                                 {activeTags.length} selected
                             </span>
                         </div>

                        {allTags.length === 0 ? (
                            <p className="text-gray-500 text-xs sm:text-sm italic">No tags found</p>
                        ) : (
                             <div className="space-y-1 max-h-40 sm:max-h-48 overflow-y-auto">
                                 {allTags.map(tag => {
                                     const isSelected = activeTags.includes(tag)
                                     
                                     return (
                                         <label
                                             key={tag}
                                             className="flex items-center space-x-2 p-1 rounded cursor-pointer hover:bg-gray-50"
                                         >
                                             <input
                                                 type="checkbox"
                                                 checked={isSelected}
                                                 onChange={() => handleTagToggle(tag)}
                                                 className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 checked:accent-[#758693] w-3 h-3 sm:w-4 sm:h-4"
                                             />
                                             <span className="text-xs sm:text-sm text-gray-700 flex-1 truncate">{tag}</span>
                                         </label>
                                     )
                                 })}
                             </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

interface DropdownArrowProps {
    isOpen: boolean;
}

function DropdownArrow({ isOpen }: DropdownArrowProps) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="10.033" 
            height="5" 
            stroke={'white'}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
            <path d="M5.016 0 0 .003 2.506 2.5 5.016 5l2.509-2.5L10.033.003 5.016 0z"/>
        </svg>
    );
}
