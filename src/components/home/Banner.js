import React from 'react';
import logo from '../../images/nolan-electronics.png';

const Banner = () => {
  return (
    <div className='home'>
      <img src={logo} alt='' className='p-5' />
      <h1 className='tagline display-2'>Turn on the fun!</h1>
    </div>
  );
};

export default Banner;
