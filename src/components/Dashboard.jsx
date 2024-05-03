import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/Style.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Dashboard = () => {
  let uid = useParams().username
  let [data, setData] = useState([])
  let [name, setName]=useState("")
  let [passwd,setPasswd]=useState("")

  function deleteLink(link){
    axios.get(`http://192.168.1.112:7373/users/${uid}`)
    .then((res)=>{
      data = res.data
      for(let i=0;i<data.urls.length;i++){
        if(data.urls[i].link==link){
          data.urls.splice(i,1)
          axios.put(`http://192.168.1.112:7373/users/${uid}`,data)
          alert("Found It")
        }
      }
      
    })
    .catch(()=>{
      alert("Error")
    })
    
  }
  useEffect(()=>{
    axios.get(`http://192.168.1.112:7373/users/${uid}`)
      .then((res) => {
        setData(res.data.urls)
        // console.log(res.data.urls);
        setName(res.data.name)
        setPasswd(res.data.passwd)
      })
      .catch((err) => {
        console.log(err)
      })
  })
  let cookies = document.cookie.split("; ")
  if((cookies[0]=="email="+name) && (cookies[1]=="password="+passwd)){
    return (
      <div className="dashboard">
        <Navbar uname={[name,uid]}/>
        <div className="content">
          <div className="link-details">
            <h1>Link Analytics Details</h1>
            <table>
              <tr>
                <th>Name</th>
                <th>Original URL</th>
                <th>Shorten URL</th>
                <th>Clicks</th>
              </tr>
            {data.map((x) => {
              return <tr className='url-details'>
                <td><h3>{x.title}</h3></td>
                <td><h3>{x.url}</h3></td>
                <td><a href={x.link}><h3>{x.link}</h3></a></td>
                <td className='short'><h3>{x.clicks}</h3></td>
                <td className='short'><DeleteForeverIcon onClick={()=>{deleteLink(x.link)}} id='btn-del'/></td>
              </tr>
            })}
            </table>
          </div>
          <Link id='addUrl' to={`/shortenurl/${uid}`}>+</Link>
        </div>
      </div>
    )
  }
  else{
    return (
      <div className="no-login">
        <h1>Login to acces Your Account</h1>
      </div>
    )
  }
}

export default Dashboard