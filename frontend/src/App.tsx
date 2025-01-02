import { BrowserRouter , Routes ,Route } from "react-router-dom"
import { Signin ,Signup , Blog, Blogs } from "./pages"

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
