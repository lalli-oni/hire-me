import { useEffect, useState } from 'react';

import './App.css'

import { type Child } from './models/child'

import { delay } from './utils/delay';

import ChildTable from "./components/ChildTable"

// TODO (LTJ): Find a fitting home for this interface
interface Response {
  children: Array<Child>;
}

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN
// TODO (LTJ): Find a fitting home for this
const API_HOST = 'https://app.famly.co/api/'
const GROUP_ID = '86413ecf-01a1-44da-ba73-1aeda212a196'
const INSTITUTION_ID = 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'

// TODO (LTJ): Find a fitting home for this
const getChildren = async (accessToken: string): Promise<Response> => {
  // TODO (LTJ): Encode URI components using native API
  const response = await fetch(`${API_HOST}daycare/tablet/group?accessToken=${accessToken}&groupId=${GROUP_ID}&institutionId=${INSTITUTION_ID}`)

  if (!response.ok) {
    throw new Error(`Error fetching child list. ${response.status}`)
  }

  const responseJson = await response.json()
  return responseJson
}

function App() {
  // TODO (LTJ): Should we bring in a data access library? Determine the need
  const [data, setData] = useState<Array<Child>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    getChildren(ACCESS_TOKEN)
      .then((response) => delay(2000).then(() => setData(response?.children)))
      .catch(() => setError(`Error fetching list of children.`))
      .finally(() => setIsLoading(false))
  }, [])

  const updateChildLocation = async (childId: string, direction: 'in' | 'out') => {
    const currentTime = new Date()
    const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`
    // TODO (LTJ): Encode URI components using native API
    const response = await fetch(`${API_HOST}v2/children/${childId}/${direction === 'in' ? 'checkins' : 'checkout'}`, {
      method: 'POST',
      body: JSON.stringify({
        accessToken: import.meta.env.VITE_ACCESS_TOKEN,
        pickupTime: direction === 'in' ? formattedTime : undefined
      })
    })
    if (!response.ok) setError(`Error checking ${direction} child`)
  }

  return (
    <>
      {isLoading ?
        <div>Loading</div> :
        <div>
          {error?.length ? <div>{error}</div> : null}
          <ChildTable children={data} onCheck={updateChildLocation} />
        </div>}
    </>
  )
}

export default App
