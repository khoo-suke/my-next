"use client";

import { useEffect, useState } from "react";
import styles from './styles/ListPost.module.scss';
import Link from 'next/link';
import Sidebar from "@/app/components/layouts/Sidebar/Sidebar";

export default function Admin () {
  return (
    <>
      <div className="wrapper">
        <Sidebar/>
        <div className="main">
          <h2>記事編集</h2>
        </div>
      </div>
    </>
  );
}