"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "@/validation/authSchema";
import { registerUser } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  async function registerSubmit(data) {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await registerUser(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 flex flex-col items-center">
          <div className="flex items-center justify-center mb-2">
            <Image
              src="/logoAgendaBarber.webp"
              alt="Logo da Barbearia"
              width={70}
              height={20}
              className="object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            Criar conta Agenda Barber
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(registerSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                placeholder="João Silva"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-between gap-1">
              <div className="space-y-2">
                <Label htmlFor="profile_type">Tipo de perfil</Label>
                <Controller
                  name="profile_type"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar perfil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="barbeiro">Barbeiro</SelectItem>
                        <SelectItem value="cliente">Cliente</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.profile_type && (
                  <p className="text-red-500 text-sm">
                    {errors.profile_type.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar cidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salinas_mg">Salinas - MG</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar conta"}
            </Button>

            {errorMessage && (
              <p className="text-red-500 text-sm text-center mt-2">
                {errorMessage}
              </p>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Entrar
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
