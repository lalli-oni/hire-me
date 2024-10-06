import { useEffect, useState } from 'react';

import './App.css'

import { delay } from './utils/delay';
import { getChildren, updateChildLocation } from './services/api';

import { type Child } from './models/child'

import ChildTable from "./components/ChildTable/ChildTable"

function App() {
  // TODO (LTJ): Should we bring in a data access library? Determine the need
  const [data, setData] = useState<Array<Child>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    getChildren()
      .then((response) => delay(2000).then(() => setData(response?.children)))
      .catch(() => setError(`Error fetching list of children.`))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      {isLoading ?
        <div>Loading..</div> :
        <main>
          {error?.length ? <em className="error-message">{error}</em> : null}
          <ChildTable children={data} onCheck={updateChildLocation} />
        </main>}
    </>
  )
}

export default App
