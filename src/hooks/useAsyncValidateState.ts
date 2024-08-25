import { useState } from 'react'

export default function useAsyncValidateState() {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    return { isLoading, setIsLoading, message, setMessage, error, setError, showAlert, setShowAlert }
}
