"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@/components/ui/dialog";
import { Menu, Scissors, Calendar, Users, Home, LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import Swal from "sweetalert2"; 
import { logoutUser } from "@/lib/api/auth";

export function Sidebar({ userType, className }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menuItems =
    userType === "barbeiro"
      ? [
          { name: "Início", icon: Home, href: "/dashboard/barbers/" },
          {
            name: "Meus Serviços",
            icon: Scissors,
            href: "/dashboard/barbers/services",
          },
          {
            name: "Dias de Trabalho",
            icon: Calendar,
            href: "/dashboard/barbers/work_days",
          },
          {
            name: "Agendamentos",
            icon: Calendar,
            href: "/dashboard/barbers/appointments",
          },
          { name: "Perfil", icon: Users, href: "/dashboard/barbers/profile" },
        ]
      : [
          {
            name: "Agendar",
            icon: Calendar,
            href: "/dashboard/customers/",
          },
          {
            name: "Meus Agendamentos",
            icon: Calendar,
            href: "/dashboard/customers/appointment",
          },
          { name: "Perfil", icon: Users, href: "/dashboard/customers/profile" },
        ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Tem certeza que vai sair?",
      text: "Você não poderá reverter essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, sair!",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      allowOutsideClick: false, 
      allowEscapeKey: false,
      preConfirm: async () => {
        try {
          const response = await logoutUser();
          window.location.reload();
          toast.success("Você saiu da sua conta!");
          return true;
        } catch (error) {
          toast.error("Erro ao sair da conta!");
          return false;
        }
      },
    });
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed left-4 top-4 z-40"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <DialogTitle className="sr-only">Menu</DialogTitle>
          <div className="h-full border-r bg-[#112240]">
            <div className="flex h-16 items-center border-b px-6">
              <Image
                src="/logoAgendaBarber.webp"
                alt="Logo da Barbearia"
                width={50}
                height={20}
                className="object-contain"
              />
              <span className="ml-2 text-sm font-semibold text-white">
                Agenda Barber
              </span>
            </div>
            <ScrollArea className="h-full py-4">
              <nav className="grid gap-1 px-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "transparent"
                    )}
                  >
                    <item.icon className="h-4 w-4 text-white" />
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    handleLogout();
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <LogOut className="h-4 w-4 text-white" />
                  Sair
                </Link>
              </nav>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
      <div className={cn("hidden border-r bg-[#112240] md:block", className)}>
        <div className="flex h-16 items-center border-b px-6">
          <Image
            src="/logoAgendaBarber.webp"
            alt="Logo da Barbearia"
            width={60}
            height={20}
            className="object-contain"
          />
          <span className="ml-2 text-lg font-semibold text-white">
            Agenda Barber
          </span>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)] py-4">
          <nav className="grid gap-1 px-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "transparent"
                )}
              >
                <item.icon className="h-4 w-4 text-white" /> {item.name}
              </Link>
            ))}
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                handleLogout();
              }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <LogOut className="h-4 w-4 text-white" />
              Sair
            </Link>
          </nav>
        </ScrollArea>
      </div>
    </>
  );
}
