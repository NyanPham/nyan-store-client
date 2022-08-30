import React, { useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import useInterval from '../hooks/useInterval'

function SlideCountdown({ dueDate }) {
    const [remainingTime, setRemaingTime] = useState('')
    useInterval(() => {
        let delta = Math.abs(new Date(dueDate) - Date.now()) / 1000
        const days = Math.floor(delta / 86400)
        delta -= days * 86400
        const hours = Math.floor(delta / 3600) % 24
        delta -= hours * 3600

        setRemaingTime(`${days} days ${hours} hours`)
    }, 1000)

    return <>{remainingTime}</>
}

export default SlideCountdown
