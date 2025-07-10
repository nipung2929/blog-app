
import { Link } from "react-router-dom"

function signOut(){
    localStorage.removeItem('token');
}

export const AppBar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-extrabold font-playflair text-3xl">
                The Blog App
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>
            <Link to={`/user-blogs`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Your Blogs</button>
            </Link>
             <Link to={`/signup`}>
                <button onClick = {signOut} type="button" className="cursor-pointer mr-4 mb-2 text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ">Sign Out</button>
            </Link>
        </div>
    </div>
}