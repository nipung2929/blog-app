import { type Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: {blog: Blog}) => {
    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                {/* Main content grid */} 
                <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12">
                    {/* Left column for blog content */}
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Post on 2nd December 2023
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>

                    {/* Right column for author details */}
                    {/* Added some left padding (pl-8) to separate from the main content */}
                    <div className="col-span-4 pl-8">
                        <div className="flex flex-col"> {/* Use flex-col to stack items vertically */}
                            <div className="text-slate-600 text-lg">
                                Author
                            </div>
                            <div className="text-xl font-bold pt-2"> {/* pt-2 for space below "Author" */}
                                {blog.author.name || "Anonymous"}
                            </div>

                            {/* Section for Avatar and Catchphrase, with top margin for separation */}
                            <div className="flex mt-4"> {/* mt-4 (margin-top) creates space between name and avatar section */}
                                <div className="pr-4 flex flex-col justify-center"> {/* Vertically center avatar if needed */}
                                    <Avatar size="big" name={blog.author.name || "Anonymous"} />
                                </div>
                                <div>
                                    <div className="text-slate-500"> {/* Removed pt-2 here, as mt-4 on parent handles spacing */}
                                        Writing about ideas worth sharing. Exploring thoughts, stories, and insights one post at a time. Always curious, always evolving.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}