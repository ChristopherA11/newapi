import React, { useEffect, useState } from 'react'

const Comments = () => {
  
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)

 

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
      .then((res) => res.json())
      .then((data) => setComments(data.map((res) => res.name)))
      .catch((err) => {
        setError("Sometheing went wrong")
      })
  }, [])

  return (
    <div>
           <h3>Users Comments</h3>
        {error && <p>{error}</p>}
        <ul>
          {comments. map ((comm) => (
            <li key={comm}>{comm}</li>
          ))}
        </ul>

    </div>
  )
}


export default Comments