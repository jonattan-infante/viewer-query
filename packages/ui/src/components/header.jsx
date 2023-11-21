import { Navbar, NavbarBrand } from "@nextui-org/react";
import Image from "next/image";
import Logo from "../../public/logo.svg";

export default function Header() {
  return (
    <Navbar>
      <NavbarBrand>
        <Image src={Logo} alt="Logo Viewer Query" width={32} height={32} />
        <p className="font-bold text-inherit ml-1">Viewer Query</p>
      </NavbarBrand>
    </Navbar>
  );
}
