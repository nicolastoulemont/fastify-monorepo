import { Form, Link, redirect, useActionData } from 'react-router-dom'
import type { ActionFunctionArgs } from 'react-router-dom'
import { signIn } from './SignIn.http'
import { queryClient } from '../../query'

import type { Account } from 'database'
import { api } from '../../../utils'

export type IAccountByIdBody = Omit<Account, 'id'>

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const result = await signIn(formData)
  if (api.isError(result)) {
    return await api.handleError(result)
  }

  const account = (await result.json()) as Account
  await queryClient.invalidateQueries(['account', account.id])
  return redirect('/channels')
}

export function SignIn() {
  const error = useActionData() as API_ERROR
  return (
    <div className='w-full h-screen flex items-center justify-center bg-gray-100'>
      <Form method='post' id='signin-form' className='bg-white rounded-lg p-12 space-y-5 w-[400px]'>
        <h1 className='text-3xl font-medium text-center'>Sign In</h1>
        <div className='flex flex-col'>
          <label htmlFor='email'>Email</label>
          <input
            placeholder='Email'
            className='rounded-lg border-gray-300'
            required
            type='email'
            name='email'
            id='email'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password'>Password</label>
          <input
            placeholder='Password'
            className='rounded-lg border-gray-300'
            required
            type='password'
            name='password'
            id='password'
          />
        </div>
        {error && error.message && (
          <div className='px-3 py-2 flex flex-col bg-red-50 rounded-lg'>
            <h2 className='font-medium text-sm'>{error.error}</h2>
            <p className='text-xs'>{error.message}</p>
          </div>
        )}
        <div className='w-full flex justify-between items-end'>
          <div className='flex flex-col space-y-2'>
            <p className='text-sm'> Don't have an account ?</p>
            <Link to='/signup' className='underline underline-offset-1 font-medium'>
              Sign Up
            </Link>
          </div>

          <button type='submit' className='px-4 py-2 h-fit bg-blue-500 rounded-lg text-white font-medium'>
            Sign in
          </button>
        </div>
      </Form>
    </div>
  )
}
