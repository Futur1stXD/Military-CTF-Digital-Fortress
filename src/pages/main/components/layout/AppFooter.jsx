import { Layout } from "antd";
import React, { useState } from 'react';
import '../../../../input.css'

const footerStyle = {
  minHeight: 60,
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#121927",
};

export default function AppFooter() {
  return (
    <Layout.Footer style={footerStyle}>

      <footer className=" bottom-0 left-0  w-full p-1 md:flex md:items-center md:justify-between">
        <div className="flex items-center">
          <img src="src/img/logo.png" alt="" className="w-8 h-8 mr-4" />
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 text-wrap">
            © 2024 Military CTF. Все права защищены.
          </span>
        </div>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">About</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </footer>
    </Layout.Footer>
  );
}
