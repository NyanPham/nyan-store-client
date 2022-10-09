import React from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Alert from './Alert/Alert'
import Overlay from './Overlay'

export default function LoadingWithAlert({ loading, showAlert, message, error, setShowAlert, inContainer = false }) {
    return (
        <>
            {loading && (
                <div
                    className={`${
                        inContainer ? 'absolute z-10' : 'fixed z-20'
                    } top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center`}
                >
                    <FontAwesomeIcon icon={faSpinner} className="text-cyan-400 w-16 h-16 animate-spin" />
                </div>
            )}
            {showAlert &&
                ReactDOM.createPortal(
                    <Overlay position="top">
                        <Alert
                            type={message ? 'success' : 'error'}
                            message={message ? message : error ? error : ''}
                            delayToClose={3000}
                            closeCallback={() => setShowAlert(false)}
                        />
                    </Overlay>,
                    document.getElementById('modal-container')
                )}
        </>
    )
}
