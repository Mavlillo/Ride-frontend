import { useForm } from "react-hook-form"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import { useEffect } from "react"
import { useLocation } from "wouter"
import { Link } from "wouter"

export default function Register () {
    const { user, setSession} =useAuth()
    const [,setLocation] = useLocation()
 
 useEffect(()=> {
    if (user) {
        setLocation('/')
    }
 },[user, setLocation])
 
    const{register,handleSubmit}=useForm({
 
    })

    const onSubmit = async (data) =>{
        const res =await axios.post('http://localhost:4000/api/auth/register',data)
        const token = res.data.token
        setSession(token)
        setLocation('/')
    }

    return (

        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
             <h1 class="text-4xl font-extrabold text-gray-500 tracking-tight sm:text-4xl">Unete a una plataforma integrada </h1>
             <p class="leading-relaxed mt-4"> Registrate en una plataforma que une la infomacion del transorte escolar para brindar el mejor servicio posible.</p>
              </div>
              <div class="lg:w-2/6 md:w-1/2 bg-[#fbfbfb] rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
              </div>
              <div className="bg-[#fbfbfb] py-10 px-9 shadow sm:rounded-lg sm:px-10 border-4 border-slate-400">
              <h1 class="title-font font-medium text-2xl text-slate-700">
              Registrarse
              </h1>
              <br />
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flez flex-col ml-2">
                <label htmlFor="firstName" className="font-bold">
                    Apellido
                </label>
                <br />
                <input 
                type="text"
                id="firstName"
                {...register('firstName')}/>
            </div>
          <div className="flez flex-col ml-2">
                <label htmlFor="lastName" className="font-bold">
                    Nombre
                </label>
                <br />
                <input 
                type="text"
                id="lastName"
                {...register('lastName')}/>
            </div>
            <div className="flez flex-col ml-2">
                <label htmlFor="email" className="font-bold">
                    Email
                </label>
                <br />
                <input 
                type="email"
                id="email"
                {...register('email')}/>
            </div>
            <div className="flez flex-col ml-2">
                <label htmlFor="password" className="font-bold">
                    Password
                </label>
                <br />
                <input 
                type="password" 
                id="password"
                {...register('password')}/>
            </div>
            <div class="flex space-x-4 ...">
            <button type="submit" 
               className="bg-slate-500 hover:bg-[#83bb54] text-white font-bold py-2 px-4 rounded-full">
                    Ingresar
            </button>
              <Link
                to="/Login"
                className="bg-slate-500 hover:bg-[#20d0fc] text-white font-bold py-2 px-4 rounded-full">
                Volver
              </Link>
              </div>
              </form>            
        </div>
     </div>
  </div>
</section>
    )
  }