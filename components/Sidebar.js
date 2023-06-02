import React from "react"
import Link from "next/link"
import { useRouter } from "next/router";

const Sidebar = () => {

  // routing from next
  const router = useRouter()
    
  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-2xl font-bold  ">CRM Clientes </p>
      </div>

      <nav className="mt-5 list-none">
        <li className={router.pathname === "/" ? "bg-blue-800 p-2" : "p-2"}>
          <Link href="/" className="block">
            Clients
          </Link>
        </li>
        <li className={router.pathname === "/orders" ? "bg-blue-800 p-2" : "p-2"}>
          <Link href="/orders" className="block">
            Orders
          </Link>
        </li>
        <li className={router.pathname === "/products" ? "bg-blue-800 p-2" : "p-2"}>
          <Link href="/products" className="block">
            Products
          </Link>
        </li>
      </nav>
    </aside>
  );
}

export default Sidebar