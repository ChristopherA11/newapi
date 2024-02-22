import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
         <nav>
        <span> <Link to={"/"}>Home</Link></span>
        <span> <Link to={"/post"}>Post</Link></span>
        <span> <Link to={'/search'}>Search</Link> </span>
      </nav>
    </div>
  )
}

export default NavBar