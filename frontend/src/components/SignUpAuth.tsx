import type { UserSchema } from "@nipung2929/medium";
import axios from "axios";
import { useState, type ChangeEvent } from "react"
import {Link, useNavigate} from "react-router-dom"
import {BACKEND_URL} from "../../config.ts"



export const SignUpAuth = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<UserSchema>({
        email: "",
        password: "",
        name: ""
    });

    async function sendRequest(){
    try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs)
        const jwt = response.data;
        localStorage.setItem("token", jwt);
        navigate("/blogs");
    } catch(e){

    }
}
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                <div className="text-3xl font-extrabold">
                    Create an account
                </div>
                <div className="text-slate-400">
                    Already have an account ?<Link className="pl-2 underline" to={"/signin"}>Sign In</Link>
                </div>
            </div>

            <div className="pt-4">
                <LabelledInput label = "Name" placeholder="Enter your name" onChange={(e) => {
                setPostInputs(c => ({
                    ...c,
                    name: e.target.value
                }))
            }} />
                

            <LabelledInput label = "Email" placeholder="Enter your email" onChange={(e) => {
                setPostInputs(c => ({
                    ...c,
                    email: e.target.value
                }))
            }} />

            <LabelledInput label = "Password" type={"password"} placeholder="Enter your password" onChange={(e) => {
                setPostInputs(c => ({
                    ...c,
                    password: e.target.value
                }))
            }} />

            <div className="pt-4">
                <button onClick = {sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign Up</button>
            </div>
            </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label : string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

function LabelledInput({label, placeholder, onChange, type} : LabelledInputType){
    return <div>
            <label className="block mb-2 text-sm font-semibold text-gray-900 pt-4">{label}</label>
            <input onChange = {onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
}