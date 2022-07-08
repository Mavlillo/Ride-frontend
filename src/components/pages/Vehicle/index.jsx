import { useEffect, useState } from "react"
import clsx from "clsx"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import { useLocation } from "wouter"
import { Link } from "wouter"


const fetchAllTasks =async (token) =>{
  return axios.get('http://localhost:4000/api/vehicle',{
    headers:{
      Authorization: `Bearer ${token}`
  }    
  })
 
}

export default function Vehicle() {
    const [tasks, setTasks] = useState([])
    const [,setLocation] = useLocation()
    const { token,clearSession } = useAuth()

  

    useEffect(() => {
      if (!token) {
        setLocation("/Login")
        return
      }
        fetchAllTasks(token)
        .then(res => {
          setTasks(res.data)
        })
        .catch(err => {
          clearSession()
        })
    },[token, setLocation, clearSession])

    const handleRefetch = () => {
      fetchAllTasks(token)
      .then(res => {
        setTasks(res.data)
      })
      .catch(err => {
        clearSession()
      })
    }

    return (
      <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
         <div class="flex flex-wrap -m-4">
            <div class="p-4 lg:w-1/3">
               <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                 <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">bienvenido</h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Ingresa tu Vehículo</h1>
                       
                      </div>
                       </div>

      <div class="p-4 lg:w-1/3">
        <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Tus Recorridos</h1>
          <div className="space-y-3">
          {tasks.map(task =>(  
          <div key={task._id} className=" bg-[#fbfbfb] py-3 px-6">
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p className="text-sm mb2">{task.content}</p>
           </div>
          ))}
           </div>
           </div>
           </div>

      <div class="p-4 lg:w-1/3">
        <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
          <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
      <ul class="space-y-2">
         <li>
            <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span class="flex-1 ml-3 whitespace-nowrap">Vehículos</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span class="flex-1 ml-3 whitespace-nowrap">Estudiantes</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <span class="flex-1 ml-3 whitespace-nowrap">Servicios</span>
            </a>
         </li>
      </ul>
   </div>
   <br />
   <a href="javascript:history.back()"> Volver Atrás</a>
         </div>
      </div>
    </div>
  </div>
</section>
    )
  }