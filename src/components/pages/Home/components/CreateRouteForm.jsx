import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";


export default function CreateRouteForm ({onRouteCreate}){
    const { token } = useAuth()
    const { register, handleSubmit} = useForm({
        defaultValues:{
            title: 'My title' ,
            content:'My Description',
            done: false
        }
    })

    const onSubmit =async (data) => {
        axios.post('http://localhost:4000/api/routes',data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(() =>{
            onTaskCreate()
    })
    }


    return (
        <form className="space-y-3 py-4  bg-[#fbfbfb] rounded" onSubmit={handleSubmit(onSubmit)}>
            <div className="flez flex-col  ">
                <label htmlFor="title" className="font-bold">
                    Colegio
                </label>
                <br />
                <input classname = "bg-slate-300"
                type="text"
                id="title"
                {...register('title')}/>
            </div>
            <div className="flez flex-col">
                <label htmlFor="content" className="font-bold">
                   Trayecto
                </label>
                <br />
                <textarea
                type="text" 
                id="content"
                {...register('content')}/>
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Agregar
            </button>
          </form>
    )
}