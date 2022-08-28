import { Routes, Route } from 'react-router-dom'
import Signup from './components/Authentication/Signup'
import Home from './components/Home'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<Signup />} />
            </Routes>
        </div>
    )
}

export default App
