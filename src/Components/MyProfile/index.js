import React, { useEffect, useState } from "react";
import { GET_USER_DATA } from "../../api/api";

export default function MyProfile() {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))
    // useEffect(()=>{
    //     GET_USER_DATA().then((res)=>{
    //         console.log(res);
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    // },[]);
    // console.log(userData);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-xl font-semibold mb-4">My Profile</h2>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                    <img
                        src="/assets/images/vector.png"
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <h3 className="text-lg font-semibold">{userData.first_name} {userData.last_name}</h3>
                        <p className="text-sm text-gray-400">{userData.city}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mt-6">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">First Name</p>
                        <p className="font-semibold">{userData.first_name}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Last Name</p>
                        <p className="font-semibold">{userData.last_name}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Email Address</p>
                        <p className="font-semibold">{userData.email}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Phone</p>
                        <p className="font-semibold">{userData.phone_number}</p>
                    </div>

                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mt-6">
                <h3 className="text-lg font-semibold mb-4">Address</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Country</p>
                        <p className="font-semibold">India</p>
                    </div>
                    <div>
                        <p className="text-gray-500">City / State</p>
                        <p className="font-semibold">{userData.city}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Street / Landmark</p>
                        <p className="font-semibold">{userData.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
