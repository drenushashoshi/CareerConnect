import React from 'react'

const Header = ({toggleModal,nbofApplications}) => {

  return (
    <header className='header'>
        <div className='container'>
            <h3>Applications ({nbofApplications})</h3>
            <button onClick={()=> toggleModal(toggleModal)} className='btn'>Add Application</button>
        </div>
    </header>
  )
}

export default Header