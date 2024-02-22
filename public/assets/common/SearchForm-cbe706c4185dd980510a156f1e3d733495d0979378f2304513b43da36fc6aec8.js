import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMobile } from '../mobiles/mobileActions';
import { useNavigate } from 'react-router-dom';



const SearchForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [searchMobiles, setSearchMobiles] = useState({
    model: '',
    brand: '',
    price: 0,
    spec: '',
  });

  const handleChange = (e) => {
    setSearchMobiles({ ...searchMobiles, [e.target.name]: e.target.value });

  };

  const handleSearch = () => {
  
    dispatch(searchMobile(searchMobiles.model, searchMobiles.brand, searchMobiles.price, searchMobiles.spec));
    navigate("/")
    
  };

  return (
    <div>
      <label htmlFor="model">Model:</label>
      <input
        type="text"
        id="model"
        name="model"
        placeholder="Search by model"
        value={searchMobiles.model}
        onChange={handleChange}
      />
      <label htmlFor="brand">Brand:</label>
      <input
        type="text"
        id="brand"
        name="brand"
        placeholder="Search by brand"
        value={searchMobiles.brand}
        onChange={handleChange}
      />
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        placeholder="Search by price"
        value={searchMobiles.price}
        onChange={handleChange}
      />
      <label htmlFor="spec">Spec:</label>
      <input
        type="text"
        id="spec"
        name="spec"
        placeholder="Search by spec"
        value={searchMobiles.spec}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>

    </div>
  );
};

export default SearchForm;
