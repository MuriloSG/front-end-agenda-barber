"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  CalendarPlus,
  Pencil,
  Trash2,
  Clock,
  Plus,
  Eye,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/skeletonWorkDay/skeleton";
import { ErrorMesage } from "@/components/errorMessage/errorMessage";
import {
  getBarberWorkDays,
  deleteWorkDay,
  reactivateAllSlotsWorkDay,
  deactivateAllSlotsWorkDay,
} from "@/lib/api/barber";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function BarberSchedule() {
  const [workDays, setWorkDays] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const fetchWorkDays = async () => {
    setIsLoading(true);
    try {
      const data = await getBarberWorkDays();
      setWorkDays(data);
      setIsLoading(false);
    } catch (error) {
      console.log("Erro ao carregar os dados: ", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkDays();
  }, []);

  const handleDelete = async (work_day_id, index) => {
    const result = await Swal.fire({
      title: "Tem certeza que vai deletar esse Dia de trabalho?",
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
          const response = await deleteWorkDay(work_day_id);
          toast.success("Dia de trabalho deletado com sucesso!");
          setWorkDays(workDays.filter((_, i) => i !== index));
          return true;
        } catch (error) {
          toast.error("Erro ao deletar dia de trabalho!");
          return false;
        }
      },
    });
  };

  const handleReactivate = async (work_day_id) => {
    const result = await Swal.fire({
      title: "Reativar horários?",
      text: "Deseja regenerar todos os horários disponíveis para este dia?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim, regenerar!",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: async () => {
        try {
          const response = await reactivateAllSlotsWorkDay(work_day_id);
          fetchWorkDays();
          toast.success("Horários reativados com sucesso!");
          return true;
        } catch (error) {
          toast.error("Erro ao reativados horários!");
          return false;
        }
      },
    });
  };

  const handleDesactivate = async (work_day_id) => {
    const result = await Swal.fire({
      title: "Excluir horários?",
      text: "Deseja excluir todos os horários deste dia?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      preConfirm: async () => {
        try {
          const response = await deactivateAllSlotsWorkDay(work_day_id);
          fetchWorkDays();
          toast.success("Horários excluidos com sucesso!");
          return true;
        } catch (error) {
          toast.error("Erro ao excluir horários!");
          return false;
        }
      },
    });
  };

  const handleView = (id) => {
    router.push(`/dashboard/barbers/times/${id}/`);
  };

  if (isLoading) {
    return <Skeleton />;
  }

  if (!workDays) {
    return (
      <ErrorMesage
        title="Algo deu errado"
        description="Não conseguimos carregar os seus dias de trabalho no momento. Tente novamente mais tarde"
      />
    );
  }

  return (
    <div className="space-y-6 mt-10">
      <div className="flex items-center justify-between flex-wrap gap-4 p-6">
        <h1 className="text-xl font-bold md:text-3xl">Dias de trabalho</h1>
        <Link
          href="/dashboard/barbers/work_days/create"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm md:text-base"
        >
          <Plus className="h-5 w-5 md:h-6 md:w-6" />
          Novo
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {workDays.length === 0 ? (
          <div className="col-span-full text-center mt-10">
            <h2 className="text-xl font-bold">
              Não há dias de trabalho cadastrados
            </h2>
            <p className="mt-2">
              Parece que não há dias de trabalho disponíveis no momento.
              Adicione novos dias de trabalho para começar.
            </p>
          </div>
        ) : (
          workDays.map((day, index) => (
            <Card
              key={index}
              className="w-full transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-semibold text-primary">
                    {day.day_of_week_display}
                  </h3>
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/barbers/work_days/edit/${day.id}`}
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 flex items-center justify-center bg-green-500 text-white hover:bg-green-600 rounded-md"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(day.id, index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-green-600">
                    <Clock className="h-4 w-4" />
                    <span>{day.free_time_count} horários livres</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-600">
                    <Clock className="h-4 w-4" />
                    <span>{day.busy_time_count} horários ocupados</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {day.free_time_count <= 0 ? (
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleReactivate(day.id, index)}
                  >
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Reativar horários
                  </Button>
                ) : null}
                <div className="flex flex-col sm:flex-row justify-center gap-2">
                  <Button
                    className="w-full sm:w-[10rem] bg-red-600 hover:bg-red-700 flex items-center gap-2"
                    onClick={() => handleDesactivate(day.id)}
                  >
                    <Trash className="h-4 w-4" />
                    Excluir horários
                  </Button>

                  <Button
                    className="w-full sm:w-[10rem] bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => handleView(day.id)}
                  >
                    <Eye className="h-4 w-4" />
                    Ver horários
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
