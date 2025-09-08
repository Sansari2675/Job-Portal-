import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      {/* <div className='w-20 h-20 border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin '></div> */}
      <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-r-transparent animate-spin bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

    </div>
  )
}

export default Loading
