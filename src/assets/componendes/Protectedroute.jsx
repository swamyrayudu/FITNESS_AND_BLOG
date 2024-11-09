import { Navigate } from "react-router-dom"
import { ContextUser } from "../contexts/Contextuser"
import { useContext } from "react"

export default function Protect(props)
{
    const loggeddata = useContext(ContextUser)
    return(
    loggeddata.loginuser!==null?
        <props.Component/>
        :
        <Navigate to='/login'/>
        
        

    )
}