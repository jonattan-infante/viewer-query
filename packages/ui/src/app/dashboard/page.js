"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/user";
import { redirect } from "next/navigation";
import { Search } from "@/components/search";
import { Library } from "@/components/library";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  if (!user) {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-[1fr_3fr] h-screen items-start" >
      <Library />
      <Search />
    </div>
  );
}

// style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', height: '100vh' }}