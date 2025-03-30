"use client";

import { useState, useEffect, use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetPasswordSchema } from "@/validation/authSchema";
import { confirmPasswordReset } from "@/lib/api/auth";

export default function ResetPasswordPage({ params }) {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  const resolvedParams = use(params);
  const { uid, token } = resolvedParams;

  useEffect(() => {
    if (!uid || !token) {
      toast.error("Link de recuperação inválido", {
        description: "Você será redirecionado para a página de login.",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setIsValid(true);
    }
  }, [uid, token, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      await confirmPasswordReset(uid, token, data.new_password);

      toast.success("Senha redefinida com sucesso!", {
        description: "Você será redirecionado para a página de login.",
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      toast.error("Erro ao redefinir senha", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  if (!isValid) {
    return null;
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
            Redefinir Senha
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new_password">Nova Senha</Label>
              <Input
                id="new_password"
                type="password"
                placeholder="Digite sua nova senha"
                {...register("new_password")}
              />
              {errors.new_password && (
                <p className="text-red-500 text-sm">{errors.new_password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirmar Nova Senha</Label>
              <Input
                id="confirm_password"
                type="password"
                placeholder="Confirme sua nova senha"
                {...register("confirm_password")}
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>
              )}
            </div>

            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Redefinindo..." : "Redefinir Senha"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            <Link href="/login" className="text-primary hover:underline">
              Voltar para o login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 