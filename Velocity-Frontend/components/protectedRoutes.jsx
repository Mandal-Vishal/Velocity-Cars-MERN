import { useContext } from "react"
import { AuthContext } from "@/src/context/AuthContext"
import { Navigate,Outlet } from "react-router-dom"

const ProtectedRoutes  = ({allowedRoles}) => {
    const {user , loading} = useContext(AuthContext)

    if(loading){
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to = '/login' replace />
    }
    if(allowedRoles && !allowedRoles.includes(user.role)){
        console.log(!allowedRoles.includes(user.role))
        console.log(user.role)
        console.log(allowedRoles);
        
        return <Navigate to = '/404'/>
    }
    return <Outlet/>
}

export default ProtectedRoutes