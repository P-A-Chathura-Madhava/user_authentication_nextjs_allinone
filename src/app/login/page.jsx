"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    try {
      const user = {email, password};
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      router.push("/profile/1234");
    } catch (error) {
      console.log("Login Failed", error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
      <br />
      <input type="text" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
      <br />
      <button onClick={onLogin}>Login</button>
      <br />
      <Link href={"/signup"}>Go to Signup Page</Link>
    </>
  )
}

export default LoginPage