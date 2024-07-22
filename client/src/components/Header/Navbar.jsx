"use client";

import React, { useState, useEffect } from "react";
import { ModeToggle } from "../modalToggle";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    // Check local storage for the token
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedin(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the token from local storage and update the state
    localStorage.removeItem("authToken");
    setIsLoggedin(false);
  };

  return (
    <ul className="flex items-center justify-center gap-4 pt-5">
      <li>
        <ModeToggle />
      </li>
      {isLoggedin ? (
        <li>
          <Button onClick={handleLogout}>Logout</Button>
        </li>
      ) : (
        <li>
          <Button>
            <Link href={"/login"}>Login</Link>
          </Button>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
