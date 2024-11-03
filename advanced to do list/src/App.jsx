import { useEffect, useState } from "react";

export default function App () {
  const [task,settask] = useState([]);
  const [text,settext] = useState("");
  const [dvalue,setdvalue] = useState("");
  const [temp,settemp] = useState([]);
  
  function addtask(){
    settask([...task,{text:text,completed:false}]);
    settext("");
  }
  function handlecheck(index){
    const updatedtask = task.map((tasks,i)=>
    i === index ? {...tasks,completed:!tasks.completed} : tasks);
    settask(updatedtask.sort((a,b)=> a.completed - b.completed));
  }
  function handledelete(){
    let updatedlist = task.filter((x,i)=>{
    if (!x.completed) {
      return x;
    }
    })
    settask(updatedlist);
  }
  function handleselect(e){
    setdvalue(e.target.value);
  }
  useEffect(()=>{
    handleoption();
  },[dvalue,task]);

  function handleoption() {
    if(dvalue==="completed"){
      settemp(task.filter((x)=> x.completed));
    }
    else if(dvalue==="incompleted"){
      settemp(task.filter((x)=> !x.completed));
    }else{
      settemp(task);
    }
  }
  return(<>
  <h2>the TO DO app</h2>
  <input type="text" onChange={(e)=>settext(e.target.value)} />
  <button onClick={addtask}>ADD</button>
  <ul>
        {temp.map((task, index) => (
          <li key={index} 
          style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handlecheck(index)}
            />
            {task.text}
          </li>
        ))}
      </ul>
    <button onClick={handledelete}>delete the completed task</button>

    <select name="" id="" onChange={handleselect} value={dvalue}>
    <option value="">select one option</option>
    <option value="all">all</option>
    <option value="completed">completed</option>
    <option value="incompleted">incomplete</option>
    </select>
    <p>selected option is {dvalue}</p>
      </>);
}