import React from 'react'

const Ping = () => {
  return (
    <div className="relative">
        <div className='w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-ping absolute'></div>
        <div className='w-2 h-2 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full relative'></div>
    </div>
  )
}

export default Ping