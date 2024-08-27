import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { updateOrderNote } from '../../redux/actions/orderNoteActions'

export default function SideOrderNote() {
    const [openOrderNote, setOpenOrderNote] = useState(false)
    const orderNoteRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()

    const handleNoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()  
        
        if (orderNoteRef.current?.value != null) {
            updateOrderNote(orderNoteRef.current.value)(dispatch)
        }
    }

    // useEffect(() => {
    //     dispatch(getOrderNote())
    // }, [])

    return (
        <>
            <button
                className="text-slate-700 text-xl flex flex-col justify-center items-center transition duration-200 hover:text-cyan-300 active:text-cyan-500"
                onClick={() => setOpenOrderNote(true)}
            >
                <FontAwesomeIcon icon={faClipboard} />
                <span className="text-sm font-normal">Note</span>
            </button>
            <form
                className={`form py-7 px-5 z-30 bg-white absolute bottom-0 left-0 w-full max-h-full h-full transition transform duration-300 shadow-top ${
                    openOrderNote ? 'translate-y-0 pointer-events-auto' : 'translate-y-full pointer-events-none'
                }`}
                onSubmit={handleNoteSubmit}
            >
                <div className="form-group mt-2">
                    <label className="form-label" htmlFor="side-order-note">
                        Order Note:
                    </label>
                    <input
                        type="textarea"
                        id="side-order-note"
                        className="form-input w-full h-16"
                        placeholder="Is there anything you want to tell us?"
                        ref={orderNoteRef}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-3 text-white font-semibold tracking-wide bg-cyan-400 py-1 px-4 rounded-lg flex-grow flex-shrink-0 w-full transition transform duration-200 hover:-translate-y-1 active:-translate-y-1 active:bg-cyan-500"
                >
                    Add Note
                </button>
                <button
                    type="reset"
                    className="mt-2 text-center text-slate-700 font-semibold tracking-wide bg-white border border-slate-700 py-1 px-4 rounded-lg flex-grow flex-shrink-0 w-full transition transform duration-200 hover:-translate-y-1 active:-translate-y-1 active:bg-slate-700 active:text-white"
                    onClick={() => {
                        setOpenOrderNote(false)
                    }}
                >
                    Cancel
                </button>
            </form>
        </>
    )
}
