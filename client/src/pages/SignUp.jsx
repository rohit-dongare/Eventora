import { Label, TextInput, Button } from 'flowbite-react';
import React from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex gap-5 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
       
        {/* left side */}
        <div className='flex-1'>
        <Link to='/' className="font-bold dark:text-white text-4xl">
        <span className='px-2 py-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 
        hover:bg-gradient-to-l
        rounded-lg text-white'>
          IdeaFusion's
        </span>
        Blog
      </Link>
      <p className='text-lg mt-5'>
        This is a sample blog. You can sign up with your email and password or with google
      </p>
      </div>

        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your username' />
              <TextInput
               type='text'
               placeholder='username'
               id='username'
              />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
               type='text'
               placeholder='name@company.com'
               id='email'
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
               type='text'
               placeholder='password'
               id='password'
              />
            </div>

            <Button className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 font-bold text-white rounded-lg
          hover:bg-gradient-to-l' type='submit'>Sign Up</Button>
          </form>
          <div className='flex gap-2 text-sm mt-4'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-700 hover:text-blue-800 font-semibold'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;