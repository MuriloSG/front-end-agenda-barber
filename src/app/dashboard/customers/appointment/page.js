"use client";

import { useState, useEffect, useCallback } from "react";
import { XCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn, formatCurrency, formatTime } from "@/lib/utils";
import { getCustomerAppointments, cancelAppointment } from "@/lib/api/customer";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";

const statusOptions = [
  { value: "all", label: "Todos os status" },
  { value: "pending", label: "Pendente" },
  { value: "confirmed", label: "Confirmado" },
  { value: "canceled", label: "Cancelado" },
  { value: "completed", label: "Concluído" },
];

const daysOptions = [
  { value: "all", label: "Todos os dias" },
  { value: "monday", label: "Segunda-feira" },
  { value: "tuesday", label: "Terça-feira" },
  { value: "wednesday", label: "Quarta-feira" },
  { value: "thursday", label: "Quinta-feira" },
  { value: "friday", label: "Sexta-feira" },
  { value: "saturday", label: "Sábado" },
  { value: "sunday", label: "Domingo" },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    day: "all",
    barberName: "",
  });
  const [filterInputs, setFilterInputs] = useState({
    status: "all",
    day: "all",
    barberName: "",
  });
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState(new Set());

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCustomerAppointments(
        filters.status === "all" ? null : filters.status,
          filters.barberName || "",
        filters.day === "all" ? null : filters.day,
      );
      setAppointments(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancelar agendamento?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, cancelar!",
      cancelButtonText: "Voltar",
      confirmButtonColor: "#dc2626",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: async () => {
        try {
          const response = await cancelAppointment(id);
          await fetchAppointments();
          toast.success("Agendamento cancelado com sucesso!");
          return true;
        } catch (error) {
          toast.error("Erro ao cancelar agendamento!");
          return false;
        }
      },
    });
  };

  const toggleRow = (id) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const applyFilters = () => {
    setFilters({ ...filterInputs });
  };

  const clearFilters = () => {
    setFilterInputs({ status: "all", day: "all", barberName: "" });
    setFilters({ status: "all", day: "all", barberName: "" });
  };

  const getStatusBadge = (status) => (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        status === "confirmed" && "bg-green-100 text-green-800",
        status === "pending" && "bg-yellow-100 text-yellow-800",
        status === "canceled" && "bg-red-100 text-red-800",
        status === "completed" && "bg-blue-100 text-blue-800"
      )}
    >
      {statusOptions.find((option) => option.value === status)?.label}
    </span>
  );

  return (
    <div className="space-y-6 p-4 md:p-6 mt-10">
      <h1 className="text-2xl md:text-3xl font-bold">Meus Agendamentos</h1>

      <div className="flex flex-col gap-3">
        <Select
          value={filterInputs.status}
          onValueChange={(value) =>
            setFilterInputs({ ...filterInputs, status: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filterInputs.day}
          onValueChange={(value) =>
            setFilterInputs({ ...filterInputs, day: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Dia da semana" />
          </SelectTrigger>
          <SelectContent>
            {daysOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Nome do barbeiro"
          value={filterInputs.barberName}
          onChange={(e) =>
            setFilterInputs({ ...filterInputs, barberName: e.target.value })
          }
          className="w-full"
        />

        <div className="flex gap-2">
          <Button onClick={applyFilters} className="flex-1">
            Filtrar
          </Button>
          {(filters.status !== "all" ||
            filters.day !== "all" ||
            filters.barberName) && (
            <Button variant="outline" onClick={clearFilters}>
              Limpar
            </Button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Erro: {error}
        </div>
      )}

      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Barbeiro</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Dia</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Carregando agendamentos...
                </TableCell>
              </TableRow>
            ) : appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Nenhum agendamento encontrado
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    {appointment.barber?.username ||
                      appointment.barber?.email ||
                      "Barbeiro não identificado"}
                  </TableCell>
                  <TableCell>{appointment.service.name}</TableCell>
                  <TableCell>
                    {appointment.day_of_week || "Não informado"}
                  </TableCell>
                  <TableCell>
                    {formatTime(appointment.time_slot?.time)}h
                  </TableCell>
                  <TableCell>{formatCurrency(appointment.price)}</TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {appointment.status === "confirmed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          onClick={() => handleCancel(appointment.id)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-4">
        {isLoading ? (
          <div className="text-center py-4">Carregando agendamentos...</div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-4">Nenhum agendamento encontrado</div>
        ) : (
          appointments.map((appointment) => (
            <Collapsible
              key={appointment.id}
              open={expandedRows.has(appointment.id)}
              onOpenChange={() => toggleRow(appointment.id)}
              className="bg-white rounded-lg border shadow-sm"
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <div className="font-medium">
                      {appointment.barber?.username ||
                        appointment.barber?.email ||
                        "Barbeiro não identificado"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatTime(appointment.time_slot?.time)}h
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(appointment.status)}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedRows.has(appointment.id) && "rotate-180"
                      )}
                    />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 space-y-3 border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Dia:</span>
                    <span>{appointment.day_of_week || "Não informado"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Serviço:
                    </span>
                    <span>{appointment.service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Valor:
                    </span>
                    <span>{formatCurrency(appointment.price)}</span>
                  </div>
                  <div className="flex gap-2 justify-end mt-4">
                    {appointment.status === "confirmed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))
        )}
      </div>
    </div>
  );
}
