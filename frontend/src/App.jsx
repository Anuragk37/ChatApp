import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import HomePage from './Pages/HomePage';
import {Provider} from 'react-redux'
import {store,persistor} from './app/store'
import { PersistGate } from 'redux-persist/integration/react'
import ChatRoom from './Pages/ChatRoom';
import ReverseRoute from './utils/ReverseRoute';
import ProtecredRoute from './utils/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <ReverseRoute><SignUp /></ReverseRoute>,
  },
  {
    path: "/signin",
    element: <ReverseRoute><SignIn /></ReverseRoute>,
  },
  {
    path: "/chat-room/:roomName",
    element: <ProtecredRoute><ChatRoom /></ProtecredRoute>,
  },
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
    </Provider>
    </>
  )
}

export default App
