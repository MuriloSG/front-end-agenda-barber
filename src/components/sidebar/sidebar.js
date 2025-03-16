"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Sidebar({ userType }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menuItems =
    userType === "barbeiro"
      ? [
          { label: "Meus Serviços", path: "/dashboard/barbers/services" },
          {
            label: "Confirmar/Cancelar Agendamentos",
            path: "/dashboard/barbers/appointment/confirm-cancel",
          },
          {
            label: "Dias de Trabalho",
            path: "/dashboard/barbers/work-days",
          },
          { label: "Perfil", path: "/dashboard/barbers/profile" },
        ]
      : [
          { label: "Agendar", path: "/dashboard/customers/appointment/novo" },
          {
            label: "Meus Agendamentos",
            path: "/dashboard/customers/appointment",
          },
          { label: "Perfil", path: "/dashboard/customers/profile" },
        ];

  return (
    <>
      <aside className="hidden md:flex w-64 bg-gray-900 text-white h-screen p-4 flex-col">
        <h2 className="text-xl font-bold mb-4">Agenda Barber</h2>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={`p-2 rounded ${
                  pathname === item.path ? "bg-gray-700" : ""
                }`}
              >
                <Link href={item.path}>
                  {item.label || "Sem título"} 
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 left-4"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-gray-900 text-white">
          <h2 className="text-xl font-bold mb-4">
            {userType === "barbeiro" ? "Barbeiro" : "Cliente"}
          </h2>
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.path}
                  className={`p-2 rounded ${
                    pathname === item.path ? "bg-gray-700" : ""
                  }`}
                >
                  <Link href={item.path} onClick={() => setOpen(false)}>
                    {item.label || "Sem título"} {/* Valor padrão */}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}

