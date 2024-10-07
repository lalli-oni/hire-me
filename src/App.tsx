import { useEffect, useState } from 'react';

import './App.css'

import { delay } from './utils/delay';
import { getChildren, updateChildLocation } from './services/api';

import { type Child } from './models/child'

import ChildTable from "./components/ChildTable/ChildTable"

function App() {
  // NOTE (LTJ): I would be bringing in a query library (akin to RTK query, tanstack query, msw, graphQL)
  //  Decided to keep it "vanilla" to better illustrate my understanding of the fundementals
  // IMPROVEMENT (LTJ): Extract the query into a reusable hook
  // IMPROVEMENT (LTJ): Caching, I would implement it as a simple tag system. Which `updateChildLocation` would invalidate
  const [data, setData] = useState<Array<Child>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // IMPROVEMENT (LTJ): Right now error loading the table and updating child location is treated the same
  //  But one is a collection, and the other is an item in a collection, so a error code and target would help a lot
  const [error, setError] = useState<null | string>(null)

  // IMPROVEMENT (LTJ): Introducing mount hooks for data fetching is shoddy
  //  It's not reusable, and we might need to use the mounting hook for more things
  //  This would be solved by making the query a hook
  useEffect(() => {
    getChildren()
      // NOTE (LTJ): Minor mocked delay to make loading state visible
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
          <ChildTable
            // NOTE (LTJ): This is a common pattern I do, I have no qualms over extending the data from the API
            //  the trick is to do it in a structured evident way, here it is relatively hidden inline
            //  and this <App /> component has no understanding of why childrens would need indexing
            children={data.map((child, i) => ({ ...child, index: i}))}
            onUpdate={async (childId, direction) => {
              setIsLoading(true)
              await updateChildLocation(childId, direction)
              // IMPROVEMENT (LTJ): Duplicate code of what is in the mounting hook
              //  Should be solved by making the query a hook that returns a `refetch()` method that can be triggered
              //  or by using a cache invalidation system
              getChildren()
                .then((response) => delay(2000).then(() => setData(response?.children)))
                .catch(() => setError(`Error fetching list of children.`))
                .finally(() => setIsLoading(false))
            }}
            pageSize={5}
          />
        </main>}
    </>
  )
}

export default App
