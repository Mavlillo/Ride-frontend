import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import { useLocation } from "wouter"
import CreateStudentForm from "./components/CreateStudentForm"
import { Link } from "wouter"

const fetchAllStudents =async (token) =>{
  return axios.get('http://localhost:4000/api/students',{
    headers:{
      Authorization: `Bearer ${token}`
  }    
  })
 
}

export default function Student() {
    const [students, setStudents] = useState([])
    const [,setLocation] = useLocation()
    const { token,clearSession } = useAuth()


    useEffect(() => {
      if (!token) {
        setLocation("/")
        return
      }
        fetchAllStudents(token)
        .then(res => {
          setStudents(res.data)
        })
        .catch(err => {
          clearSession()
        })
    },[token, setLocation, clearSession])

    const handleRefetch = () => {
      fetchAllStudents(token)
      .then(res => {
        setStudents(res.data)
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
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Ingresa Estudiante</h1>
                    <CreateStudentForm onStudentCreate={handleRefetch}/>   
                      </div>
                       </div>

      <div class="p-4 lg:w-1/3">
        <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Tus Estudiantes</h1>
          <div className="space-y-3">
          {students.map(student =>(  
          <div key={student._id} className=" bg-[#fbfbfb] py-3 px-6">
          <h3 className="text-xl font-bold">{student.firstName}</h3>
          <p className="text-sm mb2">{student.lastName}</p>
          <p className="text-sm mb2">{student.grade}</p>
          <p className="text-sm mb2">{student.address}</p>
            </div>
          ))}
           </div>
           </div>
           </div>

      <div class="p-4 lg:w-1/3">
        <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-12 pb-8 rounded-lg overflow-hidden text-center relative">
          <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded bg-opacity-0">
      <ul class="space-y-2">
      <li>
            <a href="/" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:gray-900 hover:bg-gray-100 dark:hover:bg-[#C0C0C0]">
               <span class="flex-1 ml-3 whitespace-nowrap">Recorridos</span>
            </a>
         </li>
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
                <Link
                to="/"
                className="bg-slate-500 hover:bg-[#83bb54] text-white font-bold py-2 px-4 rounded-full"
                > Volver
                </Link>

         </div>
      </div>
    </div>
  </div>
</section>
    )
  }