"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { UserContext } from "../context/user";
import { useContext } from "react";
import { redirect } from "next/navigation";

export default function Register() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");

  if (user) {
    redirect("/dashboard");
  }

  async function handleSubmit() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
        method: "POST",
        body: JSON.stringify({ username, fullname }),
        headers: {
          "content-type": "application/json",
        },
        redirect: "follow",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2 className="mt-5 text-center font-bold text-2xl">Registro</h2>
      <form
        action={handleSubmit}
        className="flex flex-col justify-center mx-auto"
      >
        <Input
          value={username}
          onValueChange={setUsername}
          label="Usuario"
          className="mt-2"
          isRequired
        />

        <Input
          value={fullname}
          onValueChange={setFullname}
          label="Nombre Completo"
          className="mt-2"
        />

        <Button
          color="primary"
          size="large"
          className="w-1/2 mx-auto mt-2"
          type="submit"
        >
          Registrar
        </Button>
      </form>
    </>
  );
}
