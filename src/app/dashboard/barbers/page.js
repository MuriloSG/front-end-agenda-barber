"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { getBarberStatistics } from "@/lib/api/barber";
import { Skeleton } from "@/components/skeletonDashboarbBarber/skeleton";
import { ErrorMesage } from "@/components/errorMessage/errorMessage";

export default function BarbersDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [statistic, setStatistic] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBarberStatistics();
        setStatistic(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Erro ao carregar os dados: ", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Skeleton />;
  }

  if (!statistic) {
    return (
      <ErrorMesage
        title="Algo deu errado"
        description="Não conseguimos carregar os dados no momento. Tente novamente mais"
      />
    );
  }

  return (
    <div className="space-y-6 mt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Início</h1>
        <div className="flex items-center gap-2">
          <span className="font-medium">{statistic.barber}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Agendamentos nos últimos 30 dias
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistic.last_30_days_stats.total_appointments}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                <span className="text-xs">
                  {statistic.last_30_days_stats.confirmed} confirmados
                </span>
              </div>
              <div className="flex items-center gap-1">
                <XCircle className="h-3 w-3 text-red-500" />
                <span className="text-xs">
                  {statistic.last_30_days_stats.canceled} cancelados
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Faturamento nos últimos 30 dias
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(statistic.last_30_days_stats.revenue)}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Total:{" "}
              {formatCurrency(
                statistic.financial_metrics.lifetime_gross_revenue
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Status dos Agendamentos
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Pendentes</span>
              <span className="font-medium">
                {statistic.last_30_days_stats.status_distribution.pending}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Confirmados</span>
              <span className="font-medium">
                {statistic.last_30_days_stats.status_distribution.confirmed}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Cancelados</span>
              <span className="font-medium">
                {statistic.last_30_days_stats.status_distribution.canceled}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Faturamento Total
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                statistic.financial_metrics.lifetime_gross_revenue
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Últimos 30 dias:{" "}
              {formatCurrency(statistic.financial_metrics.last_30_days_revenue)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximos Agendamentos (Hoje)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statistic.today_upcoming_appointments.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum agendamento para hoje
                </p>
              ) : (
                statistic.today_upcoming_appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center space-x-4"
                  >
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        appointment.status === "confirmed"
                          ? "bg-green-500"
                          : appointment.status === "canceled"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      )}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        {appointment.client || "Cliente não identificado"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.service}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.time}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Serviços Mais Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statistic.most_popular_services.map((service, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{service.service}</p>
                    <div className="w-full h-2 rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {service.appointments_count}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(service.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
