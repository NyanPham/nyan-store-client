import { useState } from 'react'
import useInterval from '../hooks/useInterval'

type SlideCountdownProps = {
    dueDate: Date
}

function SlideCountdown({ dueDate }: SlideCountdownProps) {
    const [remainingTime, setRemaingTime] = useState('')
    useInterval(() => {
        let delta = Math.abs(new Date(dueDate).getTime() - Date.now()) / 1000
        const days = Math.floor(delta / 86400)
        delta -= days * 86400
        const hours = Math.floor(delta / 3600) % 24
        delta -= hours * 3600

        setRemaingTime(`${days} days ${hours} hours`)
    }, 1000)

    return <>{remainingTime}</>
}

export default SlideCountdown
