'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, Play, Eye, Flame, Gift, Star, CheckCircle, Lock, User } from 'lucide-react';
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
          <span>Login Cliente / Mi Cuenta</span>
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
              Selecciona una plantilla y comienza a editarla de inmediato.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableTemplates.map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card-rose rounded-3xl overflow-hidden shadow-2xl border border-rose-500/30 group hover:border-rose-500/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={template.thumbnailUrl}
                      alt={template.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#180a24] via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-rose-600/90 text-white font-bold text-xs shadow-lg backdrop-blur-md border border-white/20">
                        {template.tag}
                      </span>
                    </div>

                    {template.popular && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-extrabold text-xs shadow-lg flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-950" />
                          Más Elegido
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-serif text-white mb-2 group-hover:text-rose-300 transition">
                      {template.title}
                    </h3>
                    <p className="text-rose-200/70 text-sm leading-relaxed mb-4">
                      {template.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-1.5 mb-6 text-xs text-rose-300/80">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Sobre 3D interactivo con sello de cera</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Contador de tiempo en años, meses y días</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Botón interactivo con lluvia masiva de corazones</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0">
                  <Link
                    href={template.demoUrl}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition duration-300 active:scale-95"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver y Personalizar Diseño</span>
                  </Link>
                </div>
              </motion.div>
            ))}
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
