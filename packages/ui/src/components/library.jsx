"use client";
import React, { useContext, useEffect } from "react";
import { ScrollShadow } from "@nextui-org/react";
import { Query } from "@/components/query";
import { QueryContext } from "@/context/query";

export function Library() {
  const { listQuerys, setListQuerys } = useContext(QueryContext);

  useEffect(() => {
    getQuerys().then((querys) => {
      setListQuerys(querys);
    });
  }, []);
  return (
    <ScrollShadow hideScrollBar className="w-[300px] h-[800px] p-8">
      <p className="text-center font-bold text-2xl">Libreria</p>
      {listQuerys.length > 0 ? (
        listQuerys.map((query) => <Query key={query.id} data={query} />)
      ) : (
        <p className="text-center">No hay querys</p>
      )}
    </ScrollShadow>
  );
}

async function getQuerys() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/querys`);
    const querys = await res.json();
    return querys;
  } catch (error) {
    console.log(error);
    return [];
  }
}
