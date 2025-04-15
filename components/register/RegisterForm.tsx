"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [firstError, setFirstError] = useState("");
  const [lastError, setLastError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlefirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(false);
    setFirstName(e.target.value);
    if (firstName.length === 0) {
      setFirstError("First name is required");
    } else if (firstName.length > 0) {
      setFirstError("");
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!firstName) {
      setFirstError("First name is equired");
    }
    setLastName(e.target.value);
    if (lastName.length === 0) {
      setLastError("Last name is required");
    } else if (lastName.length > 0) {
      setLastError("");
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!firstName) {
      setFirstError("First name is equired");
    }
    if (!lastName) {
      setLastError("Last name is equired");
    }

    setUsername(e.target.value);

    if (username.length === 0) {
      setUsernameError("Username is required");
    } else if (username.length > 0) {
      setUsernameError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!firstName) {
      setFirstError("First name is equired");
    }
    if (!lastName) {
      setLastError("Last name is equired");
    }
    if (!username) {
      setUsernameError("Username is equired");
    }
    setEmail(e.target.value);
    if (email.length === 0) {
      setEmailError("Email is required");
    } else if (email.length > 0) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!firstName) {
      setFirstError("First name is equired");
    }
    if (!lastName) {
      setLastError("Last name is equired");
    }
    if (!username) {
      setUsernameError("Username is equired");
    }
    if (!email) {
      setEmailError("Email is equired");
    }

    setPassword(e.target.value);

    if (password.length === 0) {
      setPasswordError("Password is required");
    } else if (password.length > 0) {
      setPasswordError("");
    }
  };

  const handleVerifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!firstName) {
      setFirstError("First name is equired");
    }
    if (!lastName) {
      setLastError("Last name is equired");
    }
    if (!username) {
      setUsernameError("Username is equired");
    }
    if (!email) {
      setEmailError("Email is equired");
    }
    if (!password) {
      setPasswordError("Password is equired");
    }

    setVerifyPassword(e.target.value);

    if (verifyPassword.length === 0) {
      setVerifyError("Verification is required");
    } else if (verifyPassword.length > 0) {
      setVerifyError("");
    }
  };

  const handleCreatingUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      setVerifyError("Password does not match.");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (!firstName) {
      setFirstError("First name is required");
      return;
    }
    if (!lastName) {
      setLastError("Last name is required");
      return;
    }
    if (!username) {
      setUsernameError("Username is required");
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setError("Failed to create user.");
        const msg = await res.text();
        throw new Error(msg || "Failed to create user.");
      }

      if (res.ok) {
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setVerifyPassword("");
        setFirstError("");
        setLastError("");
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setVerifyError("");
        setLoading(false);
      }
      setSuccess("User Created Sucessfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    if (success === "User Created Sucessfully") {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
  }, [success]);

  useEffect(() => {
    if (
      firstName.length !== 0 &&
      lastName.length !== 0 &&
      username.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
      verifyPassword.length !== 0 &&
      password.length === verifyPassword.length &&
      password === verifyPassword &&
      password.length !== 0 &&
      verifyPassword.length !== 0
    ) {
      setPasswordError("");
    }

    if (password !== verifyPassword) {
      setPasswordError("passwords do not match");
    }
  }, [firstName, lastName, username, email, password, verifyPassword]);

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center">
        <h2 className="text-3xl font-black mb-4">Register new account</h2>
        <div className="w-full flex flex-row gap-4">
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleCreatingUser}
          >
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-80"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={handlefirstNameChange}
              />
              {firstError && <span className="text-red-500">{firstError}</span>}
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-80"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleLastNameChange}
              />
              {lastError && <p className="text-red-500">{lastError}</p>}
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-80"
                placeholder="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
              />
              {usernameError && <p className="text-red-500">{usernameError}</p>}
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-80"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-80"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Input
                className="w-80"
                placeholder="Password Confromation"
                name="verifyPassword"
                value={verifyPassword}
                onChange={handleVerifyChange}
              />
              {verifyError && <p className="text-red-500">{verifyError}</p>}
            </div>
            {disabled ? (
              <Button className="w-80" disabled>
                Register
              </Button>
            ) : loading ? (
              <Button type="submit" disabled className="w-80">
                Loading ...
              </Button>
            ) : (
              <Button type="submit" className="w-80">
                Register
              </Button>
            )}
          </form>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-emerald-500">{success}</p>}
      </div>
    </>
  );
};

export default RegisterForm;
