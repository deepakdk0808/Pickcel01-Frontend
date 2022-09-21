import React, { ChangeEvent,FC,useState,useEffect } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

type Todo={
    _id:string,
    id:number,
    title:string
}

export const Create:FC=()=>{
    const [todos, setTodos] = useState<Todo[]>([]);
    const [getTodos,setGetTodos]=useState<Todo[]>([])

    ////try to write JSDOCS
    
    /**
     * below function handles the event changes of input
     * @param e eventchange
     * @return void
     */
    const handleChange = (e:ChangeEvent<HTMLInputElement>):void => {
      const { id, value } = e.target;
      setTodos({ ...todos, [id]: value })
    }
   
    ///FOR POSTING TODO
    const updateTodo=():void=>{
      console.log(todos);
      axios.post(`http://localhost:4445/todos`,todos).then((response) => {
        alert("Data is Added in The Table ✔️")
        getTodo()
      })
    }

    ///FOR GETTING TODO
    useEffect(()=>{
       getTodo()
    },[])

    const getTodo=():void=>{
        fetch("http://localhost:4445/todos").then((result) => {
            result.json().then((resp) => {
              console.log(resp.todos)
              setGetTodos(resp.todos)
            })
          })
    }


    ///FOR DELETING TODO

    const deleteTodo=(_id:string):void=>{
      fetch(`http://localhost:4445/todos/${_id}`,{
        method:"DELETE",
      }).then((res)=>{
        res.json().then((resp)=>{
          getTodo()
        })
      })

    }

    return (
      
      <div className='Container'>
        <div className='Create'>
        <h1>ADD TODO </h1>
        <h4>ID</h4>
        <input type="number" id="id" onChange={handleChange} /> <br /> <br />
        <h4>TITLE</h4>
        <input type="text" id="title" onChange={handleChange} /> <br /> <br />
        <button type="button" onClick={updateTodo} >Save New Todo</button>
        </div>
        <div className='todos'>
            {getTodos.map((e,key)=>(
               <>
                <div key={key}>{e.id}</div>
                <div>
                  <NavLink to={`edit/${e._id}`}>{e.title}</NavLink>
                  </div>
                <div><button onClick={()=>deleteTodo(e._id)}>Delete</button></div>
               </>
            ))}

        </div>
        </div>
  

    );
}
