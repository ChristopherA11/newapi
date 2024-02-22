import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import PostForm from './PostForm'
import { updateMobile } from '../mobiles/mobileActions'
import { useDispatch, useSelector } from 'react-redux'

const EditMobiles = ({ addMobiles, setAddMobiles}) => {
  const dispatch = useDispatch()
    const {id} = useParams()
    const mobile = useSelector((state) =>
    state.mobiles.mobiles.find((mobi) => mobi.id.toString() === id)
  );
    const navigate = useNavigate()


    useEffect(() => {
        if (mobile) {
          setAddMobiles({
            model: mobile.model,
            brand: mobile.brand,
            price: mobile.price,
            spec: mobile.spec,
          });
        }
      }, [mobile]);

      const handleEdit =  (id,updatedMobile) =>{ 
      dispatch(updateMobile(id,updatedMobile))
      navigate("/")
     }
    
  return (
    <div> 
        <PostForm addMobiles={addMobiles} setAddMobiles={setAddMobiles} handleEdit={handleEdit} mobile={mobile}/>
    </div>
  )
}

export default EditMobiles