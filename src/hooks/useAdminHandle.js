import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../firebase"

export const useAdminHandle = () => {
  
    const createAccountWithEmail = async ({ email, password, onSuccess, onFail }) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            onSuccess(user.user)
        } catch (error) {
            onFail(error.message)
        }
    }

    const signInAccount = async ({ email, password, onSuccess, onFail }) => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            onSuccess(user.user)
        } catch (error) {
            onFail(error.message)
        }
    }

    const signOutAccount = async(onFail)=>{
        try {
           await signOut(auth)
        } catch (error) {
            onFail(error);
        }
       }

    return{ createAccountWithEmail, signInAccount, signOutAccount }
}
