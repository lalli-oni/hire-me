import { useEffect, useState } from 'react';
import { type Child } from '../../models/child';
import './ChildTable.module.css';

// NOTE (LTJ): As this is only applicable to this components implementation
//  it is IMO correct owner of the type. Could also be written as Indexable<Child> for reusability
interface IndexedChild extends Child {
  index: number;
}

export interface ChildTableProps {
  children: Array<IndexedChild>;
  pageSize: number;
  onUpdate: (childId: string, direction: 'in' | 'out') => void;
}

function ChildTable(props: ChildTableProps) {
  const { children, pageSize, onUpdate } = props
  // Start index of the page
  const [startIndex, setStartIndex] = useState(0)
  // NOTE (LTJ): Uncertain of the naming here, might call it virtualisedView
  //  Missing a sparring partner on this, would highlight it in review
  const [dataView, setDataView] = useState(children.slice(0, pageSize))

  useEffect(() => {
    // Reset start index when incoming data changes
    setStartIndex(0)
  }, [children])

  useEffect(() => {
    // Create a virtualised paginated view
    setDataView(children.slice(startIndex, startIndex + pageSize))
  }, [startIndex, children, pageSize])

  return (
    <table>
      {/* NOTE (LTJ): Hidden element, left in the DOM for accessibility */}
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
            {/* scope="row" helps accessibility determine a sort of "id" of the row */}
            <th scope="row">{child.name.fullName}</th>
            <td>{child.checkedIn ? "Checked in" : "Checked out"}</td>
            <td>
              {child.checkedIn ?
                // IMPROVEMENT (LTJ): We have no loading state right now
                //  I'd let this component handle the mutation instead of emiting it to parent
                //  Might still have to emit an even on data updated or on error, but KISS
                <input type="button" onClick={() => onUpdate(child.childId, 'out')} value="Check out" /> :
                <input type="button" onClick={() => onUpdate(child.childId, 'in')} value="Check in" />}
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