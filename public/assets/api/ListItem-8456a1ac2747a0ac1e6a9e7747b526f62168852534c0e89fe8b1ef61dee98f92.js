import axios from 'axios'
import React, { useEffect, useState } from 'react'



const ListItem = () => {
  const [list, setList] = useState([])
  const [post, setPost] = useState([])
  const [error, setError] = useState(null)
  const [newPost, setNewPost] = useState('');
  const [editIndex, setEditIndex] = useState(null);


  const fetchUser = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      setList(response.data.map(res => res.name))
    }
    catch (err) {
      setError("something went wrong")
    }
  }
  useEffect(() => {
    fetchPost()
    fetchUser()
  }, [])

  const fetchPost = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      setPost(response.data.map(res => res.name))
    }
    catch (err) {
      setError("something went wrong")
    }
  }
  const deletePost = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

      const newPost = post.filter((_, index) => index !== id);
      setPost(newPost);
    } catch (err) {
      setError("something went wrong while deleting");
    }
  };

  const createPost = async () => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        name: newPost
      });
      setPost([...post, response.data.name]);
      setNewPost('');
    } catch (err) {
      setError("Something went wrong  post");
    }
  };

  const editPost = (index) => {
    setEditIndex(index);
    setNewPost(post[index]);
  };

  const updatePost = async (index, updateName) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${index + 1}`, {
        name: updateName,
      });
      const updatedPosts = post.map((p, i) => (i === index ? response.data.name : p));
      setPost(updatedPosts);
      setEditIndex(null);
      setNewPost('');
    } catch (err) {
      setError("something went wrong updating post");
    }
  };

  return (
    <div>
      <header>
        <h3>ListItem</h3>
        {error && <p>{error}</p>}
        {list.map((listItem, index) => (
          <ul key={index}>
            <li>{listItem}</li>
            <button>edit</button>
          </ul>
        ))}
      </header>

      {/* Newadd postList */}
      <div>
        <h3>ListItems</h3>
        {error && <p>{error}</p>}
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Enter the name"
        />
        <button onClick={createPost}>Post</button>
        {/* edit postList  */}
        {post.map((p, index) => (
          <ul key={"p" + index}>
            <li>{p}</li>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <button onClick={() => updatePost(index, newPost)}>Save</button>
              </>
            ) : (
              <>
                <button data-testid={"put" + index} onClick={() => editPost(index)}>Edit</button>
                {/* delete postList */}
                <button data-testid={"delete" + index} onClick={() => deletePost(index)}>Remove</button>
              </>
            )}
          </ul>
        ))}
      </div>
    </div>
  )
}
export default ListItem;

