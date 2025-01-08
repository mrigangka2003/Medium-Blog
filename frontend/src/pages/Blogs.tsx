import { Appbar, BlogCard,Spinner } from "../components";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div className="flex w-screeen h-screen justify-center items-center text-3xl font-semibold">
               <Spinner/>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div className=" flex justify-center">
                <div className="">
                    {blogs.map((blog) => (
                        <BlogCard
                            id={blog.id}
                            authorname={blog.author.name || "Anonymous  "}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={"23rd June"}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
