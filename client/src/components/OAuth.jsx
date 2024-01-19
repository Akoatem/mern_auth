import {signInWithPopup, GoogleAuthProvider, getAuth} from "firebase/auth"
import { app } from "../firebase"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../redux/user/userSlice"

export default function OAuth() {
    const dispatch = useDispatch()

    const handleClick = async()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
           // console.log(result);
           const res = await fetch("/api/auth/google",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
              }),

           })
           const data = await res.json()
           dispatch(loginSuccess(data))
        } catch (error) {
            console.log("could not login with google", error);
        }
    }
  return (
    <button type='button'onClick={handleClick} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>Continue with google</button>
  )
}
