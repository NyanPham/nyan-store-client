import React from 'react'

function Cell({ children }) {
    return <td>{children}</td>
}

function Row({ children }) {
    return (
        <tr>
            {React.Children.map(children, (el) => {
                if (el.type === Cell) return el

                return <td>{el}</td>
            })}
        </tr>
    )
}

export default function Grid({ children }) {
    return (
        <table>
            <tbody>
                {React.Children.map(children, (el) => {
                    if (!el) return

                    if (el.type === Row) return el

                    if (el.type === Cell) {
                        return <tr>{el}</tr>
                    }

                    return (
                        <tr>
                            <td>{el}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
