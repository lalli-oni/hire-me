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
    // Create a virtualised paginated view
    setDataView(children.slice(startIndex, startIndex + pageSize))
  }, [startIndex, children, pageSize])

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
      {/* IMPROVEMENT (LTJ): Having controls in a footer of a table is annoying as the footer jumps up */}
      <tfoot>
        <tr>
          <td>
            <input
              type="button"
              onClick={() => {
                const newIndex = startIndex - 5
                if (newIndex < 0) { setStartIndex(0) } else { setStartIndex(newIndex) }
              }}
              disabled={startIndex < 1}
              value="Prev"
            />
            <input
              type="button"
              onClick={() => {
                const newIndex = startIndex + 5
                if (newIndex > children.length) { setStartIndex(children.length - pageSize) } else { setStartIndex((newIndex)) }
              }}
              disabled={(startIndex + pageSize) > children.length}
              value="Next"
            />
          </td>
          <td colSpan={2}>
            {/* Shows the current page start/end indexes */}
            <span>{startIndex + 1} / {dataView[dataView.length - 1].index + 1}</span>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default ChildTable