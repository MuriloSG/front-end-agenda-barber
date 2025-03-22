"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarPlus, Edit3, Trash2, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/skeletonWorkDay/skeleton";
import { ErrorMesage } from "@/components/errorMessage/errorMessage";
import { getBarberWorkDays } from "@/lib/api/barber";

export default function BarberSchedule() {
  const [workDays, setWorkDays] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

    fetchWorkDays();
  }, []);

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
      <div className="flex items-center justify-between flex-wrap gap-4">
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
        {workDays.map((day) => (
          <Card
            key={day.id}
            className="w-full transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-semibold text-primary">
                  {day.day_of_week_display}
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" className="h-8 w-8">
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
            <CardContent>
              {day.free_time_count <= 0 ? (
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Reativar horários
                </Button>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
