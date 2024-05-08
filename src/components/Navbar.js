  import React from 'react'
  import { MdFavoriteBorder } from 'react-icons/md'
  import { Link } from 'react-router-dom'

  export default function Navbar() {
    
    return (
      <>
        <nav className="navbar navbar-light  sticky-top">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        <h2>Y Store</h2>
      </Link>
      <Link className="navbar-brand" to="/favorite"> <b>Favorite</b> <MdFavoriteBorder color='red' /></Link>
    </div>
  </nav>
      </>   
    )
  }
