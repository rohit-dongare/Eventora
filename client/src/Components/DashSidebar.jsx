"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const DashSidebar = () => {
    const location = useLocation();
    const [tab, setTab] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);


    //signout function
const handleSignOut = async() => {
    try {
  
      const res = await fetch('/api/user/signout', {
       method: 'POST'
      });
  
      const data = await res.json();
  
      if(!res.ok){
        console.log(data.message);
      } else{
        dispatch(signoutSuccess());
      }
  
    } catch (error) {
      console.log(error.message);
    }
  }


    return (
        <Sidebar aria-label="Default sidebar example" className="w-full md:w-56 bg-gray-50 text-gray-900">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item 
                            icon={HiUser} 
                            label={'User'}
                            className={`w-full h-10 pr-2 py-2 mb-2 hover:bg-gray-200 ${tab === 'profile' ? 'bg-gray-200' : ''}`}
                            active={tab === 'profile'}
                            as='div'
                    >
                        Profile
                    </Sidebar.Item>
                    </Link>
                    <Sidebar.Item 
                        onClick={handleSignOut}
                        icon={HiArrowSmRight} 
                        className="cursor-pointer w-full h-10 pr-2 py-2 mb-1 hover:bg-gray-200"
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

export default DashSidebar;
