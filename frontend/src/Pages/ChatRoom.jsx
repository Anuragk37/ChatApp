import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ChatRoom = () => {
  const [participants, setParticipants] = useState([
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
  ]);

  const { id } = useParams();

  const addParticipant = () => {
    const newId = participants.length + 1;
    setParticipants([...participants, { id: newId, name: `User ${newId}` }]);
  };

  const getGridClass = () => {
    const count = participants.length;
    if (count <= 4) return "grid-cols-2";
    if (count <= 9) return "grid-cols-3";
    return "grid-cols-4";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Video Chat Room</h1>
          <button
            onClick={addParticipant}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            Add Participant
          </button>
        </div>
        <div className={`grid ${getGridClass()} gap-4`}>
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="bg-gray-800 rounded-lg overflow-hidden aspect-video relative"
            >
              <img
                src={`/api/placeholder/${Math.floor(Math.random() * 1000)}/${Math.floor(Math.random() * 1000)}`}
                alt={`Video feed of ${participant.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                {participant.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;