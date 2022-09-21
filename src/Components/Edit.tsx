import axios from "axios"
import { NavLink,useParams } from "react-router-dom"
import {ChangeEvent,FC,useState} from "react"

type Todo={
    _id:string,
    id:number,
    title:string
}

export const Edit:FC=()=>{
    
    const [data,setData]=useState<Todo[]>([])
    const {id}=useParams()

    const updateTodo=():void=>{
        axios.patch(`http://localhost:4445/todos/${id}`,data)
        .then(function(res){
            alert("your data is updated")
        })
    }

    const handleChange=(e:ChangeEvent<HTMLInputElement>):void=>{
     const {id,value}=e.target
     setData({...data,[id]:value})
    }

    return(
<>
<div className='Edit'>
        <h1>Edit your task</h1>
        <input onChange={handleChange} id="title"/><br></br>
        <button onClick={updateTodo}>Edit</button><br></br>
        <NavLink to="/"><button>Back To TODOs</button></NavLink>
        </div>
</>
    )
}
