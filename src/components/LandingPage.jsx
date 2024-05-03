import React from 'react'
import Navbar from './Navbar'
import '../styles/Style.css'
import { Link } from 'react-router-dom'
const LandingPage = () => {
  return (
    <div className="lp">
        <div className="content">
          <div>
            <h1>The Best URL Shortener is Here</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum temporibus nihil ea dolor eligendi cumque ipsa, ab fuga quam quidem.</p>
            <div className="buttons">
              <Link to='/account'>Log in</Link>
              <Link to='/account' >Sign up</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LandingPage