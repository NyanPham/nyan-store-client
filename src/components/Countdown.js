import React, { useState } from 'react'
import useInterval from '../hooks/useInterval'

export default function Countdown({ dueDate }) {
    const [remainingTime, setRemaingTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    useInterval(() => {
        let delta = Math.abs(new Date(dueDate) - Date.now()) / 1000
        const days = Math.floor(delta / 86400)
        delta -= days * 86400
        const hours = Math.floor(delta / 3600) % 24
        delta -= hours * 3600
        const minutes = Math.floor(delta / 60) % 60
        delta -= minutes * 60
        const seconds = Math.floor(delta % 60)

        setRemaingTime({
            days,
            hours,
            minutes,
            seconds,
        })
    }, 1000)

    return (
        <div className="flex justify-center gap-2 mt-4">
            {Object.keys(remainingTime).map((key, index) => {
                return (
                    <CountDownCard
                        time={remainingTime[key]}
                        type={key}
                        index={index}
                        key={`countdown_${Math.random()}_${index}`}
                    />
                )
            })}
        </div>
    )
}

function CountDownCard({ time, type, index }) {
    let text
    if (type === 'days') {
        text = 'Days'
    } else if (type === 'hours') {
        text = 'Hrs'
    } else if (type === 'minutes') {
        text = 'Mins'
    } else {
        text = 'Secs'
    }
    return (
        <>
            <div className="flex flex-col">
                <div className="w-9 h-10 flex items-center justify-center bg-slate-400 rounded-md text-gray-900 font-semibold">
                    {time < 10 ? `0${time}` : time}
                </div>
                <span className="text-center text-sm font-medium text-gray-900">{text}</span>
            </div>
            {index < 3 && <span className="leading-9 text-lg">:</span>}
        </>
    )
}
