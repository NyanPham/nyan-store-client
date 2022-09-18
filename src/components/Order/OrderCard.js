import React from 'react'
import { COLOR_MAP, ROOT_URL } from '../../config'

export default function OrderCard({ order }) {
    const { total, items, createdAt } = order

    return (
        <div className="w-full mx-4 h-max rounded-lg shadow-lg md:mx-0 py-5 px-7">
            <div className="flex justify-between">
                <span className="hidden text-slate-400 font-normal text-base sm:inline">Purchased in:</span>
                <span className="text-slate-600 font-normal text-base">
                    {new Date(createdAt).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                    })}
                </span>
            </div>
            <div className="mt-2 flex justify-between">
                <span className="text-slate-700 text-lg font-semibold">Total:</span>
                <span className="text-cyan-500 text-xl font-semibold">${(total / 100).toLocaleString('en-US')}</span>
            </div>
            <div className="mt-2">
                <h3 className="text-slate-700 text-lg font-semibold">Items purchased:</h3>
                {items.map((item, index) => (
                    <div
                        key={`order_item_variant_${index}`}
                        className="mt-3 flex flex-row justify-start items-center gap-5"
                    >
                        <div className="w-32">
                            <img
                                src={`${ROOT_URL}/img/products/${item.variant.images[0]}`}
                                alt={item.variant.name}
                                className="w-full aspect-29/37 bg-slate-700 mx-auto object-cover object-center"
                                loading="lazy"
                                crossOrigin="anonymous"
                            />
                        </div>
                        <div>
                            <h4 className="text-cyan-400 text-xl font-semibold tracking-wide">{item.variant.name}</h4>
                            <div className="mt-2">
                                <span className="text-slate-700 text-xl font-semibold tracking-wide">
                                    ${item.variant.price.toLocaleString('en-US')}
                                </span>
                                <span className="text-slate-500 text-sm font-medium ml-2">&times;{item.quantity}</span>
                            </div>
                            {item.variant.option1 && (
                                <div className="flex justify-start items-center gap-2 mt-1">
                                    <h5 className="text-slate-600 text-base font-semibold">Size:</h5>
                                    <span className="text-slate-700 text-lg font-semibold">{item.variant.option1}</span>
                                </div>
                            )}
                            {item.variant.option2 && (
                                <div className="flex justify-start items-center gap-2 mt-1">
                                    <h5 className="text-slate-600 text-base font-semibold">Color: </h5>
                                    <span
                                        className={`${
                                            COLOR_MAP[item.variant.option2.toLowerCase().split('-').join('')]
                                        } w-6 h-6 rounded-full flex items-center justify-center gap-3 text-slate-700 text-sm font-bold`}
                                    ></span>
                                </div>
                            )}
                            {item.variant.option3 && (
                                <div className="flex justify-start items-center gap-2 mt-1">
                                    <h5 className="text-slate-600 text-base font-semibold">Material:</h5>
                                    <span className="text-slate-700 text-lg font-semibold">{item.variant.option3}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
