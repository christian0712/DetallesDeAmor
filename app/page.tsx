'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, Play, Eye, Flame, Gift, Star, CheckCircle, Lock, User, Crown, Clock } from 'lucide-react';
import { availableTemplates } from '@/lib/defaultData';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0512] via-[#1a0826] to-[#0b0512] text-white relative overflow-hidden">
      
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-rose-600/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-pink-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Navigation Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/40">
            <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
          </div>
          <span className="font-serif font-bold text-xl md:text-2xl text-gradient-rose tracking-wide">
            DetallesDeAmor
          </span>
        </div>

        <Link
          href="/mi-cuenta"
          className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 hover:text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition backdrop-blur-md shadow-lg"
        >
          <User className="w-4 h-4 text-rose-400" />
          <span>Mi Cuenta</span>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs md:text-sm font-semibold mb-6 backdrop-blur-md"
          >
            <Flame className="w-4 h-4 text-rose-400 fill-rose-400 animate-bounce" />
            <span>Tendencia N° 1 en TikTok e Instagram para Novios</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif font-extrabold leading-tight text-white mb-6"
          >
            Sorprende a tu Pareja con una{' '}
            <span className="text-gradient-rose font-cursive text-5xl sm:text-7xl block sm:inline mt-2 sm:mt-0">
              Página Web Romántica
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-rose-200/80 text-base sm:text-xl leading-relaxed mb-8 font-light"
          >
            Elige el diseño que más te guste, edita los nombres, fotos y fechas en tiempo real y regala una experiencia única llena de animaciones, música y lluvia de corazones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-lg shadow-xl shadow-rose-500/40 hover:shadow-rose-500/60 transform hover:scale-105 transition duration-300 flex items-center gap-3 border border-rose-300/30"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Explorar "Sobre de Amor"</span>
            </Link>
          </motion.div>
        </div>

        {/* Templates Showcase Grid */}
        <section className="mt-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
              Galería de Diseños Exclusivos ✨
            </h2>
            <p className="text-rose-200/70 text-sm sm:text-base">
              Selecciona una plantilla para personalizarla o solicita un diseño 100% a la medida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. SOBRE DE AMOR ANIMADO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card-rose rounded-3xl overflow-hidden shadow-2xl border border-rose-500/30 group hover:border-rose-500/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={availableTemplates[0].thumbnailUrl}
                    alt={availableTemplates[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180a24] via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-rose-600/90 text-white font-bold text-xs shadow-lg backdrop-blur-md border border-white/20">
                      {availableTemplates[0].tag}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-rose-500/90 text-white font-extrabold text-xs shadow-lg border border-white/20">
                      49 Bs
                    </span>
                    {availableTemplates[0].popular && (
                      <span className="px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-extrabold text-xs shadow-lg flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-950" />
                        Más Elegido
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-white mb-2 group-hover:text-rose-300 transition">
                    {availableTemplates[0].title}
                  </h3>
                  <p className="text-rose-200/70 text-sm leading-relaxed mb-4">
                    {availableTemplates[0].description}
                             <div className="space-y-2 mb-6 text-xs text-rose-300/90">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Sobre 3D interactivo con sello de cera que se abre</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Contador de aniversario en vivo (Años, Meses, Días)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Carrusel interactivo de fotos con descripciones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Carta de amor romántica + Pregunta con lluvia de corazones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Línea del tiempo con 3 fechas y momentos inolvidables</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-rose-200 bg-rose-500/10 px-2.5 py-1.5 rounded-xl border border-rose-500/20 mt-3">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                      <span>Publicación online por <strong>1 Año Completo</strong></span>
                    </div>
                  </div>
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={availableTemplates[0].demoUrl}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition duration-300 active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver y Personalizar</span>
                </Link>
              </div>
            </motion.div>

            {/* 2. GALAXIA DE RECUERDOS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card-rose rounded-3xl overflow-hidden shadow-2xl border border-rose-500/30 group hover:border-rose-500/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={availableTemplates[1].thumbnailUrl}
                    alt={availableTemplates[1].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180a24] via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-rose-600/90 text-white font-bold text-xs shadow-lg backdrop-blur-md border border-white/20">
                      {availableTemplates[1].tag}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-rose-500/90 text-white font-extrabold text-xs shadow-lg border border-white/20">
                      49 Bs
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-white mb-2 group-hover:text-rose-300 transition">
                    {availableTemplates[1].title}
                  </h3>
                  <p className="text-rose-200/70 text-sm leading-relaxed mb-4">
                    {availableTemplates[1].description}
                  </p>

                  <div className="space-y-2 mb-6 text-xs text-rose-300/90">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Fondo galáctico 3D con Partículas Estelares y Núcleo Cósmico</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Mapa de Constelaciones de Amor (Razones por las que te amo)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Grid de 5 fotos estelares flotantes en el universo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Carta de amor interestelar bajo un manto estelar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Cápsula de Estrellas Fugaces con deseos + Pregunta Supernova</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-rose-200 bg-rose-500/10 px-2.5 py-1.5 rounded-xl border border-rose-500/20 mt-3">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                      <span>Publicación online por <strong>1 Año Completo</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={availableTemplates[1].demoUrl}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition duration-300 active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver y Personalizar</span>
                </Link>
              </div>
            </motion.div>

            {/* 3. TARJETA DORADA PERSONALIZADA VIP (99 Bs) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/80 bg-gradient-to-b from-[#2a1d0d] via-[#1d1206] to-[#120a02] group hover:border-amber-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* VIP Thumbnail Header Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
                    alt="Servicio VIP Personalizado 99 Bs"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a1d0d] via-amber-950/40 to-transparent" />
                  <div className="absolute top-3 right-3 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 font-extrabold text-xs shadow-xl">
                    99 Bs VIP
                  </div>
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/60 text-amber-300 text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
                    <span>Diseño Exclusivo A Medida</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold font-serif text-amber-200 mb-2">
                    Diseño 100% A Tu Gusto 👑
                  </h3>
                  <p className="text-amber-100/70 text-sm leading-relaxed mb-4">
                    ¿Quieres una plantilla exclusiva o con detalles únicos? Nuestro equipo la crea para ti.
                  </p>

                  <div className="space-y-2 mb-6 text-xs text-amber-200/90">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Elegimos tus colores, canciones y estilo preferido</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Agregamos fotos ilimitadas y secciones personalizadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Atención directa por WhatsApp para armar tu pedido</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-amber-200 bg-amber-500/10 px-2.5 py-1.5 rounded-xl border border-amber-500/20 mt-3">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                      <span>Entrega rápida en <strong>menos de 24 horas</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href="https://wa.me/59178945612?text=Hola,%20quisiera%20solicitar%20el%20servicio%20VIP%20Personalizado%20(99bs)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition duration-300 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pedir Diseño VIP por WhatsApp</span>
                </a>
              </div>
            </motion.div>

            {/* 4. ÁLBUM POLAROID VINTAGE & VINILO (SEGUNDA FILA) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card-rose rounded-3xl overflow-hidden shadow-2xl border border-rose-500/30 group hover:border-rose-500/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={availableTemplates[2].thumbnailUrl}
                    alt={availableTemplates[2].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180a24] via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-rose-600/90 text-white font-bold text-xs shadow-lg backdrop-blur-md border border-white/20">
                      {availableTemplates[2].tag}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-rose-500/90 text-white font-extrabold text-xs shadow-lg border border-white/20">
                      49 Bs
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-white mb-2 group-hover:text-rose-300 transition">
                    {availableTemplates[2].title}
                  </h3>
                  <p className="text-rose-200/70 text-sm leading-relaxed mb-4">
                    {availableTemplates[2].description}
                  </p>

                  <div className="space-y-2 mb-6 text-xs text-rose-300/90">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Tocadiscos de Disco Vinilo animado de 33 RPM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Proyector de Diapositivas Retro View-Master 3D interactivo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Galería de fotos Polaroid artesanal con sellos postales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Carta manuscrita en pergamino a máquina de escribir</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Cofre Secreto Vintage con Candado de Llave Dorada 🗝️</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-rose-200 bg-rose-500/10 px-2.5 py-1.5 rounded-xl border border-rose-500/20 mt-3">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                      <span>Publicación online por <strong>1 Año Completo</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={availableTemplates[2].demoUrl}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition duration-300 active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver y Personalizar</span>
                </Link>
              </div>
            </motion.div>

            {/* 5. CAJA DE REGALO 3D & VALES DE AMOR (PLANTILLA 4) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-card-rose rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 group hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={availableTemplates[3].thumbnailUrl}
                    alt={availableTemplates[3].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180a24] via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-white font-bold text-xs shadow-lg backdrop-blur-md border border-white/20">
                      {availableTemplates[3].tag}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-rose-500/90 text-white font-extrabold text-xs shadow-lg border border-white/20">
                      49 Bs
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-white mb-2 group-hover:text-emerald-300 transition">
                    {availableTemplates[3].title}
                  </h3>
                  <p className="text-rose-200/70 text-sm leading-relaxed mb-4">
                    {availableTemplates[3].description}
                  </p>

                  <div className="space-y-2 mb-6 text-xs text-emerald-200/90">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Talonario de 4 Cupones / Vales de Amor canjeables</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>3 Cajas Misteriosas Unboxing por abrir con confeti</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Mural de 5 fotos colgadas de luces LED brillante</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Boleto Raspa y Gana con premio secreto + Fuegos Artificiales</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-rose-200 bg-emerald-500/10 px-2.5 py-1.5 rounded-xl border border-emerald-500/20 mt-3">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                      <span>Publicación online por <strong>1 Año Completo</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={availableTemplates[3].demoUrl}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition duration-300 active:scale-95 border border-emerald-300/30"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver y Personalizar</span>
                </Link>
              </div>
            </motion.div>

            {/* 6. PRÓXIMAMENTE / NUEVO DISEÑO EN CAMINO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card-rose rounded-3xl overflow-hidden shadow-2xl border border-rose-500/20 opacity-90 group hover:border-pink-500/40 transition-all duration-300 flex flex-col justify-between relative bg-gradient-to-b from-[#1a0b29] to-[#0f051c]"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-tr from-purple-950 to-pink-950 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80"
                    alt="Próximamente"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-40 blur-[1px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f051c] via-purple-950/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-pink-600/90 text-white font-bold text-xs shadow-lg backdrop-blur-md border border-white/20 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-pink-200" />
                      Próximamente 🚀
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-pink-200 mb-2">
                    Nuevo Diseño Sorpresa ✨
                  </h3>
                  <p className="text-rose-200/60 text-sm leading-relaxed mb-4">
                    Estamos creando una nueva plantilla interactiva llena de magia y efectos especiales para sorprender a tu pareja.
                  </p>

                  <div className="space-y-1.5 mb-6 text-xs text-rose-300/60">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      <span>Efectos sorpresa de aniversario</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      <span>Nuevas animaciones interactivas</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="w-full py-3.5 rounded-2xl bg-white/5 border border-rose-500/20 text-rose-300/70 font-semibold text-xs flex items-center justify-center gap-2 cursor-not-allowed">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span>Próximamente (En Desarrollo)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-rose-500/20 py-8 text-center text-xs text-rose-300/60 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="font-semibold text-rose-200">Detalles de Amor</span>
          </div>
          <p>© 2026 Detalles de Amor — Páginas Románticas e Invitaciones Especiales.</p>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-white border border-rose-500/30 transition text-xs font-semibold shadow-sm"
          >
            <Lock className="w-3.5 h-3.5 text-rose-400" />
            <span>Acceso Admin</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
