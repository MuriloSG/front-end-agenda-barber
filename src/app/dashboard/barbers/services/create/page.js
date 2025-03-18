"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "@/validation/serviceSchema";
import Image from "next/image";
import { createService } from "@/lib/api/barber";
import { useRouter } from "next/navigation";

export default function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceSchema),
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function onSubmit(data) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);

    if (imageFile) {
      formData.append("service_img", imageFile);
    }

    try {
      setLoading(true);
      const response = await createService(formData);
      setErrorMessage("");
      toast.success("Serviço criado com sucesso!");
      router.push("/dashboard/barbers/services");
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(`Erro: ${error.message}`); 
    } finally {
      setLoading(false);
    }
  };

   const handleCancel = () => {
     router.push("/dashboard/barbers/services");
   };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Criar Novo Serviço</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" {...register("name")} className="mt-1" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea
            id="descricao"
            {...register("description")}
            className="mt-1"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="preco">Preço</Label>
          <Input
            id="preco"
            type="number"
            {...register("price")}
            className="mt-1"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="imagem">Imagem</Label>
          <Input
            type="file"
            id="imagem"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
          {imagePreview && (
            <div className="flex justify-center mt-2">
              <Image
                src={imagePreview}
                alt="Preview"
                className="max-w-full h-auto"
                width={100}
                height={100}
              />
            </div>
          )}
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mt-2">
            {errorMessage}
          </p>
        )}

        <div className="flex gap-4 mt-6">
          <Button
            type="button"
            className="bg-gray-500 hover:bg-gray-600"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Carregando..." : "Criar Serviço"}
          </Button>
        </div>
      </form>
    </div>
  );
}
