import { useBlogs } from "../hooks"
import { AppBar } from "./AppBar"
import { BlogCard } from "./BlogCard";
import { BlogSkeleton } from "./BlogSkeleton";



export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading) {
        return <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>
    }
    
    return <div>
    <AppBar />
    <div className="flex justify-center">
    <div className="max-w-xl">
        {blogs.map(blog => <BlogCard 
        authorName={blog.author.name}
        title= {blog.title}
        content= {blog.content}
        id= {blog.id}
        />)}
    </div>

    </div>
    </div>
    
}