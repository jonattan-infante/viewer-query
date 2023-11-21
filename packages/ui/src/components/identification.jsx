"use client";
import { redirect } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState, useContext } from "react";
import { UserContext } from "@/context/user";

export default function Identification() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);
  if (user) {
    redirect("/dashboard");
  }
  async function handleSubmit() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${username}`
      );
      const data = await res.json();
      console.log(data);
      if (res.status === 404) {
        throw new Error(`Ups! No existe ese usuario, Por favor registrate`);
      }
      if (!res.ok) {
        throw new Error(`Ups! Algo salio mal`);
      }
      setUser(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  return (
    <>
      <h2 className="mt-5 text-center font-bold text-2xl">Identificación</h2>
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
          errorMessage={error}
        />

        <Button
          color="primary"
          size="large"
          className="w-1/2 mx-auto mt-2"
          type="submit"
        >
          Continuar
        </Button>
      </form>
    </>
  );
}
