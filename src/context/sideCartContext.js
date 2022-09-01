import React, { useContext, createContext, useState, useEffect } from 'react'

const SideCartContext = createContext()
export const useSideCartContext = () => useContext(SideCartContext)

export default function SideContextProvider({ children }) {
    const [openSideCart, setOpenSideCart] = useState(false)

    return <SideCartContext.Provider value={{ openSideCart, setOpenSideCart }}>{children}</SideCartContext.Provider>
}
