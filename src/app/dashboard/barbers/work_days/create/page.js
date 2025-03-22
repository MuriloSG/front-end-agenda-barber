"use client";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workDaySchema } from "@/validation/workDaySchema";
import { useRouter } from "next/navigation";
import { createWorkDay } from "@/lib/api/barber";

const daysOfWeek = [
  { value: "sunday", label: "Domingo" },
  { value: "monday", label: "Segunda-feira" },
  { value: "tuesday", label: "Terça-feira" },
  { value: "wednesday", label: "Quarta-feira" },
  { value: "thursday", label: "Quinta-feira" },
  { value: "friday", label: "Sexta-feira" },
  { value: "saturday", label: "Sábado" },
];

export default function CreateWorkDayPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(workDaySchema),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await createWorkDay(data);
      setErrorMessage("");
      toast.success("Dia de trabalho criado com sucesso!");
      router.push("/dashboard/barbers/work_days");
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/barbers/work_days");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Criar Horário de Trabalho</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="day_of_week" className="text-sm font-medium">
            Dia da semana
          </label>
          <select
            id="day_of_week"
            {...register("day_of_week")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Selecione um dia</option>
            {daysOfWeek.map((day) => (
              <option key={day.value} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>
          {errors.day_of_week && (
            <p className="text-sm font-medium text-destructive">
              {errors.day_of_week.message}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="start_time" className="text-sm font-medium">
              Horário de início
            </label>
            <Input
              id="start_time"
              type="time"
              step="1"
              {...register("start_time")}
            />
            {errors.start_time && (
              <p className="text-sm font-medium text-destructive">
                {errors.start_time.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="end_time" className="text-sm font-medium">
              Horário de término
            </label>
            <Input
              id="end_time"
              type="time"
              step="1"
              {...register("end_time")}
            />
            {errors.end_time && (
              <p className="text-sm font-medium text-destructive">
                {errors.end_time.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="lunch_start_time" className="text-sm font-medium">
              Início do almoço
            </label>
            <Input
              id="lunch_start_time"
              type="time"
              step="1"
              {...register("lunch_start_time")}
            />
            {errors.lunch_start_time && (
              <p className="text-sm font-medium text-destructive">
                {errors.lunch_start_time.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="lunch_end_time" className="text-sm font-medium">
              Fim do almoço
            </label>
            <Input
              id="lunch_end_time"
              type="time"
              step="1"
              {...register("lunch_end_time")}
            />
            {errors.lunch_end_time && (
              <p className="text-sm font-medium text-destructive">
                {errors.lunch_end_time.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="slot_duration" className="text-sm font-medium">
            Duração do atendimento (minutos)
          </label>
          <Input
            id="slot_duration"
            type="number"
            {...register("slot_duration")}
          />
          {errors.slot_duration && (
            <p className="text-sm font-medium text-destructive">
              {errors.slot_duration.message}
            </p>
          )}
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mt-2">
            {errorMessage}
          </p>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            className="bg-gray-500 hover:bg-gray-600"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Criando..." : "Criar horário"}
          </Button>
        </div>
      </form>
    </div>
  );
}
