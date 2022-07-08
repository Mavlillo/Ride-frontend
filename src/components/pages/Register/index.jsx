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
        defaultValues:{
            email:"pablo@gmail.com",
            password:"123456"
        }
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
      <h1 class="title-font font-medium text-3xl text-slate-700">Unete</h1>
      <p class="leading-relaxed mt-4">Una plataforma para el transporte de estudiantes para brindarla informacion que esperan los padres, los estudiantes, los conductores y las escuelas.</p>
    </div>
    <div class="lg:w-2/6 md:w-1/2 bg-[#fbfbfb] rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
          </div>
        <div className="bg-[#fbfbfb] py-10 px-9 shadow sm:rounded-lg sm:px-10 border-4 border-green-500/50">
          <h1 class="title-font font-medium text-2xl text-slate-700">
          Registrarse
          </h1>
          <br />
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flez flex-col ml-2">
                <label htmlFor="firstName" className="font-bold">
                    Apellido
                </label>
                <input 
                type="text"
                id="firstName"
                {...register('firstName')}/>
            </div>
          <div className="flez flex-col ml-2">
                <label htmlFor="lastName" className="font-bold">
                    Nombre
                </label>
                <input 
                type="text"
                id="lastName"
                {...register('lastName')}/>
            </div>
            <div className="flez flex-col ml-2">
                <label htmlFor="email" className="font-bold">
                    Email
                </label>
                <input 
                type="email"
                id="email"
                {...register('email')}/>
            </div>
            <div className="flez flex-col ml-2">
                <label htmlFor="password" className="font-bold">
                    Password
                </label>
                <input 
                type="password" 
                id="password"
                {...register('password')}/>
            </div>
            <div class="flex space-x-4 ...">
            <button type="submit" 
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">
                    Ingresar
            </button>

            <Link
                to="/Login"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-15">
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