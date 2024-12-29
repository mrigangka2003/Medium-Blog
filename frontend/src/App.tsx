import { BrowserRouter , Routes ,Route } from "react-router-dom"
import { Signin ,Signup , Blog } from "./pages"

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/blog" element={<Blog/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
