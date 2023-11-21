"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import { UserContext } from "@/context/user";

export default function Comment({ queryId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getCommentsByQuery(queryId).then((data) => setMessages(data));
  }, []);

  async function handleSubmit() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: message,
          query_id: queryId,
          user_id: user.id,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(`Algo salio mal`);
      }
      const newComment = { ...data, user: { ...user } };
      setMessages([...messages, newComment]);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Button onPress={onOpen}>Comentarios</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">Comentarios</h1>
            </ModalHeader>
            <ModalBody>
              {messages.length > 0 ? (
                messages.map((data) => (
                  <Message
                    key={data.id}
                    username={data.user.username}
                    fullname={data.user.fullname}
                    message={data.comment}
                  />
                ))
              ) : (
                <p>No hay comentarios</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Input
                value={message}
                onValueChange={setMessage}
                type="text"
                variant="bordered"
                label="message"
                placeholder="Escribe un comentario sobre el query"
                isRequired
              />
              <Button
                color="primary"
                onPress={handleSubmit}
                isDisabled={message === ""}
              >
                Enviar
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

function Message({ message, username, fullname }) {
  return (
    <Card className="max-w-max m-2">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" showFallback />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {username}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {fullname || ""}
            </h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 text-small text-default-400 min-h-min">
        <p>{message}</p>
      </CardBody>
    </Card>
  );
}

async function getCommentsByQuery(queryId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${queryId}`
  );
  const data = await res.json();
  return data;
}
