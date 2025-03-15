"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Scissors, Star, DollarSign } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a192f]">
      <Header />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/80 to-[#0a192f] z-0" />
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: 'url("/imagem_hero.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            <span className="text-blue-400">Agenda Barber</span>: Seu Estilo,
            Seu Tempo
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Gerencie seus agendamentos com facilidade. Clientes encontram os
            melhores barbeiros, e barbeiros organizam sua agenda sem
            complicações.
          </p>
          <Link href="/register">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-lg transition">
              Criar Conta
            </Button>
          </Link>
        </div>
      </section>

      <section id="services" className="py-20 bg-[#112240]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Serviços
          </h2>

          <h3 className="text-3xl font-semibold text-white mb-6 text-center">
            Para Clientes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 bg-[#1a2f4d] border-blue-800 text-white flex flex-col justify-between h-full">
              <Clock className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-xl font-bold mb-2">Agendamento Simples</h4>
              <p className="text-gray-300">
                Escolha seu barbeiro, serviço e horário em poucos cliques.
              </p>
            </Card>
            <Card className="p-6 bg-[#1a2f4d] border-blue-800 text-white flex flex-col justify-between h-full">
              <Star className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-xl font-bold mb-2">
                Vizualize os serviços e barbeiros da sua cidade
              </h4>
              <p className="text-gray-300">
                Com a nossa plataforma, você pode facilmente encontrar barbeiros
                qualificados e visualizar os serviços que eles oferecem, tudo na
                sua cidade. Agende seu corte de cabelo, barba ou outros serviços
                de forma prática e rápida, com apenas alguns cliques.
              </p>
            </Card>
          </div>

          <h3 className="text-3xl font-semibold text-white mb-6 text-center">
            Para Barbeiros
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-[#1a2f4d] border-blue-800 text-white flex flex-col justify-between h-full">
              <Scissors className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-xl font-bold mb-2">Gestão de Agendamentos</h4>
              <p className="text-gray-300">
                Controle sua agenda de forma prática e sem complicações.
              </p>
            </Card>
            <Card className="p-6 bg-[#1a2f4d] border-blue-800 text-white flex flex-col justify-between h-full">
              <DollarSign className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-xl font-bold mb-2">Aumente Seus Lucros</h4>
              <p className="text-gray-300">
                Reduza cancelamentos e otimize seus horários com nossa
                plataforma.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#0a192f] py-4">
        <div className="text-center text-gray-400 text-lg">
          © 2024 Barbearia. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
