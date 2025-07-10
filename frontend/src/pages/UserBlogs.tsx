import { useUserBlogs } from "../hooks/index";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

// Make sure you have a config file that exports your backend URL
// Example: export const BACKEND_URL = "https://backend.yourdomain.com";


// Define an interface for the Blog object to give TypeScript context
interface Blog {
    id: string;
    title: string;
    content: string;
    author: {
        name: string;
    };
}

export const UserBlogs = () => {
    // The useUserBlogs hook fetches the initial list of blogs
    const { loading, userBlogs: initialUserBlogs } = useUserBlogs();
    
    // We explicitly type the state to be an array of Blog objects
    const [userBlogs, setUserBlogs] = useState<Blog[]>([]);

    // This effect syncs the state from your hook with this component's local state
    useEffect(() => {
        if (initialUserBlogs) {
            setUserBlogs(initialUserBlogs);
        }
    }, [initialUserBlogs]);

    // This function will be called when the delete button is clicked
    const handleDelete = async (idToDelete: string) => {
        // Note: For a better user experience, you should implement a custom confirmation modal
        // instead of using window.confirm() or alert().

        try {
            // Make the DELETE request to your backend API
            await axios.delete(`${BACKEND_URL}/api/v1/blog/${idToDelete}`, {
                headers: {
                    // Assumes the auth token is stored in localStorage
                    Authorization: localStorage.getItem("token")
                }
            });

            // If the request is successful, update the UI by filtering out the deleted blog
            setUserBlogs(currentBlogs => currentBlogs.filter(blog => blog.id !== idToDelete));

        } catch (e) {
            console.error("Error deleting blog post:", e);
            // You can add a user-friendly error notification here
        }
    };

    // Show loading skeletons while fetching data
    if (loading) {
        return (
            <div>
                <AppBar />
                <div className="flex justify-center">
                    <div>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    // Render the list of user blogs
    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="max-w-xl w-full">
                    {userBlogs.map(blog => (
                        // We wrap the BlogCard in a div to position the delete button
                        // relative to the card without modifying the BlogCard component itself.
                        // The border has been removed from this div to prevent a double-border issue.
                        <div key={blog.id} className="relative">
                            <BlogCard
                                id={blog.id}
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                            />
                            <button
                                onClick={() => handleDelete(blog.id)}
                                className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                                aria-label="Delete blog post"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
