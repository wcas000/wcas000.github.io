import "./App.css";
import React, { useState } from "react";

export default function App() {
  
  const [inputToDo, setInputToDo] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [updateId, setUpdateId] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateId) {
      const updateToDo = toDoList.find((i) => i.id === updateId);
      const updatedToDoList = toDoList.map((t) =>
        t.id === updateToDo.id
          ? (t = { id: t.id, inputToDo })
          : { id: t.id, inputToDo: t.inputToDo }
      );
      setToDoList(updatedToDoList);
      setUpdateId(0);
      setInputToDo("");
      return;
    }
    
    if (inputToDo !== "") {
      setToDoList([
        { id: `${inputToDo}-${Date.now()}`, inputToDo },
        ...toDoList
      ]);
      setInputToDo("");
    }
  };
  const handleDelete = (id) => {
    const deleteToDo = toDoList.filter((to) => to.id !== id);
    setToDoList([...deleteToDo]);
  };
  const handleUpdate = (id) => {
    const updateToDo = toDoList.find((i) => i.id === id);
    setInputToDo(updateToDo.inpuToDo);
    setUpdateId(id);
  };
  return (
    <div className="App">
      <div className="container">        
        <h1>To-Do List</h1>      
        <form className="toDoForm" onSubmit={handleSubmit}>         
          <input
            type="text"
            value={inputToDo}
            onChange={(e) => setInputToDo(e.target.value)}
          />          
          <button type="sumbit">{updateId ? "Update" : "Add"}</button>
        </form>       
        <ul className="allToDoList">
          {toDoList.map((t) => (
            <li className="singleTodoTask" key={t.id}>
              <span className="toDoText" >
                {t.inputToDo}
              </span>              
              <button onClick={() => handleUpdate(t.id)}>Update</button>              
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
