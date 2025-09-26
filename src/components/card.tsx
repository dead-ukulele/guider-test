import {useDispatch} from "react-redux";
import {toggleTag} from "../shared/state-manager/store.tsx";

type CardProps = {
    title: string,
    author: string,
    date: string,
    price: string,
    id: number
    tags: string[]
}

export default function Card({title, author, date, price, id, tags}: CardProps) {
    const dispatch = useDispatch()

    return (
        <div className="flex flex-col bg-[#405D724D] rounded-2xl text-left text-[#FFF8F3] h-full">
            <div className='flex flex-col p-2 md:p-4 flex-1'>
                <h1 className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                    <span className={'mr-2 text-lg sm:text-xl md:text-2xl font-bold'}>{id}</span>
                    {title}
                </h1>
                <div className="space-y-1 text-sm sm:text-base">
                    <p className="text-[#E8F4F8]">{author}</p>
                    <p className="text-[#E8F4F8]">{date}</p>
                    <p className="text-[#E8F4F8]">{price}</p>
                </div>
            </div>
            <div className={'flex flex-col gap-3 px-3 md:px-4 mt-auto'}>
                <hr className={'border-[#8498A8]'} />
                <div className={'flex flex-wrap gap-2 sm:gap-3 pb-3 sm:pb-4'}>
                {tags.map((tag, index) => (
                    <div key={index} className='rounded-xl sm:rounded-2xl py-1.5 sm:py-2 px-2 sm:px-3 md:px-4 bg-[#FFF8F3] text-[#000000] cursor-pointer text-xs sm:text-sm hover:bg-[#E8F4F8] transition-colors'
                         onClick={() => dispatch(toggleTag(tag))} role={'button'}
                    >
                        {tag}
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}