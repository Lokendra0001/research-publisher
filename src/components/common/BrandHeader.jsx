"use client"
import Image from "next/image";
import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import logoImg from "../../../public/logo/logo.png"

export default function BrandHeader() {
    let path = usePathname();

    let isHome = path.startsWith('/author') || path.startsWith('/publisher') || path.startsWith('/reviewer') ? false : true

    return (
        <div className="bg-primary-foreground py-8 border-b border-border">
            <Image src={logoImg} alt="logo" priority className=" px-10 max-w-auto sm:max-w-[600px] mx-auto"/>
        </div>
    );
}
