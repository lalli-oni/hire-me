import { useEffect, useState } from 'react';

import './App.css'

import { type Child } from './models/child'

import { delay } from './utils/delay';

import ChildTable from "./components/ChildTable"

// TODO (LTJ): Find a fitting home for this interface
interface Response {
  children: Array<Child>;
}

// TODO (LTJ): Find a fitting home for this
const API_URL = 'https://app.famly.co/api/daycare/tablet/group'
const GROUP_ID = '86413ecf-01a1-44da-ba73-1aeda212a196'
const INSTITUTION_ID = 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'

// TODO (LTJ): Find a fitting home for this
const getChildren = async (accessToken: string): Promise<Response> => {
  // TODO (LTJ): Encode URI components using native API
  const response = await fetch(`${API_URL}?accessToken=${accessToken}&groupId=${GROUP_ID}&institutionId=${INSTITUTION_ID}`)

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
    getChildren(import.meta.env.VITE_ACCESS_TOKEN)
      .then((response) => delay(2000).then(() => setData(response?.children)))
      .catch(() => setError(`Error fetching list of children.`))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      {isLoading ?
        <div>Loading</div> :
        <div>
          {error?.length ? <div>{error}</div> : null}
          <ChildTable children={data}/>
        </div>}
    </>
  )
}

export default App
