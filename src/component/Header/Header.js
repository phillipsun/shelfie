import React from 'react';
import Logo from './../../images/shelfie_logo.png';
import './../../styles/header.css'

export default function Header() {
  return (
    <header className='header'>
      <img alt='header logo' className='header__logo' src={Logo}/>
      <h1 className='header__app-name'>Shelfie</h1>
    </header>
  )
}