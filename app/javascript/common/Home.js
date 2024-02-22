import React from 'react';
import MobileList from './MobileList';
import { useSelector } from 'react-redux';

const Home = ({ handleDelete }) => {
  const { mobiles, filterLists, searchResult } = useSelector((state) => state.mobiles);

  return (
    <div>
      {searchResult ? (
        <MobileList mobiles={filterLists} handleDelete={handleDelete} />
      ) : (
        <div>
          <p>Mobile List:</p>
          <MobileList mobiles={mobiles} handleDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default Home;
