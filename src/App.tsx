import './App.css'

import { type Child } from './models/child'

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

  return (
    <>
    </>
  )
}

export default App
