"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const navigation = [
  { name: "Início", href: "#" },
  { name: "Serviços", href: "#services" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full bg-[#0a192f]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a192f]/80 z-50 border-b border-[#1a2f4d]">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logoAgendaBarber.webp"
            alt="Logo da Barbearia"
            width={70}
            height={20}
            className="object-contain"
          />
          <p className="text-white">AGENDA BARBER</p>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white"
              >
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Criar Conta
              </Button>
            </Link>
          </div>
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-300">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full bg-[#0a192f] border-[#1a2f4d] p-0"
            >
              <div className="flex-1 flex items-center justify-center flex-col gap-2 p-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white text-lg py-2 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="p-4 border-t border-[#1a2f4d] space-y-4">
                <Link href="/login" className="block">
                  <Button
                    variant="ghost"
                    className="w-full text-gray-300 hover:text-white"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Criar Conta
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
