import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Review(props) {
    const { reviewContent, rating, userEmail, ratedAt } = props
    return (
        <div className="border border-slate-600 p-3 rounded-lg">
            <div className="flex justify-between">
                <div>
                    {rating &&
                        [1, 2, 3, 4, 5].map((value, index) => (
                            <FontAwesomeIcon
                                className={`${value <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-400'}`}
                                icon={faStar}
                                key={`star_${index}`}
                            />
                        ))}
                </div>
                <span className="text-slate-700 font-medium">At {ratedAt}</span>
            </div>
            <h3 className="text-lg text-slate-700 font-medium">By: {userEmail}</h3>
            <p className="mt-2">{reviewContent}</p>
        </div>
    )
}
