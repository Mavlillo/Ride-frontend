import jwtDecode from "jwt-decode"
import { createContext, useContext, useEffect,useState} from "react"


const AuthContext =createContext({
    user:null,
    token:null,
    setSession: _token => {},
    clearSession: () => {},
})

export function AuthProvider ({children}){
    const [user,setUser] = useState(null)
    const [token,setToken] = useState(null)

    useEffect(() =>{
        const token =localStorage.getItem('token')
        if (token){
            setToken(token)
            }
    },[token])

    useEffect(()=>{
        if(token){
            try{
            const decoded = jwtDecode(token)
            setUser(decoded)
        } catch {
            clearSession()
        }
        } else {
            setUser(null)
        }
        },[token])   

    const setSession = token =>{
        setToken(token)
       

    }

    const clearSession = ()=>{
        setToken(null)
       localStorage.removeItem('token')
     }

return (
    <AuthContext.Provider value={{
        user,
        token,
        setSession,
        clearSession
    }}>
    {children}
    </AuthContext.Provider>
    
)}


export const useAuth = () => useContext(AuthContext)