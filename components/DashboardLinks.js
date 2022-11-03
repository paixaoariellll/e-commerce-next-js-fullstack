import Link from "next/link";
import React from "react";
import { FaUsers } from 'react-icons/fa'
import { FaClipboardList } from 'react-icons/fa'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdDashboardCustomize } from 'react-icons/md'

export default function DashboardLinks() {
    return (
        <div className="card text-xl py-5 px-3">
            <ul className="flex flex-col mt-3 text-center align-middle items-center">
                <li className="py-0 text-2xl text-blue-800">
                    <i className="ri-admin-fill"></i>
                </li>
                <hr className="mt-1 mb-4 w-full flex flex-1 border-t border border-t-blue-700 "></hr>
                <Link href="/admin/dashboard">
                    <li className="card px-2 py-2 cursor-pointer !rounded-sm hover:bg-blue-700 text-blue-700 hover:text-white">
                        <span className="">
                            <MdDashboardCustomize />
                        </span>
                    </li>
                </Link>
                <Link href="/admin/orders">
                    <li className="card px-2 py-2 cursor-pointer !rounded-sm hover:bg-blue-700 text-blue-700 hover:text-white">
                        <span className=" ">
                            <FaClipboardList />
                        </span>
                    </li>
                </Link>
                <Link href="/admin/products">
                    <li className="card px-2 py-2 cursor-pointer !rounded-sm hover:bg-blue-700 text-blue-700 hover:text-white">
                        <span className="">
                            <BsFillBagCheckFill />
                        </span>
                    </li>
                </Link>
                <Link href="/admin/users">
                    <li className="card px-2 py-2 cursor-pointer !rounded-sm hover:bg-blue-700 text-blue-700 hover:text-white">
                        <span className=" ">
                            <FaUsers />
                        </span>
                    </li>
                </Link>
            </ul>
        </div>
    );
}
