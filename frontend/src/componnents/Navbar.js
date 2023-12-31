import './Navbar.css'
import React from 'react';
import { useState } from "react";
import {NavLink, Link} from 'react-router-dom'
import {BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill} 
from 'react-icons/bs'; //o bs é da biblioteca boodstrap


import Weather from "./Weather"
import logo from './../img/Armored5.png'

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Redux
import { logout, reset } from '../slices/authSlice';

function Navbar() {

  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () =>{

    dispatch(logout())
    dispatch(reset())

    navigate("/login")

  };
  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  }

  return (
    <nav id="nav">

    <Link to="/">
      <img className='logo' src={logo} alt='Logo do site'></img>
    </Link> 
      <div id="tempo">
       <Weather > </Weather>
      </div>
   
    <form id="search-form"  onSubmit={handleSearch}>
      <BsSearch />
      <input
        type="text"
        placeholder="Pesquisar"
        onChange={(e) => setQuery(e.target.value)}
      
      />
    </form>
    <ul id="nav-links">
      {auth ? (
        <>
          <li>
            <NavLink to="/">
              <BsHouseDoorFill />
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to={`/users/${user._id}`}>
                <span>Seus posts</span>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/profile">
              <BsFillPersonFill />
            </NavLink>
          </li>
          <li>
            <span onClick={handleLogout}>Sair</span>
          </li>
        </>
      ) : (
        <>
         
          <li>
            <NavLink to="/login">Entrar</NavLink>
          </li>
          <li>
            <NavLink to="/register">Cadastrar</NavLink>
          </li>
        </>
      )}
    </ul>
  </nav>
  );
}

export default Navbar
