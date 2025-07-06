import { SignUpAuth } from "../components/SignUpAuth"
import { Quote } from "../components/Quote"

export const Signup = () => {
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1">
            <SignUpAuth />
        </div>
        <div className="hidden lg:block">
            <Quote />
        </div>
    </div>
}