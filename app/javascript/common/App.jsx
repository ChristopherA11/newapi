import React, { useEffect, useState } from 'react'
import Post from './Post'
import { Route, Routes } from 'react-router'
import EditMobiles from './EditMobiles'
import Home from './Home'
// import api from './api'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMobile, fetchMobiles } from '../mobiles/mobileActions'
// import SearchForm from './SearchForm'
import SearchForm2 from './SearchForm2'
import NavBar from './NavBar'
    
const App = () => {
  const { mobiles } = useSelector((state) => state.mobiles)
  const dispatch = useDispatch()

  const [addMobiles, setAddMobiles] = useState({
    model: "",
    brand: "",
    price: 0,
    spec: ""
  })

  useEffect(() => {
    dispatch(fetchMobiles())
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deleteMobile(id))
  }


  return (
    <div>
       <NavBar />
      <Routes>
        <Route path="/" element={<Home mobiles={mobiles} handleDelete={handleDelete} />} />
        <Route path="/post" element={<Post addMobiles={addMobiles} setAddMobiles={setAddMobiles} />} />
        <Route path="/edit/:id" element={<EditMobiles
          addMobiles={addMobiles} setAddMobiles={setAddMobiles} mobiles={mobiles} />} />
        {/* <Route path="/search" element={  <SearchForm />}/> */}
        <Route path='/search' element={<SearchForm2 addMobiles={addMobiles} setAddMobiles={setAddMobiles} />} />
      </Routes>
    
    </div>
  )
}

export default App;
