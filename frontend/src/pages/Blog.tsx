
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Appbar ,FullBlog } from "../components";
// type Props = {}

export const Blog = () => {

  const { id } = useParams()
  const {loading, blog} = useBlog({
    id: id || ""
  });

  if(loading || !blog){
    return <div>
      <Appbar/>
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">

          </div>
            blog Details
        </div>
    </div>
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  )
}

export default Blog