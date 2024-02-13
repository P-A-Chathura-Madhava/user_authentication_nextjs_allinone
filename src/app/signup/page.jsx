"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = async () => {
    try {
      const user = {name, email, password};
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>SignUp</h1>
      <input type="text" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}} />
      <br />
      <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
      <br />
      <input type="text" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
      <br />
      <button onClick={onSignup}>Signup</button>
      <br />
      <Link href={"/login"}>Go to Login Page</Link>
    </>
  );
}

export default SignupPage;
