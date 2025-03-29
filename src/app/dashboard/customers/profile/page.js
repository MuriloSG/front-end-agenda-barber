"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getCustomerProfile, updateCustomerProfile } from "@/lib/api/customer";
import { UpdateCustomerSchema } from "@/validation/authSchema";

const cities = [{ value: "salinas_mg", label: "Salinas" }];

export default function Profile() {
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [originalAvatar, setOriginalAvatar] = useState(null);
  const [appointmentsCount, setAppointmentsCount] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UpdateCustomerSchema),
    defaultValues: {
      username: "",
      email: "",
      city: "",
      phone: "",
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getCustomerProfile();
        setValue("username", profile.username || "");
        setValue("email", profile.email || "");
        setValue(
          "city",
          cities.find((c) => c.label === profile.city)?.value || ""
        );
        setValue("phone", profile.whatsapp || "");
        if (profile.avatar) {
          setAvatarPreview(profile.avatar);
          setOriginalAvatar(profile.avatar);
        }
        setAppointmentsCount(profile.confirmed_appointments_count || 0);
      } catch (error) {
        toast.error("Erro ao carregar perfil: " + error.message);
      } finally {
        setIsLoadingProfile(false);
      }
    };
    loadProfile();
  }, [setValue]);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setAvatarFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("whatsapp", data.phone);

      if (avatarFile && avatarFile.name !== originalAvatar?.name) {
        formData.append("avatar_file", avatarFile);
      }

      await updateCustomerProfile(formData);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil: " + error.message);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-2 flex items-center justify-center">
      <div className="container max-w-2xl py-10">
        <Card>
          <CardHeader className="flex items-center justify-center">
            <CardDescription>
              Gerencie suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarPreview} alt="Avatar" />
                  <AvatarFallback className="text-lg">CC</AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="avatar"
                  className="absolute bottom-0 right-0 p-1 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4" />
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input id="username" {...register("username")} />
              {errors.username && (
                <p className="text-sm text-destructive">
                  {errors.username.message}
                </p>
              )}

              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register("email")}
                readOnly
                className="bg-muted"
              />

              <Label htmlFor="phone">WhatsApp</Label>
              <Input id="phone" {...register("phone")} />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}

              <Label htmlFor="city">Cidade</Label>
              <Select
                value={watch("city")}
                onValueChange={(value) => setValue("city", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma cidade" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                A cidade selecionada determina quais barbeiros serão exibidos na listagem
              </p>
              {errors.city && (
                <p className="text-sm text-destructive">
                  {errors.city.message}
                </p>
              )}

              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Total de Agendamentos</p>
                  <p className="text-2xl font-bold">{appointmentsCount}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Total de agendamentos para recompensas, quando conseguir uma recompensa sera zerado
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
