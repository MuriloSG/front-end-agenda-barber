"use client";
import { getBarberServices } from "@/lib/api/barber";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/skeletonServices/skeleton";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ErrorMesage } from "@/components/errorMessage/errorMessage";
import { toast } from "sonner";
import Swal from "sweetalert2"; 
import { deleteService } from "@/lib/api/barber";

export default function ServicesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const data = await getBarberServices();
        setServices(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Erro ao carregar os dados: ", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleEdit = (index) => {
    console.log("Edit service:", services[index]);
  };

  const handleDelete = async (serviceId, index) => {
    const result = await Swal.fire({
      title: "Tem certeza que vai deletar esse Serviço?",
      text: "Você não poderá reverter essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      allowOutsideClick: false, 
      allowEscapeKey: false,
      preConfirm: async () => {
        try {
          const response = await deleteService(serviceId);
          toast.success("Serviço deletado com sucesso!");
          setServices(services.filter((_, i) => i !== index));
          return true;
        } catch (error) {
          toast.error("Erro ao deletar serviço!");
          return false;
        }
      },
    });
  };

  if (isLoading) {
    return <Skeleton />;
  }

  if (!services) {
    return (
      <ErrorMesage
        title="Algo deu errado"
        description="Não conseguimos carregar os dados no momento. Tente novamente mais"
      />
    );
  }

  return (
    <div className="space-y-6 mt-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-xl font-bold md:text-3xl">Serviços</h1>
        <Link
          href="/dashboard/barbers/services/create"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm md:text-base"
        >
          <Plus className="h-5 w-5 md:h-6 md:w-6" />
          Novo
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.length === 0 ? (
          <div className="col-span-full text-center mt-10">
            <h2 className="text-xl font-bold">Não há serviços cadastrados</h2>
            <p className="mt-2">
              Parece que não há serviços disponíveis no momento. Adicione novos
              serviços para começar.
            </p>
          </div>
        ) : (
          services.map((service, index) => (
            <Card key={index} className="overflow-hidden p-0">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={service.image || "/img_services_default.jpg"}
                  alt={service.name}
                  fill
                  className="object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center pb-4">
                <span className="text-2xl font-bold">
                  {formatCurrency(service.price)}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(index)}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(service.id, index)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
