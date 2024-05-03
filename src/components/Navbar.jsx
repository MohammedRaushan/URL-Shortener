import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Style.css'
import { Logout } from '@mui/icons-material'
const Navbar = (uname) => {
  let navigate=  useNavigate()
  let [name,setName]=useState(null)
  
  useEffect(()=>{
    setName(uname.uname[0])
  })
  function signout(){
    document.cookie = "email=null;path=/"
    document.cookie = "password=null;path=/"
    navigate('/account')
  }
  return (
    <div className="navbar">
      <div className="left">
        <h1>BRAND</h1>
      </div>
      <div className="right">
        {name==null?<Link to='/account'>Sign in</Link>:<button id='acc'>{name}&nbsp;&nbsp;&nbsp;&nbsp;<Logout onClick={signout}/></button> }
      </div>
    </div>
  )
}

export default Navbar