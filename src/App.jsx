import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  function getAllUser(){
    useEffect(() => {
    fetch("https://educationcrm.uz:3006/")
    .then(res=>res.json())
    .then(data=>setData(data.DATA))
  },[])
  }
  getAllUser()

  const inp1 =useRef(null)
  const inp2 =useRef(null)

  function getNameAge(){
    let currentUser ={
      name: inp1.current.value,
      age: +inp2.current.value
    }

   fetch("https://educationcrm.uz:3006/",{
    method:"POST",
    headers: {
      'content-type': 'application/json'
    },
    body:JSON.stringify(currentUser
    )
   })
    .then(res=>res.json())
    .then(data=>console.log(data))
  }
  function remove(id){
    fetch(`https://educationcrm.uz:3006/${id}`,{
      method: " DELETE"
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    getAllUser()
  }
  function update(id){
    fetch(`https://educationcrm.uz:3006/${id}`,{
      method:"PUT",
      body:JSON.stringify(
          {
              name: "gayrat",
              age: 15
          }
      )
    })
    .then(res=>res.json())
    .then(data=>console.log(data))

    fetch(`https://educationcrm.uz:3006/${id}`,{
      method:"PATCH",
      body:JSON.stringify(
          {
              name: "gayrat",
              age: 15
          }
      )
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    getAllUser()
  }
  return (
    <div className="home">
      <input ref={inp1} type="text" />
      <input ref={inp2} type="number" />
      <button onClick={getNameAge}>Click</button>
      {data.map(item=>{
        return(
          <div key={item.id}>
            <h1 onClick={() => {remove(item.id)}}>{item.name}</h1>
            <h2 onClick={() => {update(item.id)}}>{item.age}</h2>
        </div>
        )
      })}
    </div>
  )
}

export default App
