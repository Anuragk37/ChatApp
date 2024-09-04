import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RoomActions = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [roomName, setRoomName] = useState('');

  const navigate = useNavigate();

  const handleCreateRoom = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/api/chat-room/',{name:roomName})
      setRoomName('')
      console.log(response.data);
      
    }catch(error){
      console.log(error)
    }
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    console.log('Join room');
    navigate(`/chat-room/${roomName}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'create' ? 'bg-blue-600' : 'bg-gray-700'
          }`}
        >
          Create Room
        </button>
        <button
          onClick={() => setActiveTab('join')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'join' ? 'bg-green-600' : 'bg-gray-700'
          }`}
        >
          Join Room
        </button>
      </div>
      {activeTab === 'create' ? (
        <form onSubmit={(e) => handleCreateRoom(e)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Room Name
            </label>
            <input
              type="text"
              value={roomName}
              required
              className="mt-1 p-2 w-full bg-gray-700 text-white rounded-md"
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Create Room
          </button>
        </form>
      ) : (
        <form onSubmit={(e) => handleJoinRoom(e)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Room Name
            </label>
            <input
              type="text"
              required
              className="mt-1 p-2 w-full bg-gray-700 text-white rounded-md"
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md"
          >
            Join Room
          </button>
        </form>
      )}
    </div>
  );
};

export default RoomActions;
