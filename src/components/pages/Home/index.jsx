import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import { useLocation } from "wouter"
import CreateTaskForm from "./components/CreateTaskForm"

const fetchAllTasks =async (token) =>{
  return axios.get('http://localhost:4000/api/tasks',{
    headers:{
      Authorization: `Bearer ${token}`
  }    
  })
 
}

export default function Home () {
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
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Ingresa tu trayecto</h1>
                    <CreateTaskForm onTaskCreate={handleRefetch}/>      
                      </div>
                       </div>

      <div class="p-4 lg:w-1/3">
        <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Tus Recorridos</h1>
          <div className="space-y-3">
          {tasks.map(task =>(  
          <div key={task._id} className=" bg-[#fbfbfb] py-3 px-6">
          <p className="text-2xl font-extrabold text-gray-400 tracking-tight sm:text-2xl">Colegio</p>
          <h3 className="text-2xl font-extrabold text-gray-500 tracking-tight sm:text-2xl">{task.title}</h3>
          <p className="text-2xl font-extrabold text-gray-400 tracking-tight sm:text-2xl">Trayecto</p>
          <p className="text-2xl font-extrabold text-gray-500 tracking-tight sm:text-2xl">{task.content}</p>
          <p className="text-2xl font-extrabold text-gray-400 tracking-tight sm:text-2xl">Valor Aproximado</p>
          <p className="text-2xl font-extrabold text-gray-500 tracking-tight sm:text-2xl">{task.value}</p>
           </div>
          ))}
           </div>
           </div>
           </div>

      <div class="p-4 lg:w-1/3">
      <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-12 pb-4 rounded-lg overflow-hidden text-center relative">
          <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded bg-opacity-0">
      <ul class="space-y-2">
         <li>
            <a href="/Vehicle" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:gray-900 hover:bg-gray-100 dark:hover:bg-[#C0C0C0]">
               <span class="flex-1 ml-3 whitespace-nowrap">Vehículos</span>
            </a>
         </li>
         <li>
            <a href="/Student" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:gray-900 hover:bg-gray-100 dark:hover:bg-[#C0C0C0]">
               <span class="flex-1 ml-3 whitespace-nowrap">Estudiantes</span>
            </a>
         </li>
         <li>
            <a href="/Service" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:gray-900 hover:bg-gray-100 dark:hover:bg-[#C0C0C0]">
               <span class="flex-1 ml-3 whitespace-nowrap">Servicios</span>
            </a>
         </li>
      </ul>
   </div>
   <br />
   <button class="bg-slate-500 hover:bg-[#ff8800] text-white font-bold py-2 px-4 rounded-full"
          onClick={clearSession}>
          Cerrar Sesión
         </button>
         </div>
      </div>
    </div>
  </div>
</section>
    )
  }