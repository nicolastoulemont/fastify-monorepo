import { Form, ActionFunctionArgs, redirect, Link } from 'react-router-dom'
import { signUp } from './SignUp.http'
import { queryClient } from '../../query'
import type { Account } from 'database'

type IAccountByIdBody = Omit<Account, 'id'>

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const credentials = Object.fromEntries(formData) as IAccountByIdBody & { role: string }
  await signUp(credentials)
  await queryClient.invalidateQueries(['account'])
  return redirect('/signin')
}

export function SignUp() {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-gray-100'>
      <Form method='post' id='signup-form' className='bg-white rounded-lg p-12 space-y-5 w-[400px]'>
        <h1 className='text-3xl font-medium text-center'>Sign up</h1>
        <div className='flex flex-col'>
          <label htmlFor='email'>Email</label>
          <input placeholder='Email' className='rounded-lg border-gray-300' type='text' name='email' id='email' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password'>Password</label>
          <input
            placeholder='Password'
            className='rounded-lg border-gray-300'
            type='password'
            name='password'
            id='password'
          />
        </div>
        <div className='w-full flex justify-between items-end'>
          <div className='flex flex-col space-y-2'>
            <p className='text-sm'> Already have an account ?</p>
            <Link to='/sign-in' className='underline underline-offset-1 font-medium'>
              Sign In
            </Link>
          </div>

          <button type='submit' className='px-4 py-2 h-fit bg-blue-500 rounded-lg text-white font-medium'>
            Sign up
          </button>
        </div>
      </Form>
    </div>
  )
}
