import { AiOutlineUser } from "react-icons/ai";
import {RiLockPasswordFill} from "react-icons/ri";

const handleAuthentification = () => {

}
export default function SignIn() {
    return(
            <>
                 <div >
                    <form action="">
                        <div className="input-icons"><input type="text" placeholder="Email or username" /><span className="icon"><AiOutlineUser id="icon"/></span></div>
                        <div className="input-icons"><input type="password" placeholder="Password" /><span className="icon"><RiLockPasswordFill id="icon"/></span></div>
                        <button >Log in</button>
                    </form>
                </div>
            </>
                   
    )


}