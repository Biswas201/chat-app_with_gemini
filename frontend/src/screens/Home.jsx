import React, { useContext } from 'react';
import { UserContext } from '../context/user.context.jsx';

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <dir>{JSON.stringify(user)}</dir>
  )
}

export default Home
