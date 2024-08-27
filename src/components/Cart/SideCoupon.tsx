import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'

export default function SideCoupon() {
    const [openCoupon, setOpenCoupon] = useState(false)
    const couponRef = useRef<HTMLInputElement>(null)
    
    const handleCouponSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <>
            <button
                className="text-slate-700 text-xl flex flex-col justify-center items-center transition duration-200 hover:text-cyan-300 active:text-cyan-500"
                onClick={() => setOpenCoupon(true)}
            >
                <FontAwesomeIcon icon={faTag} />
                <span className="text-sm font-normal">Coupon</span>
            </button>
            <form
                className={`form py-7 px-5 z-30 bg-white absolute bottom-0 left-0 w-full h-full transition transform duration-300 shadow-top ${
                    openCoupon ? 'translate-y-0 pointer-events-auto' : 'translate-y-full pointer-events-none'
                }`}
                onSubmit={handleCouponSubmit}
            >
                <div className="form-group mt-2">
                    <label className="form-label" htmlFor="side-coupon-code">
                        Coupon Code:
                    </label>
                    <input
                        type="text"
                        id="side-coupon-code"
                        className="form-input w-full"
                        placeholder="Have a coupon? Add for discount now!"
                        ref={couponRef}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-3 text-white font-semibold tracking-wide bg-cyan-400 py-1 px-4 rounded-lg flex-grow flex-shrink-0 w-full transition transform duration-200 hover:-translate-y-1 active:-translate-y-1 active:bg-cyan-500"
                >
                    Apply Coupon
                </button>
                <button
                    type="reset"
                    className="mt-2 text-center text-slate-700 font-semibold tracking-wide bg-white border border-slate-700 py-1 px-4 rounded-lg flex-grow flex-shrink-0 w-full transition transform duration-200 hover:-translate-y-1 active:-translate-y-1 active:bg-slate-700 active:text-white"
                    onClick={() => {
                        setOpenCoupon(false)
                    }}
                >
                    Cancel
                </button>
            </form>
        </>
    )
}
