import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Video, Mic, MicOff, VideoOff, PhoneOff } from 'lucide-react';
import useWebSocket from 'react-use-websocket';
import { useNavigate } from 'react-router-dom';

const ChatRoom = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const { roomName } = useParams();
  const navigate = useNavigate();

  const [isOfferCreated, setIsOfferCreated] = useState(false);

  const servers = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
  };

  const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://localhost:8000/ws/chat-room/${roomName}/`, {
    shouldReconnect: (closeEvent) => true, 
  });

  useEffect(() => {
    const initializeCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        createPeerConnection(stream);
      } catch (error) {
        console.error('Error initializing call:', error);
      }
    };

    initializeCall();

    return () => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, [roomName]);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      if (data.type === 'offer') {
        handleOffer(data.offer);
      } else if (data.type === 'answer') {
        handleAnswer(data.answer);
      } else if (data.type === 'candidate') {
        handleCandidate(data.candidate);
      }
    }
  }, [lastMessage]);

  const createPeerConnection = (stream) => {
    peerConnectionRef.current = new RTCPeerConnection(servers);

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
      }
    };

    peerConnectionRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        if (!remoteVideoRef.current.srcObject) {
          remoteVideoRef.current.srcObject = new MediaStream();
        }
        remoteVideoRef.current.srcObject.addTrack(event.track);
      }
    };

    stream.getTracks().forEach((track) => {
      peerConnectionRef.current.addTrack(track, stream);
    });

    setTimeout(() => {
      if (!isOfferCreated && peerConnectionRef.current.signalingState === 'stable') {
        createAndSendOffer();
      }
    }, 1000); 
  };

  const createAndSendOffer = async () => {
    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      sendMessage(JSON.stringify({ type: 'offer', offer }));
      setIsOfferCreated(true);
    } catch (error) {
      console.error('Error creating and sending offer:', error);
    }
  };

  const handleOffer = async (offer) => {
    try {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      sendMessage(JSON.stringify({ type: 'answer', answer }));
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleAnswer = async (answer) => {
    try {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleCandidate = async (candidate) => {
    try {
      await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('Error handling candidate:', error);
    }
  };

  const toggleAudio = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getAudioTracks().forEach((track) => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Video Chat Room: {roomName}</h1>
          <div className="flex space-x-2">
            <button onClick={toggleAudio} className="p-2 bg-gray-700 rounded-full">
              {isAudioEnabled ? <Mic /> : <MicOff />}
            </button>
            <button onClick={toggleVideo} className="p-2 bg-gray-700 rounded-full">
              {isVideoEnabled ? <Video /> : <VideoOff />}
            </button>
            <button onClick={endCall} className="p-2 bg-red-600 rounded-full">
              <PhoneOff />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video relative">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">
              You
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video relative">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">
              Remote User
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
