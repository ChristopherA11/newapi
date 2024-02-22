import React from 'react'


const PostForm = ({handleSubmit, mobile,addMobiles, setAddMobiles, handleEdit, handelSearch}) => {
 
 
    const handelChangeModel = (e) => {
        setAddMobiles({...addMobiles,model:e.target.value})

      }
    
      const handelChangeBrand = (e) => {
        setAddMobiles({...addMobiles,brand:e.target.value})
      }
    
      const handelChangePrice = (e) => {
        setAddMobiles({...addMobiles,price:e.target.value})
      }
    
      const handelChangeSpec = (e) =>{
         setAddMobiles({...addMobiles,spec:e.target.value})
      }
     
  return (
    <div>
  
         {/* <form onSubmit={(e) => e.preventDefault()}> */}
         
        <label htmlFor="model">Model</label>
        <input
          type="text"
          id="model"
          placeholder='mobile Model'
          required
          value={addMobiles.model}
          onChange={handelChangeModel}
        />
         <label htmlFor="brand">Brand</label>
        <input
          type="text"
          id="brand"
          placeholder='mobile brand'
          required
          value={addMobiles.brand}
          onChange={handelChangeBrand}
        />
         <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          placeholder='mobile Price'
          required
          value={addMobiles.price}
          onChange={handelChangePrice}
        />
         <label htmlFor="spec">Spec</label>
        <input
          type="text"
          id="spec"
          placeholder='mobile Spec'
          required
          value={addMobiles.spec}
          onChange={handelChangeSpec}
        />
        {handleSubmit ? <button type='submit' onClick={() => handleSubmit(addMobiles)}>submit</button> : handleEdit ?
        <button onClick={() => handleEdit(mobile.id,addMobiles)}>submit</button> :  <button onClick={handelSearch}>Search</button>} 
      {/* </form> */}
      
     
    </div>
  )
}

export default PostForm;
