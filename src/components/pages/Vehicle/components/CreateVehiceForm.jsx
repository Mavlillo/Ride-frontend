import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";


export default function CreateVehicleForm ({onVehicleCreate}){
    const { token } = useAuth()
    const { register, handleSubmit} = useForm({
        defaultValues:{
            title: 'My title' ,
            content:'My Description',
            done: false
        }
    })

    const onSubmit =async (data) => {
        axios.post('http://localhost:4000/api/vehicles',data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(() =>{
            onVehicleCreate()
    })
    }


    return (
        <form className="space-y-3 py-4  bg-[#fbfbfb] rounded" onSubmit={handleSubmit(onSubmit)}>
            <div className="flez flex-col  ">
                <label htmlFor="patent" className="font-bold">
                    Patente
                </label>
                <br />
                <input classname = "bg-slate-300"
                type="text"
                id="patent"
                {...register('patent')}/>
            </div>
            <div className="flez flex-col">
                <label htmlFor="brand" className="font-bold">
                   Marca
                </label>
                <br />
                <input classname = "bg-slate-300"
                type="text" 
                id="brand"
                {...register('brand')}/>
            </div>
            <div className="flez flex-col">
                <label htmlFor="model" className="font-bold">
                   Modelo
                </label>
                <br />
                <input classname = "bg-slate-300"
                type="text" 
                id="model"
                {...register('model')}/>
            </div>
            <div className="flez flex-col">
                <label htmlFor="year" className="font-bold">
                 Año
                </label>
                <br />
                <input classname = "bg-slate-300"
                type="text" 
                id="year"
                {...register('year')}/>
            </div>
            <div className="flez flex-col">
                <label htmlFor="colour" className="font-bold">
                 Color
                </label>
                <br />
                <input classname = "bg-slate-300"
                type="text" 
                id="colour"
                {...register('colour')}/>
            </div>
            <div className="flez flex-col">
                <label htmlFor="ability" className="font-bold">
                 Capacidad
                </label>
                <br />
                <input classname = "bg-slate-300"
                type="text" 
                id="ability"
                {...register('ability')}/>
            </div>
            <button class="bg-slate-500 hover:bg-[#83bb54] text-white font-bold py-2 px-4 rounded-full">
                    Agregar
            </button>
          </form>
    )
}