import React from 'react'

const Cont = ({name}) => {
  return (
    <div>
        <div>welcome {name}</div>
        <h1>hello</h1>
        <h1>world</h1>
        <h2>hello world</h2>
        <label htmlFor="name">Name</label>
        <input type="text" placeholder='name' id="name"  value="hello" onChange={() => set()}/>
        <label htmlFor="Product name">Name</label>
        <img src="gogle.jpg" alt="google image" />
      
    </div>
  )
}

export default Cont;
