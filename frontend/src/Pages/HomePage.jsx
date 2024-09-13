import React from 'react';
import { useSelector } from 'react-redux';
import RoomActions from '../Components/RoomActions';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isUserAuthenticated);
  const navigate = useNavigate()

  const handleSignIn = () => {
    console.log('Sign in');
    navigate('/signin')
  };

  const handleSignUp = () => {
    console.log('/signup');
    navigate('/signup')
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg">
        {isAuthenticated ? (
          <>
            <h1 className="text-3xl font-bold text-center">Welcome, User!</h1>
            <RoomActions/>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center">Welcome to Video Chat</h1>
            <p className="mt-2 text-center text-gray-400">Sign in to start or join a video call</p>
            <div className="mt-8 space-y-4">
              <button
                onClick={handleSignIn}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center justify-center"
              >
                Sign In
              </button>
              <button
                onClick={handleSignUp}
                className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md flex items-center justify-center"
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
