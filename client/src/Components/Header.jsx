import React, { useEffect, useState } from 'react';
import { TextInput, Button, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { VscChromeClose } from "react-icons/vsc";
import { useLocation } from 'react-router-dom';
import { FaMoon } from 'react-icons/fa';
import { SlMenu } from "react-icons/sl";

const Header = () => {

  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const path = useLocation().pathname;

  useEffect(() => {
    setMobileMenu(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMobileMenu(false);
    }, 1000)
  }, [location])

  const openMobileMenu = () => {
    setMobileMenu(true);
  } 

  const closeMobileMenu = () => {
    setMobileMenu(false);
  }

  const isActive = (currentPath) => {
    return path === currentPath ? "text-sky-500 font-bold" : "hover:text-sky-500";
  }

  return (
    <Navbar className={`flex items-center justify-between bg-white py-2 px-4 z-[2] relative ${mobileMenu ? '' : 'shadow-md'}`}>
      <Link to='/' className="text-sm sm:text-xl font-semibold dark:text-white">
        <span className='px-2 py-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 
        hover:bg-gradient-to-l
        rounded-lg text-white'>
          IdeaFusion's
        </span>
        Blog
      </Link>
      <form className='relative hidden lg:flex items-center mx-4'>
        <TextInput
          type='text'
          placeholder='Search...'
          className='pl-3'
          style={{ paddingRight: '2.5rem' }}
        />
        <AiOutlineSearch className="absolute left-48 text-gray-500 text-2xl" />
      </form>
      <Button className='lg:hidden flex items-center justify-center w-12 h-10 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg transition-shadow'>
        <AiOutlineSearch className='text-2xl' />
      </Button>
      <div className='flex items-center gap-4 md:order-2'>
        <Button className='w-12 h-10 hidden sm:flex items-center justify-center' color='gray' pill>
          <FaMoon />
        </Button>
        <Link to='/sign-in'>
          <Button className='p-1 h-10 hidden sm:flex items-center justify-center 
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-white rounded-lg
          hover:bg-gradient-to-l
          '>
            Sign in
          </Button>
        </Link>
        {
          mobileMenu ? <VscChromeClose
          onClick={closeMobileMenu}
          className='w-[30px] h-[30px] cursor-pointer p-1 lg:hidden transition-transform duration-200 ease'  
          /> : 
        <SlMenu
        onClick={openMobileMenu}
        className='w-[30px] h-[30px] cursor-pointer lg:hidden transition-transform duration-200 ease bg-sky-100'
        />
       }
      </div>

      <div className={`lg:flex gap-6 ${mobileMenu ? 'absolute top-[58px] left-0 w-full flex flex-col items-start gap-2 bg-white text-gray py-4 px-6 transition-all duration-300 ease-in-out border-2' : 'hidden'}`}>
        <Link 
          className={`${isActive('/')} hover:text-sky-500 ${mobileMenu ? 'w-full h-5 py-2' : ''}`}
          to="/"
        >Home</Link>
        <Link
          to="/about"
          className={`${isActive('/about')} hover:text-sky-500  ${mobileMenu ? 'w-full h-5 py-2' : ''}`}
        >About</Link>
        <Link
          to="/projects"
          className={`${isActive('/projects')} hover:text-sky-500 ${mobileMenu ? 'w-full h-5 py-2' : ''}`}
        >Projects</Link>
      </div>

    </Navbar>
  );
}

export default Header;