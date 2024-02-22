import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';
import { addMobile } from '../mobiles/mobileActions';

const Post = ({setAddMobiles, addMobiles}) => {
 const dispatch = useDispatch()
 const navigate = useNavigate()

 const handleSubmit = (newMobile) => {
  dispatch(addMobile(newMobile))
  navigate("/")
 }

  return (
    <div>
      <PostForm handleSubmit={handleSubmit} setAddMobiles={setAddMobiles} addMobiles={addMobiles} />
    </div>
  );
};

export default Post;
