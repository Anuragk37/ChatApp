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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/chat-room/:id",
    element: <ChatRoom />
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
