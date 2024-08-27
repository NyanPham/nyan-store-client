import { useContext, createContext, useState } from 'react'

type SideCartContextValue = {
    openSideCart: boolean;
    setOpenSideCart: (open: boolean) => void;
}

const SideCartContext = createContext<SideCartContextValue>({
    openSideCart: false,
    setOpenSideCart: () => {},
})
export const useSideCartContext = () => useContext(SideCartContext)

type SideContextProviderProps = {
    children: React.ReactNode
}

export default function SideContextProvider({ children } : SideContextProviderProps) {
    const [openSideCart, setOpenSideCart] = useState(false)

    return <SideCartContext.Provider value={{ openSideCart, setOpenSideCart }}>{children}</SideCartContext.Provider>
}
