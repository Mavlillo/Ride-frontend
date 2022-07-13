import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";




export default function CreateStudentForm ({onStudentCreate}){
    const { token } = useAuth()
    const { register, handleSubmit} = useForm({
        defaultValues:{
            title: 'My title' ,
            content:'My Description',
            done: false
        }
    })

    const onSubmit =async (data) => {
        axios.post('http://localhost:4000/api/students',data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(() =>{
            onStudentCreate()
    })
    }


    return (
        <form className="space-y-3 py-4  bg-[#fbfbfb] rounded" onSubmit={handleSubmit(onSubmit)}>
            <div className="flez flex-col  ">
                <label htmlFor="firstName" className="font-bold">
                    Nombre
                </label>
                <br />
                <input classname = "bg-slate-300"
                type="text"
                id="firstName"
                {...register('firstName')}/>
            </div>
            <div className="flez flex-col">
                <label htmlFor="lastName" className="font-bold">
                   Apellido
                </label>
                <br />
                <input classname = "bg-slate-300"
                type="text" 
                id="lastName"
                {...register('lastName')}/>
            </div>
            <div className="flez flex-col">
                <label htmlFor="grade" className="font-bold">
                   Curso
                </label>
                <br />
                <input classname = "bg-slate-300"
                type="text" 
                id="grade"
                {...register('grade')}/>
            </div>
            <div className="flez flex-col">
                <label htmlFor="address" className="font-bold">
                 Direccion
                </label>
                <br />
                <input classname = "bg-slate-300"
                type="text" 
                id="address"
                {...register('address')}/>
            </div>     
            <button class="bg-slate-500 hover:bg-[#83bb54] text-white font-bold py-2 px-4 rounded-full">
                    Agregar
            </button>
          </form>
    )
}