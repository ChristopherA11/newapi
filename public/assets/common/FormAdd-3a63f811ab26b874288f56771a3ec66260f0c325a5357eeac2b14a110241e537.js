import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addMobile, searchMobile, updateMobile } from '../mobiles/mobileActions'

const FormAdd = (OriginalComponent) => {
  function NewComponent() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [addMobiles, setAddMobiles] = useState({
      model: "",
      brand: "",
      price: 0,
      spec: ""
    })
    const handelChangeModel = (e) => {
      setAddMobiles({ ...addMobiles, model: e.target.value })

    }

    const handelChangeBrand = (e) => {
      setAddMobiles({ ...addMobiles, brand: e.target.value })
    }

    const handelChangePrice = (e) => {
      setAddMobiles({ ...addMobiles, price: e.target.value })
    }

    const handelChangeSpec = (e) => {
      setAddMobiles({ ...addMobiles, spec: e.target.value })
    }
    // const handleEdit =  (id,updatedMobile) =>{ 
    //   dispatch(updateMobile(id,updatedMobile))
    //   navigate("/")
    //  }
     const handleSubmit = (newMobile) => {
      dispatch(addMobile(newMobile));
      navigate('/');
    };
  //   const handelSearch = () => {
  //     dispatch(searchMobile(addMobiles.model, addMobiles.brand, addMobiles.price, addMobiles.spec))
  //     navigate("/")
  // }
  
    return (
      <OriginalComponent
        addMobiles={addMobiles}
        setAddMobiles={setAddMobiles}
        handelChangeModel={handelChangeModel}
        handelChangeBrand={handelChangeBrand}
        handelChangePrice={handelChangePrice}
        handelChangeSpec={handelChangeSpec}
        // handleEdit={handleEdit}
        handleSubmit={handleSubmit}
        // handelSearch={handelSearch}
      />
    )
  }
  return NewComponent
}

export default FormAdd;
