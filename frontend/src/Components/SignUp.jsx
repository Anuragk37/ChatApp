import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
   const [username,setUsername] = useState("")
   const [email,setEmail] = useState("")
   const [password,setPassword] = useState("")
   const [confirmPassword,setConfirmPassword] = useState("")

   const navigate = useNavigate()

  const handleSumbit = async(e) => {
    e.preventDefault()
    try{
      const formData = new FormData()
      formData.append('username',username)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('confirmPassword',confirmPassword)
      const resposne = await axios.post('http://localhost:8000/api/account/user/',formData)
      navigate('/signin')
    }catch(error){
      console.log(error)
    }
   
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <section className="w-full max-w-md p-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create an account</h1>
        <form className="space-y-6" onSubmit={(e)=>handleSumbit(e)}>
        <div>
            <input 
              type="text" 
              name="username" 
              id="username" 
              className="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500" 
              placeholder="enter your name" 
              required 
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          <div>
            <input 
              type="email" 
              name="email" 
              id="email" 
              className="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500" 
              placeholder="enter your email" 
              required 
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <input 
              type="password" 
              name="password" 
              id="password" 
              className="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500" 
              placeholder="enter your password" 
              required 
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div>
            <input 
              type="password" 
              name="confirm-password" 
              id="confirm-password" 
              className="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500" 
              placeholder="confirm your password" 
              required 
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </div>
          {confirmPassword &&(password !== confirmPassword) && <p className="text-red-500">Passwords do not match</p>}
   
          <button 
            type="submit" 
            className="w-full py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Create an account
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account? <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</a>
          </p>
        </form>
      </section>
    </div>
  )
}

export default SignUp
