import React, { useRef } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ShrotenURL = () => {
    let uid = useParams().username
    let og_url = useRef()

    function generate(e){
        e.preventDefault()
        // alert("URL generated and stored into user id "+uid)
        let letters = "ABCDEFGHIJKLMNOPQRSRUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
        let i=1
        let word=""
        while(i<=8){
           word= word+letters.charAt(Math.floor((Math.random()*letters.length)))
           i++
        }
        word = "http://192.168.1.112:3000/"+word
        document.getElementById("opurl").innerText = word
        axios.get(`http://192.168.1.112:7373/users/${uid}`)
        .then((res)=>{
            let {id,name,passwd,urls}=res.data
            let c=0
            urls.map((x)=>{
                if(x.link==word){
                    console.log(x.link+" - "+word);
                    c++;
                }
            })
            if(c==0){
                let details = {id,name,passwd, urls}
                urls.push({title:"Google",link:word,url:og_url.current.value,clicks:0})
                axios.put(`http://192.168.1.112:7373/users/${uid}`,details)
                .then(()=>{
                    alert("Success")
                })
                .catch(()=>{
                    alert("Failure")
                })
            }
            else{
                alert("Already Exists")
            }
        })

    }
  return (
    <div className="shortenurl">
        <div className="content">
            <h1>Shorten the URL</h1>
            <div className="inputurl">
                <form onSubmit={generate}>
                <input type="text" required placeholder='Enter the URL' ref={og_url} />
                <button>Generate</button>
                </form>
            </div>
            <div className="outputurl">
                <h2 id='opurl'></h2>
                <button>Copy</button>
            </div>
        </div>
    </div>
  )
}

export default ShrotenURL