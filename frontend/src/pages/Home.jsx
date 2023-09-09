import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import SideNav from "../components/SideNav";

function Home() {
    
  return (
    <>
        <SideNav />
        <div className="h-screen flex-1 p-7">
          <h1 className="text-2xl font-semibold ">Home Page</h1>
        </div>
    </>
  );
}

export default Home;
