"use client";

import { createContext, useState } from "react";

export const QueryContext = createContext();

export default function QueryProvider({ children }) {
  const [listQuerys, setListQuerys] = useState([]);
  const [selectQuery, setSelectQuery] = useState({
    select: [],
    from_: "tree",
    limit: 100,
  });

  return (
    <QueryContext.Provider
      value={{ listQuerys, setListQuerys, selectQuery, setSelectQuery }}
    >
      {children}
    </QueryContext.Provider>
  );
}
