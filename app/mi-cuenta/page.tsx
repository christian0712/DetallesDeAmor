'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  User,
  Lock,
  QrCode,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  ArrowLeft,
  Copy,
  Check,
  KeyRound,
  LogOut,
  Trash2,
  MessageCircle,
  Mail,
  HelpCircle,
  Download,
  Printer
} from 'lucide-react';
import { findOrderByClientCodeOrPhone, deleteOrder } from '@/lib/store';
import { Order } from '@/types';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { exportPrintableQRCard } from '@/lib/qrCardExporter';

export default function MiCuentaPage() {
  const [userInput, setUserInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const query = userInput.trim() || phoneInput.trim();
    if (!query) {
      setErrorMsg('Por favor ingresa tu código de usuario o número de celular.');
      setIsLoading(false);
      return;
    }

    try {
      const match = await findOrderByClientCodeOrPhone(query);
      if (match) {
        setFoundOrder(match);
        setErrorMsg('');
      } else {
        setErrorMsg('No se encontró ningún espacio o publicación con ese Código o Número. Verifica tus datos.');
        setFoundOrder(null);
      }
    } catch (err) {
      console.error('Error logging in client:', err);
      setErrorMsg('Ocurrió un problema al consultar tus datos. Inténtalo nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDeleteMyOrder = () => {
    if (!foundOrder) return;
    if (
      confirm(
        '¿Estás seguro de que deseas eliminar tu pedido y publicación? Esta acción borrará permanentemente tus datos del sistema.'
      )
    ) {
      deleteOrder(foundOrder.id);
      setFoundOrder(null);
      setUserInput('');
      setPhoneInput('');
      setErrorMsg('Tu pedido ha sido eliminado correctamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0512] via-[#1a0826] to-[#0b0512] text-white p-4 sm:p-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-rose-600/20 blur-3xl pointer-events-none rounded-full" />

      <header className="max-w-4xl mx-auto flex items-center justify-between py-4 mb-6 sm:mb-8 relative z-10 px-2 sm:px-0 gap-2">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-rose-300 hover:text-white text-xs font-semibold transition shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className="hidden xs:inline">Volver al Inicio</span>
          <span className="xs:hidden">Inicio</span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500 animate-pulse shrink-0" />
          <span className="font-serif font-bold text-base sm:text-lg text-gradient-rose">DetallesDeAmor</span>
        </div>
      </header>

      <main className="max-w-xl mx-auto relative z-10">
        {!foundOrder ? (
          /* Client Login Portal */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card-rose rounded-3xl p-6 sm:p-8 border border-rose-500/30 shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-600 border border-rose-400/40 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-rose-600/30">
                <KeyRound className="w-7 h-7" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Acceso para Clientes
              </h1>
              <p className="text-xs sm:text-sm text-rose-200/70 mt-1">
                Ingresa tu **Código de Usuario** o celular registrado para ver tu **QR** y enlace a tu publicación.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-rose-400" />
                  Código de Usuario / Usuario Generado
                </label>
                <input
                  type="text"
                  placeholder="Ej: AMOR-7842 o Nombre de Pareja"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rose-400 uppercase tracking-wide font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  Número de Celular (Contraseña)
                </label>
                <input
                  type="tel"
                  placeholder="Ej: 77123456"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-xl shadow-rose-500/40 flex items-center justify-center gap-2 transition active:scale-95 mt-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Consultando en Sistema...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Iniciar Sesión & Ver Mi Espacio</span>
                  </>
                )}
              </button>
            </form>

            {/* Forgot User Code Assistance Section */}
            <div className="mt-6 pt-5 border-t border-rose-500/20 text-center space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-xs text-rose-300 font-semibold">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>¿Olvidaste tu Código de Usuario o Contraseña?</span>
              </div>
              <p className="text-[11px] text-rose-200/70 max-w-sm mx-auto">
                No te preocupes. Comunícate directamente con nuestro soporte por WhatsApp o correo para ayudarte a recuperar tu cuenta de inmediato.
              </p>

              <div className="flex flex-wrap justify-center items-center gap-2 pt-1 text-xs font-bold">
                <a
                  href="https://wa.me/59175949161?text=Hola!%20Olvid%C3%A9%20mi%20c%C3%B3digo%20de%20usuario%20o%20acceso%20para%20mi%20detalle"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md flex items-center gap-1.5 transition active:scale-95 border border-emerald-400/30"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>WhatsApp (75949161)</span>
                </a>

                <a
                  href="mailto:chris.dev.0712@gmail.com?subject=Recuperar%20c%C3%B3digo%20de%20usuario"
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-md flex items-center gap-1.5 transition active:scale-95 border border-rose-400/30"
                >
                  <Mail className="w-4 h-4 text-rose-200" />
                  <span>Enviar Correo</span>
                </a>

                <Link
                  href="/#contacto"
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 hover:text-white transition text-xs font-semibold"
                >
                  <span>Contáctanos 💬</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Logged In Client Workspace Dashboard */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card-rose rounded-3xl p-6 sm:p-8 border border-rose-500/40 shadow-2xl text-center space-y-6"
          >
            {/* Header info bar */}
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-4">
              <div className="text-left">
                <span className="text-[10px] uppercase font-mono tracking-wider text-rose-300/80 block">
                  Código de Cliente:
                </span>
                <span className="text-sm font-bold font-mono text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/40 inline-block mt-0.5">
                  {foundOrder.clientCode || foundOrder.id}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDeleteMyOrder}
                  className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                  title="Eliminar mi pedido"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>Eliminar Pedido</span>
                </button>

                <button
                  onClick={() => setFoundOrder(null)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold text-white">
                {foundOrder.coupleTitle}
              </h2>
              <p className="text-xs text-rose-200/70 mt-1">
                Remitente: {foundOrder.senderName} | Destinatario: {foundOrder.recipientName}
              </p>
            </div>

            {/* Status & Actions Card */}
            {foundOrder.status === 'APROBADO' ? (
              <div className="bg-emerald-950/60 p-6 rounded-2xl border border-emerald-500/40 space-y-5">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-300">
                    ¡Tu Espacio Romántico está ACTIVO! 🎉
                  </h3>
                  <p className="text-xs text-rose-200/80 mt-1">
                    Comparte este código QR o enlace directo para que tu pareja ingrese a su invitación.
                  </p>
                </div>

                {/* Hidden QR Canvas for high-res printable export */}
                <div className="hidden">
                  <QRCodeCanvas
                    id={`qr-canvas-client-${foundOrder.id}`}
                    value={
                      foundOrder.qrUrl ||
                      `${typeof window !== 'undefined' ? window.location.origin : ''}/p/${foundOrder.slug}`
                    }
                    size={400}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                {/* QR Code SVG Display */}
                <div className="w-48 h-48 bg-white p-3 rounded-2xl shadow-2xl mx-auto border-4 border-rose-500 flex items-center justify-center">
                  <QRCodeSVG
                    value={
                      foundOrder.qrUrl ||
                      `${typeof window !== 'undefined' ? window.location.origin : ''}/p/${foundOrder.slug}`
                    }
                    size={160}
                    level="H"
                  />
                </div>

                {/* Direct Redirection & Printable Export Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      exportPrintableQRCard(
                        foundOrder,
                        `qr-canvas-client-${foundOrder.id}`
                      )
                    }
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 hover:from-amber-600 hover:to-pink-700 text-white font-bold text-sm shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 transition active:scale-95 border border-amber-300/30"
                  >
                    <Printer className="w-4 h-4 text-white" />
                    <span>Exportar Tarjeta Romántica Imprimible (PNG) 🖨️</span>
                  </button>

                  <a
                    href={`/p/${foundOrder.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition active:scale-95"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Redireccionar Directo a Mi Publicación</span>
                  </a>

                  <button
                    onClick={() =>
                      handleCopyLink(
                        foundOrder.qrUrl ||
                          `${typeof window !== 'undefined' ? window.location.origin : ''}/p/${foundOrder.slug}`
                      )
                    }
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? '¡Enlace Copiado al Portapapeles!' : 'Copiar Enlace Directo'}</span>
                  </button>
                </div>
              </div>
            ) : foundOrder.status === 'PENDIENTE' ? (
              <div className="bg-amber-950/60 p-6 rounded-2xl border border-amber-500/40 space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 border border-amber-400 flex items-center justify-center mx-auto animate-pulse">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-amber-300">
                  Esperando Aprobación de Pago
                </h3>
                <p className="text-xs text-rose-200/80">
                  Tu comprobante está en revisión por el equipo de administración. Una vez aprobado, aparecerá aquí tu **Código QR Oficial** y enlace directo.
                </p>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/59177123456?text=Hola,%20quisiera%20consultar%20mi%20publicaci%C3%B3n%20con%20c%C3%B3digo%20${foundOrder.clientCode || foundOrder.id}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
                  >
                    <span>Acelerar Activación por WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-red-950/60 p-6 rounded-2xl border border-red-500/40 space-y-3">
                <XCircle className="w-8 h-8 text-red-400 mx-auto" />
                <h3 className="text-lg font-bold text-red-300">Pedido Rechazado</h3>
                <p className="text-xs text-rose-200/80">
                  Por favor contáctate con soporte técnico para resolver cualquier inconveniente.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}
