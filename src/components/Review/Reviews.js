import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'
import Overlay from '../Overlay'
import Review from './Review'

export default function Reviews({ reviews, closeReviews }) {
    const ref = useRef()

    return (
        <Overlay closeModal={closeReviews} childRef={ref}>
            <div
                className="w-80 h-1/2 relative p-4 bg-white md:w-30-rem max-h-96 overflow-y-autoscrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-gray-100"
                ref={ref}
            >
                <h2 className="text-center text-2xl font-semibold text-cyan-400">Reviews</h2>
                <button className="absolute top-6 right-6">
                    <FontAwesomeIcon icon={faClose} onClick={closeReviews} />
                </button>
                <div className="mt-4 space-y-4">
                    {reviews.map((review, index) => (
                        <Review
                            key={`review_${index}`}
                            userEmail={review.user.email}
                            rating={review.rating}
                            reviewContent={review.review}
                            ratedAt={new Date(review.createdAt).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        />
                    ))}
                </div>
            </div>
        </Overlay>
    )
}
