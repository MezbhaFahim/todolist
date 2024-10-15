import React, { useState } from "react";
import axios from "axios"

function Create() {

  const [task, setTask] =useState()

  const handleAdd = ()=>{

    axios.post('http://localhost:3001/add',{task:task})
    .then(result=> {
      location.reload()
    })
    .catch(err => console.log(err))

  }
  return (
    <div className="d-flex flex-column align-items-top">
      <h2 className="task-box text-top fw-bold mb-4">Add Your Task</h2>

      <div className="input-group" style={{ maxWidth: "1000px" }}>
        <input
          type="text"
          className="form-control border-black"
          placeholder="Input your task"
          aria-describedby="input-group-button-right"
          onChange={(e)=> setTask(e.target.value)}
        />
        <button
          type="button"
          className="btn custom-button fw-bold text-white bg-black"
          id="input-group-button-right"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Create;
