"use client";
import { toast } from "sonner";
import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workDaySchemaUpdate } from "@/validation/workDaySchema";
import { useRouter } from "next/navigation";
import { getWorkDay, updateWorkDay } from "@/lib/api/barber";

export default function Edit({ params }) {
  const { id } = use(params);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(workDaySchemaUpdate),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchWorkDay() {
      try {
        const data = await getWorkDay(id);
        setValue("start_time", data.start_time);
        setValue("end_time", data.end_time);
        setValue("lunch_start_time", data.lunch_start_time);
        setValue("lunch_end_time", data.lunch_end_time);
        setValue("slot_duration", data.slot_duration);
      } catch (error) {
        toast.error("Erro ao carregar os dados do horário de trabalho.");
      } finally {
        setLoadingData(false);
      }
    }
    fetchWorkDay();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await updateWorkDay(id, data);
      toast.success("Horário de trabalho atualizado com sucesso!");
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
      {loadingData ? (
        <div className="text-center text-gray-500">
          Carregando dados do dia de trabalho...
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-6">
            Editar Horário de Trabalho
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <label
                  htmlFor="lunch_start_time"
                  className="text-sm font-medium"
                >
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
                {...register("slot_duration", { valueAsNumber: true })}
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
                {loading ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
