import { Form, Link, useActionData, useLoaderData } from 'react-router-dom'
import { getUserChannels } from './Channels.http'
import { queryClient } from '../../query'

import { api } from '../../../utils'
import { getSelf } from '../../shared/http'

export const loader = async () => {
  const selfRes = await getSelf()
  if (api.isError(selfRes)) {
    return await api.handleError(selfRes)
  }
  const self = await selfRes.json()

  const channelsRes = await getUserChannels()
  if (api.isError(channelsRes)) {
    return await api.handleError(channelsRes)
  }
  const channels = await channelsRes.json()
  return { self, channels }
}

export function Channels() {
  const data = useLoaderData()

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-100'>
      <div className='bg-white rounded-lg p-12 space-y-5 w-[400px]'>Render channels lists</div>
      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  )
}
