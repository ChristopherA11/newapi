import React, { useEffect, useState } from 'react'
import api from './api'
import _ from 'lodash'

const MobileApi = () => {
  const [mobiles, setMobiles] = useState([])
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")

  const fetchItem = async () => {
    try {
      const response = await api.get("/mobiles")
      setMobiles(response.data)
    }
    catch (err) {
      setError("something went wrong")
    }
  }
  useEffect(() => {
    fetchItem()
  }, [])

  useEffect(() => {
    fetch ("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => setUsers(data.map((user) => user.name)))
    .catch((err) => setError("something went wrong"))
  })


  return (
    <div>
      {error && <div>{error}</div>}
      <h3>mobiles list:</h3>
      {(_.isEmpty) ? (
        <table>
          <thead>
            <tr>
              <th>Model:</th>
              <th>Brand:</th>
              <th>Price:</th>
              <th>Spec:</th>
            </tr>
          </thead>
          <tbody>
            {_.map(mobiles, (item) => (
              <tr key={item.id}>
                <td>{item.model}</td>
                <td>{item.brand}</td>
                <td>{item.price}</td>
                <td>{item.spec}</td>
              </tr>
            ))}

          </tbody>
        </table>)
        : (<p>List is empty</p>
        )}

        <h3>users</h3>
        {error && <p>{error}</p>}
        <ul>
          {users.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
    </div>
  )
}

export default MobileApi