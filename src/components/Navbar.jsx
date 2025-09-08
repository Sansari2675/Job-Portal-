import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();

  const navigate = useNavigate()

  //when we click on the recruiter login the that will show recruiterlogin true
  const {setShowRecruiterLogin} = useContext(AppContext) 

  return (
    <div className='shadow py-4'>
      <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between'>
        <img  onClick={()=> navigate('/')} className='cursor-pointer' src={assets.logo} alt="logo" />

        {isSignedIn ? (
          <div className='flex items-center gap-2 max-sm:text-xs'>
            <Link to="/applications">Applied Jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden'>
              Hi, {user?.firstName} {user?.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className='flex items-center gap-4 max-sm:text-xs'>
            <button onClick={e=> setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
            <button
              onClick={() => openSignIn()}
              className='bg-blue-600 text-white px-7 sm:px-9 py-2 rounded-full hover:bg-gray-400'
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
