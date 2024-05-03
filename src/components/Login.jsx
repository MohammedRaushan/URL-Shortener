import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  let [data,setData]=useState([])
  let navigate = useNavigate()
  let email = useRef()
  let passwd = useRef()

  axios.get("http://192.168.1.112:7373/users")
  .then((res)=>{
    setData(res.data)
  })
  .catch((err)=>{
    alert("Failure")
  })
  let login = (e)=>{
    let c=0
    e.preventDefault()
    for(let u of data){
      if(u.name===email.current.value && u.passwd===passwd.current.value){
        c=1
        alert("Login Success...")
        document.cookie = `email=${email.current.value};path=/`
        document.cookie = `password=${passwd.current.value};path=/`
        console.log(document.cookie)
        navigate(`/dashboard/${u.id}`)
        break
      }
    }
    if(c===0){
      alert("Invalid email or password...")
    }
  }
  return (
    <div className="login">
        <form onSubmit={login}>
          <h1>Log in to your Account</h1>
          <input type="email" ref={email} placeholder='Email Address' />
          <br />
          <input type="password" ref={passwd} placeholder='Password' />
          <br />
          <button type="submit">Log in</button>
        </form>
    </div>
  )
}

export default Login