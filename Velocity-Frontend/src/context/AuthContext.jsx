import { useContext , createContext  ,useState, useEffect} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider  = ({children}) => {

  const [user , setUser] = useState(null)
  const [loading , setLoading] = useState(true)
  
  const getUser  = async () => {
    try{
      const response = await axios.get('http://localhost:8000/api/auth/getUser', {withCredentials:true})
      setUser(response.data)
    }
    catch(error){
      setUser(null)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  } ,[])
  
  return(
    <AuthContext.Provider value={{user , setUser , loading}}>
      {children}
    </AuthContext.Provider>
  )
}
