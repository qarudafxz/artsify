/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from '@renderer/pages/index'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default App
