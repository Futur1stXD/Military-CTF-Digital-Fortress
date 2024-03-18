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

      <footer class=" bottom-0 left-12  w-full p-1 md:flex md:items-center md:justify-center">
        <div className="flex items-center">
          <img src="src/img/logo.png" alt="" className="w-8 h-8 mr-4" />
          <span className="flex justify-center text-sm text-gray-500 sm:text-center  dark:text-gray-400 text-wrap">
            © 2024 Military CTF. Все права защищены.
          </span>
        </div>
      </footer>
    </Layout.Footer>
  );
}