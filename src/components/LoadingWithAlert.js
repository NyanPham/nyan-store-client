import React from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Alert from './Alert/Alert'

export default function LoadingWithAlert({ loading, showAlert, message, error, setShowAlert }) {
    return (
        <>
            {loading && (
                <div className="z-30 fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center">
                    <FontAwesomeIcon icon={faSpinner} className="text-cyan-400 w-16 h-16 animate-spin" />
                </div>
            )}
            {showAlert &&
                ReactDOM.createPortal(
                    <>
                        <Alert
                            type={message ? 'success' : 'error'}
                            message={message ? message : error ? error : ''}
                            delayToClose={3000}
                            closeCallback={() => setShowAlert(false)}
                        />
                    </>,
                    document.getElementById('modal-container')
                )}
        </>
    )
}
