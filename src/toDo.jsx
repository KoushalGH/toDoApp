import React,{useState,useEffect} from 'react';
import './App.css'
function Todo(){

    const [tasks,setTasks]=useState([]);
    const [newTask,setNewTask]=useState("");

     useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);


    function handleModel(event){
        setNewTask(event.target.value);
    }
    function handleAdd(){
        if(newTask.trim()!==""){
        setTasks(t=>[...t,newTask])
        setNewTask("")
    }
    }
    function handleDelete(index){
        const upTasks=tasks.filter((_,i)=>i!==index)
        setTasks(upTasks);
    }
    function handleMoveTaskUp(index){
        if(index>0){
            const updTasks=[...tasks];
            [updTasks[index],updTasks[index-1]]=[updTasks[index-1],updTasks[index]]
            setTasks(updTasks)
        }
    }
    function handleMoveTaskDown(index){
        if(index<tasks.length-1){
            const updTask=[...tasks];
            [updTask[index],updTask[index+1]]=[updTask[index+1],updTask[index]]
            setTasks(updTask)
        }
    }

 return(

    <div>
        <h1>ToDo-List</h1><br /><br />
        <input type="text" placeholder="Enter Text" className="ipt-field" value={newTask} onChange={handleModel}/>
        <button className="btn" onClick={handleAdd}>Add Query</button>
        <ol className="list">
           {tasks.map((Ele,index)=>
            <li key={index}>
                <span className="goL">
                {Ele}</span>
                <button className="del" onClick={()=>handleDelete(index)}>Delete</button>
                <button className="arr"onClick={()=>handleMoveTaskUp(index)}>👆</button>
                <button className="arr" onClick={()=>handleMoveTaskDown(index)}>👇</button>
                </li>
            
        )}
        </ol>

    </div>
 )
}
export default Todo