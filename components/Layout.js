import React from "react"
import Head from 'next/head'
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
				<title>CRM - Clients Manager</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>

			<Sidebar />
      {children}
    </>
  );
};

export default Layout;
