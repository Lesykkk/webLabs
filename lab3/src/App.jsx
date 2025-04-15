import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, About, Tickets } from './pages'

export default function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about/" element={<About />} />
                <Route path="/tickets/" element={<Tickets />} />
            </Routes>
        </Router>
    </>
  )
}