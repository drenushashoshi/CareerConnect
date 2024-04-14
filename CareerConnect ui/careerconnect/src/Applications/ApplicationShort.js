import React from 'react'

const ApplicationShort = (Application) => {
  return (
    <Link to={`/Applications/${Application.ID}`} className='Application'>
        <div className='header'>
            <div className='CV'>
                <a href= {Application.Document} download>{Application.Name} CV</a>
            </div>
            <div className='details'>
                <p className='Name'>{Application.Name.substring(0,15)}</p>
                <p className='Age'>{Application.Age}</p>
            </div>
        </div>
        <div className='body'>
            <p className='bi bi-envelope'>{Application.Email.substring(0,20)}</p>
            <p className='bi bi-geo'>{Application.PhoneNr}</p>
            <p className='bi bi-telephone'>{Application.Country}</p>
        </div>

    </Link>
)
}

export default ApplicationShort