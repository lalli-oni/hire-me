import { useEffect, useState } from 'react';
import { type Child } from '../../models/child';
import './ChildTable.module.css';

interface IndexedChild extends Child {
  index: number;
}

export interface ChildTableProps {
  children: Array<IndexedChild>;
  pageSize: number;
  onCheck: (childId: string, direction: 'in' | 'out') => void;
}

function ChildTable(props: ChildTableProps) {
  const {children, pageSize, onCheck} = props
  // Start index of the page
  const [startIndex, setStartIndex] = useState(0)
  const [dataView, setDataView] = useState(children.slice(0, pageSize))

  useEffect(() => {
    setStartIndex(0)
  }, [children])

  useEffect(() => {
    setDataView(children.slice(startIndex, startIndex + 5))
  }, [startIndex, children])

  return (
    <table>
      <caption>Children in The Kind Kindergarten</caption>
      <thead>
        <tr>
          <th scope="col" style={{ width: '50%' }}>Name</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {dataView.map((child) => 
          <tr key={child.childId}>
            <th scope="row">{child.name.fullName}</th>
            <td>{child.checkedIn ? "Checked in" : "Checked out"}</td>
            <td>
              {child.checkedIn ? 
                <input type="button" onClick={() => onCheck(child.childId, 'in')} value="Check in" /> :
                <input type="button" onClick={() => onCheck(child.childId, 'out')} value="Check out" />}
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <div>
          <input
            type="button"
            onClick={() => {
              const temp = startIndex - 5
              if (temp < 0) { setStartIndex(0) } else { setStartIndex(temp) }
            }}
            disabled={startIndex < 1}
            value="Prev"
          />
          <input
            type="button"
            onClick={() => {
              const temp = startIndex + 5
              if (temp > children.length) { setStartIndex(children.length - pageSize) } else { setStartIndex((startIndex + 5)) }
            }}
            disabled={(startIndex + pageSize) > children.length}
            value="Next"
          />
        </div>
        <div>
          <span>{startIndex + 1} / {dataView[dataView.length - 1].index + 1}</span>
        </div>
      </tfoot>
    </table>
  )
}

export default ChildTable