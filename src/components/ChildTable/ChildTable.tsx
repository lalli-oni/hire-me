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
        {props.children.map((child) => 
          <tr key={child.childId}>
            <th scope="row">{child.name.fullName}</th>
            <td>{child.checkedIn ? "Checked in" : "Checked out"}</td>
            <td>
              {child.checkedIn ? 
                <input type="button" onClick={() => props.onCheck(child.childId, 'in')} value="Check in" /> :
                <input type="button" onClick={() => props.onCheck(child.childId, 'out')} value="Check out" />}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default ChildTable