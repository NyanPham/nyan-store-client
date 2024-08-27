import { useState } from 'react'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ProductDetailProps = {
    title: string
    content: string
}

export default function ProductDetail({ title, content } : ProductDetailProps) {
    const [openDetail, setOpenDetail] = useState(false)

    return (
        <div>
            <div className="flex justify-between items-center py-2 border-b border-slate-900/10">
                <h3 className="text-base font-semibold text-slate-700 capitalize">{title}:</h3>
                <FontAwesomeIcon
                    className={`${
                        openDetail ? 'rotate-180' : ''
                    } cursor-pointer text-sm text-slate-700 transition duration-200 hover:text-cyan-400`}
                    icon={faAngleDown}
                    onClick={() => setOpenDetail((prevOpenDetail) => !prevOpenDetail)}
                />
            </div>
            <p
                className={`whitespace-prew-rap mt-3 overflow-clip transform transition-all duration-300 ${
                    openDetail ? 'max-h-96' : 'max-h-0'
                }`}
            >
                {content}
            </p>
        </div>
    )
}
