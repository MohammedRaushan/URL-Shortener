import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const RedirectPage = () => {
    let [data, setData] = useState([])
    let uid = useParams().uid
    let [time,setTime]=useState(0)
    useEffect(() => {
        axios.get(`http://192.168.1.112:7373/users`)
            .then((res) => {
                setData(res.data)
                data.map((x) => {
                    let {id,name,passwd,urls}=x
                    for (let i of urls) {
                        if (i.link == ("http://192.168.1.112:3000/" + uid)) {
                            i.clicks+=1;
                            let details = {id,name,passwd,urls}
                            console.log(details);
                            axios.put(`http://192.168.1.112:7373/users/${id}`,details)
                            .then((res)=>{
                                alert("Updated")
                            })
                            .catch(()=>{
                                alert("Error")
                            })
                            setTimeout(()=>{
                                window.location.replace(i.url)
                            },5000)
                        }
                    }
                })
                setTime(1)
            })
            .catch(() => {
                
            })
            
    },[time])
    return (
        <div className="redirectpage">

        </div>
    )
}

export default RedirectPage