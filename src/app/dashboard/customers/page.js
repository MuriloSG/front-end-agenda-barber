"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search,
  Star,
  StarHalf,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getBarbers, getBarberWorkDays, getSlotsByWorkDay, getBarberServices, createAppointment } from "@/lib/api/customer";
import { submitRating as submitRatingApi } from "@/lib/api/auth";
import Cookies from "js-cookie";
import Image from "next/image";
import { toast } from "sonner";
import { Skeleton } from "@/components/skeletonDashboardCustomer/skeleton";
import { formatCurrency, formatTime } from "@/lib/utils";

export default function CustomersPage() {
  const [barbers, setBarbers] = useState([]);
  const [filteredBarbers, setFilteredBarbers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [workDays, setWorkDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingBarber, setRatingBarber] = useState(null);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [schedulingDialogOpen, setSchedulingDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    const fetchBarbers = async () => {
      setIsLoading(true);
      try {
        const data = await getBarbers();
        if (data && data.length > 0) {
          setBarbers(data);
          setFilteredBarbers(data);
        } else {
          setBarbers([]);
          setFilteredBarbers([]);
        }
      } catch (error) {
        toast.error("Erro ao carregar os barbeiros", {
          description: error.message,
        });
        setBarbers([]);
        setFilteredBarbers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBarbers();
  }, []);

  useEffect(() => {
    const searchBarbers = async () => {
      if (!searchTerm.trim()) {
        setFilteredBarbers(barbers);
        return;
      }

      setIsSearching(true);
      try {
        const data = await getBarbers(searchTerm);
        setFilteredBarbers(data);
      } catch (error) {
        toast.error("Erro ao buscar barbeiros", {
          description: error.message,
        });
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(() => {
      searchBarbers();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, barbers]);

  const handleBarberSelect = async (barber) => {
    setSelectedBarber(barber);
    setIsLoadingServices(true);
    try {
      const servicesData = await getBarberServices(barber.id);
      setSelectedBarber(prev => ({...prev, services: servicesData}));
      setShowServices(true);
    } catch (error) {
      toast.error("Erro ao carregar os serviços do barbeiro", {
        description: error.message,
      });
    } finally {
      setIsLoadingServices(false);
    }
  };

  const handleServiceSelect = async (service) => {
    setSelectedService(service);
    setIsLoadingSlots(true);
    try {
      const data = await getBarberWorkDays(selectedBarber.id);
      setWorkDays(data);
      setSchedulingDialogOpen(true);
    } catch (error) {
      toast.error("Erro ao carregar os dias de trabalho", {
        description: error.message,
      });
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleDaySelect = async (day) => {
    setSelectedDay(day);
    setIsLoadingSlots(true);
    try {
      const data = await getSlotsByWorkDay(day.id);
      setTimeSlots(data);
    } catch (error) {
      toast.error("Erro ao carregar os horários disponíveis", {
        description: error.message,
      });
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleSchedule = async () => {
    if (!selectedBarber || !selectedDay || !selectedSlot || !selectedService) {
      return;
    }

    setIsScheduling(true);
    try {
      const user = JSON.parse(Cookies.get("user"));
      const appointment = await createAppointment(
        selectedService.id,
        selectedSlot.id,
        selectedBarber.id,
        user.id
      );

      setAppointmentDetails({
        barber: selectedBarber.username,
        service: selectedService.name,
        date: selectedDay.day_of_week_display,
        time: formatTime(selectedSlot.time),
        price: appointment.price,
        whatsapp: selectedBarber.whatsapp,
        pix_key: selectedBarber.pix_key,
        is_free: appointment.is_free,
      });

      setConfirmationDialogOpen(true);
      setSelectedBarber(null);
      setSelectedService(null);
      setSelectedDay(null);
      setSelectedSlot(null);
      setWorkDays([]);
      setTimeSlots([]);
      setShowServices(false);
      setSchedulingDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao criar o agendamento", {
        description: error.message,
      });
    } finally {
      setIsScheduling(false);
    }
  };

  const handleRating = async (barber) => {
    setRatingBarber(barber);
    setRatingDialogOpen(true);
  };

  const submitRating = async () => {
    setIsSubmittingRating(true);
    try {
      await submitRatingApi({
        barber_id: ratingBarber.id,
        rating: selectedRating
      });

      const updatedBarbers = barbers.map((barber) => {
        if (barber.id === ratingBarber.id) {
          const newTotalRatings = barber.totalRatings + 1;
          const newRating =
            (barber.rating * barber.totalRatings + selectedRating) /
            newTotalRatings;
          return {
            ...barber,
            rating: newRating,
            totalRatings: newTotalRatings,
          };
        }
        return barber;
      });
      setBarbers(updatedBarbers);
      setFilteredBarbers(updatedBarbers);
      toast.success("Avaliação enviada com sucesso!");
    } catch (error) {
      toast.error(`${error.message}`);
    } finally {
      setIsSubmittingRating(false);
      setRatingDialogOpen(false);
      setSelectedRating(0);
      setRatingBarber(null);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarHalf
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  if (isLoading) {
    return <Skeleton />;
  }

  if (showServices && selectedBarber) {
    return (
      <div className="space-y-6 p-6 mt-10">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setShowServices(false);
              setSelectedBarber(null);
            }}
          >
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">
            Serviços - {selectedBarber.username}
          </h1>
        </div>

        {isLoadingServices ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video w-full animate-pulse bg-muted" />
                <CardHeader>
                  <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="mt-2 h-4 w-full animate-pulse rounded bg-muted" />
                </CardHeader>
                <CardFooter>
                  <div className="h-8 w-24 animate-pulse rounded bg-muted" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : selectedBarber.services?.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedBarber.services.map((service) => (
              <Card
                key={service.id}
                className="overflow-hidden cursor-pointer transition-transform hover:scale-105 p-0"
                onClick={() => handleServiceSelect(service)}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={400}
                    height={225}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pb-2">
                  <span className="text-2xl font-bold">
                    {formatCurrency(service.price)}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg text-gray-500">
              Nenhum serviço disponível para este barbeiro.
            </p>
          </div>
        )}

        <Dialog
          open={schedulingDialogOpen}
          onOpenChange={setSchedulingDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agendar {selectedService?.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {isLoadingSlots ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p className="text-sm text-gray-500">Carregando horários disponíveis...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <h4 className="font-medium">Selecione o dia</h4>
                    {workDays.length > 0 ? (
                      <Select
                        value={selectedDay?.id?.toString()}
                        onValueChange={(value) => {
                          const day = workDays.find(
                            (d) => d.id.toString() === value
                          );
                          handleDaySelect(day);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha um dia" />
                        </SelectTrigger>
                        <SelectContent>
                          {workDays.map((day) => (
                            <SelectItem key={day.id} value={day.id.toString()}>
                              {day.day_of_week_display}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Nenhum dia de trabalho disponível.
                      </p>
                    )}
                  </div>

                  {selectedDay && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Selecione o horário</h4>
                      {timeSlots.length > 0 ? (
                        <Select
                          value={selectedSlot?.id?.toString()}
                          onValueChange={(value) => {
                            const slot = timeSlots.find(
                              (s) => s.id.toString() === value
                            );
                            setSelectedSlot(slot);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha um horário" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot.id} value={slot.id.toString()}>
                                {formatTime(slot.time)}h
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Nenhum horário disponível para este dia.
                        </p>
                      )}
                    </div>
                  )}

                  <Button
                    onClick={handleSchedule}
                    disabled={!selectedSlot || isScheduling}
                    className="mt-4"
                  >
                    {isScheduling ? "Agendando..." : "Confirmar Agendamento"}
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 mt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Barbeiros</h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Buscar por nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            disabled={isSearching}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
        </div>
      </div>

      {isSearching ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex flex-col">
              <div className="flex items-center gap-4 p-6">
                <div className="h-20 w-20 animate-pulse rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 animate-pulse rounded-md bg-muted" />
                  <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <div
                        key={j}
                        className="h-4 w-4 animate-pulse rounded-full bg-muted"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <CardFooter className="flex gap-2">
                <div className="h-10 flex-1 animate-pulse rounded-md bg-muted" />
                <div className="h-10 w-20 animate-pulse rounded-md bg-muted" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredBarbers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBarbers.map((barber) => (
            <Card key={barber.id} className="flex flex-col">
              <div className="flex items-center gap-4 p-6">
                <div className="h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={barber.avatar}
                    alt={barber.username}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{barber.username}</h3>
                  <p className="text-sm text-gray-500">{barber.city}</p>
                  <div className="mt-2 flex items-center gap-1">
                    {renderStars(barber.average_rating)}
                    <span className="ml-2 text-sm text-gray-500">
                      ({barber.total_ratings})
                    </span>
                  </div>
                </div>
              </div>
              <CardFooter className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleBarberSelect(barber)}
                >
                  Agendar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleRating(barber)}
                >
                  Avaliar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg text-gray-500">
            {searchTerm
              ? "Nenhum barbeiro encontrado com este nome."
              : "Nenhum barbeiro disponível no momento."}
          </p>
        </div>
      )}

      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Avaliar {ratingBarber?.username}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {isSubmittingRating ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-gray-500">Enviando avaliação...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant="ghost"
                      size="sm"
                      className="p-0 hover:bg-transparent"
                      onClick={() => setSelectedRating(rating)}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          rating <= selectedRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </Button>
                  ))}
                </div>
                <Button
                  onClick={submitRating}
                  disabled={!selectedRating || isSubmittingRating}
                  className="mt-6 w-full"
                >
                  {isSubmittingRating ? "Enviando..." : "Enviar Avaliação"}
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog 
        open={confirmationDialogOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setConfirmationDialogOpen(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agendamento Confirmado!</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {appointmentDetails?.is_free && appointmentDetails?.price === 0 ? (
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <p className="text-green-700 font-medium">
                    🎉 Parabéns! Este agendamento é uma recompensa pelos seus agendamentos anteriores!
                  </p>
                </div>
              ) : null}
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Barbeiro:</span>
                    <span className="font-medium">{appointmentDetails?.barber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Serviço:</span>
                    <span className="font-medium">{appointmentDetails?.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Data:</span>
                    <span className="font-medium">{appointmentDetails?.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Horário:</span>
                    <span className="font-medium">{appointmentDetails?.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Valor:</span>
                    <span className="font-medium">
                      {appointmentDetails?.is_free && appointmentDetails?.price === 0 
                        ? "Gratuito (Recompensa)" 
                        : formatCurrency(appointmentDetails?.price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">WhatsApp:</span>
                    <span className="font-medium">{appointmentDetails?.whatsapp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Chave PIX:</span>
                    <span className="font-medium">{appointmentDetails?.pix_key}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => {
                    const message = `Olá ${appointmentDetails?.barber}! Gostaria de confirmar meu agendamento:\n\nServiço: ${appointmentDetails?.service}\nData: ${appointmentDetails?.date}\nHorário: ${appointmentDetails?.time}\nValor: ${appointmentDetails?.is_free && appointmentDetails?.price === 0 ? "Gratuito (Recompensa)" : formatCurrency(appointmentDetails?.price)}\n\n${appointmentDetails?.is_free && appointmentDetails?.price === 0 ? "" : `Chave PIX para pagamento: ${appointmentDetails?.pix_key}`}`;
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/${appointmentDetails?.whatsapp}?text=${encodedMessage}`, '_blank');
                  }}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Enviar para WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setConfirmationDialogOpen(false)}
                  className="w-full"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
