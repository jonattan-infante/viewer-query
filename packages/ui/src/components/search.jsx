"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Slider,
} from "@nextui-org/react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/user";
import { QueryContext } from "@/context/query";
import { Tabla } from "@/components/tabla";

export function Search() {
  const { user } = useContext(UserContext);
  const { selectQuery, setSelectQuery, listQuerys, setListQuerys } =
    useContext(QueryContext);
  const [columns, setColumns] = useState([]);
  const [columnSelect, setColumnSelect] = useState(new Set([]));
  const [dataCollect, setDataCollect] = useState([]);
  /* const [sliderSelect, setSliderSelect] = useState(selectQuery.limit); */
  const [queryName, setQueryName] = useState("");
  const [queryComment, setComment] = useState("");
  const [isLoadingRunCommant, setIsLoadingRunCommant] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    getAvaiableConfig().then((data) => setColumns(data["available_columns"]));
  }, []);

  function handleColumnSelect(e) {
    const list = new Set(e.target.value.split(","));
    setColumnSelect(list);
    setSelectQuery({ ...selectQuery, select: [...list] });
  }

  async function saveQuery() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/querys/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: queryName,
          comment: queryComment,
          query: selectQuery,
          user_id: user.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          `HTTP error! status: ${res.status} ${JSON.stringify(data)}`
        );
      }
      const newQuery = { ...data, user: { ...user } };
      setListQuerys([...listQuerys, newQuery]);
      setQueryName("");
      setComment("");
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  async function runQuery() {
    try {
      setIsLoadingRunCommant(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/querys/dataset/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectQuery),
        }
      );
      setIsLoadingRunCommant(false);
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(
          `HTTP error! status: ${res.status} ${JSON.stringify(data)}`
        );
      }
      setDataCollect(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col mt-10 ml-5">
      <p className="text-2xl font-bold">Hola, {user.username}</p>
      <p className="text-lg">¿Qué quieres descubrir hoy?</p>
      <div className="flex mt-3">
        <Select
          label="Columnas dispoinibles"
          selectionMode="multiple"
          className="w-80 max-w-lg"
          onChange={handleColumnSelect}
        >
          {columns.map((column) => (
            <SelectItem key={column} value={column}>
              {column}
            </SelectItem>
          ))}
        </Select>

        <Slider
          label="Limite"
          color="danger"
          step={1}
          maxValue={1000}
          minValue={0}
          defaultValue={selectQuery.limit}
          aria-label="Limite de los datos"
          className="ml-10 max-w-xs"
          /* value={sliderSelect}
          onChange={setSliderSelect} */
          onChangeEnd={(value) =>
            setSelectQuery({ ...selectQuery, limit: value })
          }
        />

        <Button
          isDisabled={selectQuery.select.length === 0}
          color="primary"
          className="w-[60px] h-[60px] bg-primary-500 rounded-lg ml-10"
          onPress={runQuery}
          isLoading={isLoadingRunCommant}
        >
          Run
        </Button>

        <Button
          isDisabled={selectQuery.select.length === 0}
          color="primary"
          className="w-[60px] h-[60px] bg-primary-500 rounded-lg ml-10"
          onPress={onOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Detalle del Query
            </ModalHeader>
            <ModalBody>
              <p>
                Puedes guardar los queries creados y compartirlos con la
                comunidad para recibir feedback.
              </p>
              <p>
                Puedes asignarle un nombre y un <strong>comentario</strong> para
                que otros usuarios puedan comprender el query.
              </p>
              <Input
                placeholder="Nombre del Query"
                className="w-full h-[60px]"
                size="lg"
                type="text"
                value={queryName}
                onValueChange={setQueryName}
                isRequired
              />
              <Input
                placeholder="Comentario"
                className="w-full h-[60px]"
                size="lg"
                type="text"
                value={queryComment}
                onValueChange={setComment}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={saveQuery}>
                Guardar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      {dataCollect.length > 0 ? (
        <Tabla data={dataCollect} />
      ) : (
        <p className="text-lg mt-5">Upps Aun no tenemos datos para mostrar</p>
      )}
    </div>
  );
}

async function getAvaiableConfig() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/querys/avaliable`
  );
  const data = await res.json();
  return data;
}
