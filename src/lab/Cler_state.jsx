import React, { useState } from "react";

export default function LoginComponent() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;  
    const value = e.target.value;


    const updatedUser = { ...user };
    updatedUser[name] = value
    setUser(updatedUser);

  };


  const onClear = () => {
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={handleChange}
      />

      <hr />

      <h3>Live Preview</h3>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <button onclick={onClear}>Clear</button>
    </div>
  );
}

