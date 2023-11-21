"use client";
import {
  Card,
  Avatar,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";

import Comment from "./comments";
import { useContext } from "react";
import { QueryContext } from "@/context/query";

export function Query({ data }) {
  const { setSelectQuery } = useContext(QueryContext);
  return (
    <Card className="max-w-[400px] my-3">
      <CardHeader className="flex gap-3">
        <Avatar showFallback />
        <div className="flex flex-col">
          <p className="text-md">{data.user.username}</p>
          <p className="text-small text-default-500">
            {data.user.fullname || ""}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{data.name}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Comment queryId={data.id} />
        <Button
          color="primary"
          className="ml-10"
          onPress={() => setSelectQuery(data.query)}
        >
          {">"}
        </Button>
      </CardFooter>
    </Card>
  );
}
