import React from 'react'
import { Outlet } from 'react-router-dom'

function ClientOnboarding() {
  return (
    <div className='px-16 py-16 '>
      <Outlet/>
    </div>
  )
}

export default ClientOnboarding