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
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <Sidebar aria-label="Default sidebar example" className="w-full md:w-56 bg-gray-50 text-gray-900">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item 
                            icon={HiUser} 
                            className={`w-full h-10 pr-2 py-2 mb-2 hover:bg-gray-200 ${tab === 'profile' ? 'bg-gray-200' : ''}`}
                            active={tab === 'profile'}
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item 
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
