import { SignInAuth } from "../components/SignInAuth"
import { Quote } from "../components/Quote"

export const Signin = () => {
    return <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="col-span-1">
                <SignInAuth />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
}