import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'


const MobileList = ({ mobiles, handleDelete }) => {
  // const dispatch = useDispatch()

  

  return (
    <div>
      {/* isEmpty  use in lodash */}
      {!_.isEmpty(mobiles) ? (
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Brand</th>
              <th>Price</th>
              <th>spec</th>
            </tr>
          </thead>
          <tbody>
            {/* map function use to ladash method */}
            {_.map(mobiles, (item) => (
              <tr key={item.id}>
                <td>{item.model}</td>
                <td>{item.brand}</td>
                <td>{item.price}</td>
                <td>{item.spec}</td>
                <td>
                  <span> <button onClick={() => handleDelete(item.id)}>Delete</button></span>
                  <span> <Link to={`edit/${item.id}`}><button>Edit
                  </button></Link></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>) : (
        <p>List is Empty</p>
      )}
    </div>
  )
}


export default MobileList