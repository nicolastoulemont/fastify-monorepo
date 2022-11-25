import { Link } from 'react-router-dom'

export function Root() {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white w-[400px] h-[300px] rounded-lg p-12 space-y-5'>
        <h1 className='text-3xl font-medium text-center'>Welcome to the demo chat app</h1>
        <div className='flex items-center justify-around py-6'>
          <Link to='/sign-in' className='px-4 py-2 bg-blue-500 rounded-lg text-white font-medium'>
            Sign In
          </Link>
          <Link to='/sign-up' className='px-4 py-2 bg-blue-500 rounded-lg text-white font-medium'>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
