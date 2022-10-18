import Link from "next/link";
import React from "react"

export default function DashboardLinks() {
    return (
        <div className="card text-xl py-5 px-3">
            <ul className="flex flex-col mt-3 text-center align-middle items-center">
                <li className="py-2 text-blue-800">
                    <i className="ri-admin-fill"></i>
                </li>
                <li className="card px-2 py-2 cursor-pointer hover:bg-blue-700 text-blue-700 hover:text-white">
                    <Link href="/admin/dashboard">
                        <span><i className="ri-dashboard-line"></i></span>
                    </Link>
                </li>
                <li className="card px-2 py-2 cursor-pointer hover:bg-blue-700 text-blue-700 hover:text-white">
                    <Link href="/admin/orders">
                        <span><i className="ri-file-list-3-line"></i></span>
                    </Link>
                </li>
                <li className="card px-2 py-2 cursor-pointer hover:bg-blue-700 text-blue-700 hover:text-white">
                    <Link href="/admin/products">
                        <span><i className="ri-list-unordered"></i></span>
                    </Link>
                </li>
                <li className="card px-2 py-2 cursor-pointer hover:bg-blue-700 text-blue-700 hover:text-white">
                    <Link href="/admin/users">
                        <span><i className="ri-user-settings-line"></i></span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
