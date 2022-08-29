import { Routes, Route } from 'react-router-dom'
import Signup from './components/Authentication/Signup'
import Header from './components/Header'
import Home from './components/Home'
import SidebarNavigationDrawer from './components/SidebarNavigationDrawer'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Header />
                            <Home />
                        </>
                    }
                />
                <Route path="/sign-up" element={<Signup />} />
            </Routes>
            <SidebarNavigationDrawer />
        </div>
    )
}

export default App
