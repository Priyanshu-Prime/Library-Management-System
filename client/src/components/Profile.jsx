import React from 'react'
import img from '../assets/Profile.png'

const Profile = (props) => {
  return (
    <div className='flex justify-center pt-20'>
        <img src={img} className='content-center h-3/4'/>
    </div>
  )
}

export default Profile