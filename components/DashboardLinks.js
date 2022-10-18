import Link from "next/link";
import React from "react"

export default function DashboardLinks() {
    return (
        <div className="card !bg-blue-900 text-xl py-5 px-3">
            <ul className="text-center align-middle items-center">
                <li className="card p-2 hover:bg-blue-100 cursor-pointer">
                    <i className="ri-admin-fill text-blue-700"></i>
                </li>
                <li className="card p-2 hover:bg-blue-100 cursor-pointer">
                    <Link href="/admin/dashboard">
                        <span><i className="ri-dashboard-line text-blue-700"></i></span>
                    </Link>
                </li>
                <li className="card p-2 hover:bg-blue-100 cursor-pointer">
                    <Link href="/admin/orders">
                        <span><i className="ri-file-list-3-line text-blue-700"></i></span>
                    </Link>
                </li>
                <li className="card p-2 hover:bg-blue-100 cursor-pointer">
                    <Link href="/admin/products">
                        <span> <i className="ri-list-unordered text-blue-700"></i></span>
                    </Link>
                </li>
                <li className="card p-2 hover:bg-blue-100 cursor-pointer">
                    <Link href="/admin/users">
                        <span> <i className="ri-user-settings-line text-blue-700"></i></span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
