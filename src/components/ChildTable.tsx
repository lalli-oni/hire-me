import { type Child } from '../models/child';

export interface ChildTableProps {
  children: Array<Child>;
}

function ChildTable(props: ChildTableProps) {
  return (
    <table>
      <caption>Children in The Kind Kindergarten</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        {props.children.map((child) => 
          <tr>
            <th scope="row">{child.name.fullName}</th>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default ChildTable