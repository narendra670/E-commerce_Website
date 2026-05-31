import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import { selectIsAuthChecked, selectLoggedInUser } from "../AuthSlice"


export const Protected = ({children}) => {
    const isAuthChecked = useSelector(selectIsAuthChecked)
    const loggedInUser = useSelector(selectLoggedInUser)

    if(!isAuthChecked) return null
    if(loggedInUser) return children
    return <Navigate to={'/login'} replace={true}/>
}