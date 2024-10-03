import { type Child } from '../models/child';

export interface ChildTableProps {
  children: Array<Child>;
  onCheck: (childId: string, direction: 'in' | 'out') => void;
}

function ChildTable(props: ChildTableProps) {
  return (
    <table>
      <caption>Children in The Kind Kindergarten</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {props.children.map((child) => 
          <tr key={child.childId}>
            <th scope="row">{child.name.fullName}</th>
            <th>{child.checkedIn ? "Checked in" : "Checked out"}</th>
            <th>
              {child.checkedIn ? 
                <input type="button" onClick={() => props.onCheck(child.childId, 'in')} value="Check in" /> :
                <input type="button" onClick={() => props.onCheck(child.childId, 'out')} value="Check out" />}
            </th>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default ChildTable