import Link from "next/link";
import React from "react";
import ReactTooltip from 'react-tooltip';
import { FcConferenceCall } from 'react-icons/fc'
import { FcTodoList } from 'react-icons/fc'
import { FcPaid } from 'react-icons/fc'
import { FcComboChart } from 'react-icons/fc'
import { FcBusinessman } from 'react-icons/fc'

export default function DashboardLinks() {
    return (
        <div className="card text-xl py-5 px-3">
            <ul className="flex flex-col mt-3 text-center align-middle items-center">
                <Link href="/admin/adminProfile">
                    <li className="py-0 text-2xl hover:scale-125 text-blue-700" data-tip="Perfil">
                        <FcBusinessman />
                    </li>
                </Link>
                <hr className="mt-1 mb-4 w-full flex flex-1 border-t border border-t-blue-700"></hr>
                <Link href="/admin/dashboard">
                    <li className="card px-2 py-2 cursor-pointer !rounded-sm  hover:scale-125 text-blue-700 hover:text-white" data-tip="Dashboard">
                        <span className="">
                            <FcComboChart />
                        </span>
                    </li>
                </Link>
                <Link href="/admin/orders">
                    <li className="card px-2 py-2 cursor-pointer !rounded-sm hover:scale-125 text-blue-700 hover:text-white" data-tip="Pedidos">
                        <span className=" ">
                            <FcPaid />
                        </span>
                    </li>
                </Link>
                <Link href="/admin/products">
                    <li className="card px-2 py-2 cursor-pointer !rounded-sm hover:scale-125 text-blue-700 hover:text-white" data-tip="Produtos">
                        <span className="">
                            <FcTodoList />
                        </span>
                    </li>
                </Link>
                <Link href="/admin/users">
                    <li className="card px-2 py-2 cursor-pointer !rounded-sm hover:scale-125 text-blue-700 hover:text-white" data-tip="Usuários">
                        <span className=" ">
                            <FcConferenceCall />
                        </span>
                    </li>
                </Link>
            </ul>
            <ReactTooltip
                delayHide={1000}
                place="right"
                type="info"
                effect="solid"
                backgroundColor="#2028b3"
                textColor="#fff"
                borderColor="#cbd5e0"
            />
        </div >
    );
}
