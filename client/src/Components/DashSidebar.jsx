"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
  
    const location = useLocation();
    const [tab, setTab] = useState('');
    
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if(tabFromUrl){
        setTab(tabFromUrl);
      }
    }, [location.search]);


  return (
    <Sidebar aria-label="Default sidebar example" className="w-full md:2-56 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Link to='/dashboard?tab=profile'>
                <Sidebar.Item 
                    icon={HiUser} 
                    label={"User"} 
                    labelColor="dark" 
                    labelColorValue="white" 
                    className="w-full h-[40px] pr-2 py-2 mb-2 bg-slate-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600  dark:text-white text-gray-900"
                    active={tab === 'profile'}
                >
                    Profile
                </Sidebar.Item>
            </Link>
          <Sidebar.Item 
            active 
            icon={HiArrowSmRight} 
            className="cursor-pointer w-full h-[40px] pr-2 py-2 mb-1 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white text-gray-900"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
