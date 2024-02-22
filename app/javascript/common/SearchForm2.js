import React from 'react'
import PostForm from './PostForm'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchMobile } from '../mobiles/mobileActions'



const SearchForm2 = ({addMobiles, setAddMobiles}) => {
  const dispatch = useDispatch()
 const navigate = useNavigate()
  
  const handelSearch = () => {
    dispatch(searchMobile(addMobiles.model, addMobiles.brand, addMobiles.price, addMobiles.spec))
    navigate("/")
}
  return (
    <div>
        <PostForm addMobiles={addMobiles} setAddMobiles={setAddMobiles} handelSearch={handelSearch}/>
    </div>
  )
}

export default SearchForm2