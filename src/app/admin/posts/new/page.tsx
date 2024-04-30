"use client";

import Link from 'next/link';
import Sidebar from "@/app/components/layouts/Sidebar/Sidebar";
import '../../../styles/Admin.scss'

export default function Admin () {
  return (
    <>
      <div className="wrapper">
        <Sidebar/>
        <div className="main">
          <h2 className='mb-5'>記事新規作成</h2>
          <div className="mb-10">
            <input type="text" name="text"/>
          </div>
          <div className="btnArea">
            <Link className="make" href={`/admin/post/new/`} >
              作成
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}