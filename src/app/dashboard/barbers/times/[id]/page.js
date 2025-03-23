"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Trash } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { formatTime } from "@/lib/utils";
import { deleteSlotsWorkDay, getSlotsWorkDay } from "@/lib/api/barber";
import { Skeleton } from "@/components/skeletonTimes/skeleton";
import { useRouter } from "next/navigation";

export default function Times({ params }) {
  const { id } = use(params);
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const data = await getSlotsWorkDay(id);
        setTimes(data);
        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar horários!");
        setLoading(false);
      }
    };

    fetchHorarios();
  }, [id]);

  if (loading) {
    return <Skeleton />;
  }

  const handleDelete = async (id, index) => {
    const result = await Swal.fire({
      title: "Tem certeza que vai excluir esse Horário?",
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
          const response = await deleteSlotsWorkDay(id);
          setTimes((prevTimes) => {
            const updatedTimes = [...prevTimes];
            updatedTimes.splice(index, 1);
            return updatedTimes;
          });
          toast.success("Horário deletado com sucesso!");
          return true;
        } catch (error) {
          toast.error("Erro ao deletar Horário!");
          return false;
        }
      },
    });
  };

  const handleWorkView = () => {
    router.push("/dashboard/barbers/work_days");
  };

  return (
    <div className="space-y-6 mt-10">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Button
            onClick={() => handleWorkView()}
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            <ArrowLeft className="h-4 w-4 " />
            Voltar
          </Button>
        </div>

        <h1 className="text-xl font-semibold mb-4">Horários Disponíveis</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hora</TableHead>
              <TableHead>Disponibilidade</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {times.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-500">
                  Nenhum horário disponível.
                </TableCell>
              </TableRow>
            ) : (
              times.map((time, index) => (
                <TableRow key={index}>
                  <TableCell>{formatTime(time.time)}h</TableCell>
                  <TableCell>
                    {time.is_available ? "Disponível" : "Indisponível"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(time.id, index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
