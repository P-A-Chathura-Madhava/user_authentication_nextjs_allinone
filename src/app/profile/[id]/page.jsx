"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ProfilePage({params}) {
  const router = useRouter();
  const [userid, setuserId] = useState("");
  const logOut = async()=> {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  }

  const getUserData = async () => {
    try {
      const response = await axios.get("/api/users/admin");
      console.log(response.data);
      setuserId(response.data.data._id);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
        <h1>Profile</h1>
        <h2>Profile ID : {params.id}</h2>
        <h2>{userid}</h2>
        <button onClick={logOut}>Logout</button>
        <br />
        <button onClick={getUserData}>Get User Data</button>
    </>
  )
}

export default ProfilePage