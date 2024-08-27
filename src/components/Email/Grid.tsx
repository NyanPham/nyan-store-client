import React from 'react'

function Cell({ children }: { children: React.ReactNode }) {
    return <td>{children}</td>
}

function Row({ children }: { children: React.ReactNode }) {
    return (
        <tr>
            {React.Children.map(children, (el) => {
                if (React.isValidElement(el) && el.type === Cell) return el

                return <td>{el}</td>
            })}
        </tr>
    )
}

export default function Grid({ children }: { children: React.ReactNode }) {
    return (
        <table>
            <tbody>
                {React.Children.map(children, (el) => {
                    if (!el) return

                    if (React.isValidElement(el) && el.type === Row) return el

                    if (React.isValidElement(el) && el.type === Cell) {
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
