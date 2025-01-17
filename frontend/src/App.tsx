import { BrowserRouter , Routes ,Route } from "react-router-dom"
import { Signin ,Signup , Blog, Blogs, Publish } from "./pages"

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/" element={<Signup/>}/>
        <Route path="/blog/:id" element={<Blog/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/publish" element={<Publish/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
