'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  QrCode,
  Smartphone,
  Coins,
  Copy,
  Check,
  Upload,
  X,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  UserCheck,
  ZoomIn,
  Download,
} from 'lucide-react';
import { RomanticPageData, PaymentMethod, Order, PaymentMethodsConfig } from '@/types';
import { saveOrder, getPaymentConfig } from '@/lib/store';
import { uploadClientPhotoToSupabase } from '@/lib/supabase';
import { QRCodeSVG } from 'qrcode.react';

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageData: RomanticPageData;
  onSuccess: (order: Order) => void;
}

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  isOpen,
  onClose,
  pageData,
  onSuccess,
}) => {
  const [paymentConfig, setPaymentConfig] = useState<PaymentMethodsConfig>(getPaymentConfig());
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qr_bolivia');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [receiptFile, setReceiptFile] = useState<string | null>(null);
  const [receiptName, setReceiptName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isQrZoomed, setIsQrZoomed] = useState(false);

  const qrSvgRef = React.useRef<HTMLDivElement>(null);

  const handleDownloadQr = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (paymentConfig.qrBolivia?.qrImageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = paymentConfig.qrBolivia.qrImageUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 500;
        canvas.height = img.naturalHeight || 500;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const a = document.createElement('a');
          a.download = 'QR-Pago-Detalles-De-Amor.png';
          a.href = canvas.toDataURL('image/png');
          a.click();
        }
      };
      img.onerror = () => {
        const link = document.createElement('a');
        link.href = paymentConfig.qrBolivia?.qrImageUrl || '';
        link.download = 'QR-Pago-Detalles-De-Amor.png';
        link.target = '_blank';
        link.click();
      };
    } else if (qrSvgRef.current) {
      const svgElement = qrSvgRef.current.querySelector('svg');
      if (svgElement) {
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 20, 20, 360, 360);
            const a = document.createElement('a');
            a.download = 'QR-Pago-Detalles-De-Amor.png';
            a.href = canvas.toDataURL('image/png');
            a.click();
          };
          img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
        }
      }
    }
  };

  React.useEffect(() => {
    const updateConfig = () => {
      const config = getPaymentConfig();
      setPaymentConfig(config);
    };
    updateConfig();
    if (typeof window !== 'undefined') {
      window.addEventListener('payment-config-updated', updateConfig);
      return () => window.removeEventListener('payment-config-updated', updateConfig);
    }
  }, [isOpen]);

  const availableMethods = [
    { id: 'qr_bolivia', label: 'QR Bolivia', icon: QrCode, badge: 'Recomendado', enabled: paymentConfig.qrBolivia?.enabled },
    { id: 'bank_transfer', label: 'Bancos', icon: CreditCard, enabled: paymentConfig.bankTransfer?.enabled },
    { id: 'binance_pay', label: 'Binance & USDT', icon: Coins, enabled: paymentConfig.binancePay?.enabled },
  ].filter((m) => m.enabled !== false);

  React.useEffect(() => {
    if (availableMethods.length > 0 && !availableMethods.some(m => m.id === paymentMethod)) {
      setPaymentMethod(availableMethods[0].id as PaymentMethod);
    }
  }, [paymentConfig, paymentMethod]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsSubmitting(true);

    try {
      // Temporary code prefix for storage path
      const tempClientCode = `client-${Date.now().toString().slice(-4)}`;

      // 1. Upload photos to Supabase Storage if base64 or new files
      const updatedPhotos = await Promise.all(
        pageData.photos.map(async (photo, idx) => {
          if (photo.url && photo.url.startsWith('data:image')) {
            const uploadedUrl = await uploadClientPhotoToSupabase(
              photo.url,
              tempClientCode,
              `photo-${idx + 1}.jpg`
            );
            return { ...photo, url: uploadedUrl };
          }
          return photo;
        })
      );

      // 2. Upload receipt if base64
      let finalReceiptUrl = receiptFile || undefined;
      if (receiptFile && receiptFile.startsWith('data:image')) {
        finalReceiptUrl = await uploadClientPhotoToSupabase(
          receiptFile,
          tempClientCode,
          'receipt.jpg'
        );
      }

      const updatedPageData = { ...pageData, photos: updatedPhotos };

      const order = saveOrder(
        updatedPageData,
        phoneNumber,
        paymentMethod,
        finalReceiptUrl
      );

      setIsSubmitting(false);
      setCreatedOrder(order);
      onSuccess(order);
    } catch (err) {
      console.error('Error processing order submission:', err);
      // Fallback save
      const order = saveOrder(
        pageData,
        phoneNumber,
        paymentMethod,
        receiptFile || undefined
      );
      setIsSubmitting(false);
      setCreatedOrder(order);
      onSuccess(order);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-[#14081f] rounded-3xl p-6 sm:p-8 border border-rose-500/40 shadow-2xl text-white max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-rose-300 hover:text-white p-2 rounded-full hover:bg-rose-500/20 transition z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {!createdOrder ? (
          <div>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-2 border border-rose-500/30">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                <span>Pago Seguro & Activación por QR</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Finalizar Detalle Romántico
              </h3>
              <div className="text-rose-200/70 text-xs sm:text-sm mt-1">
                Total a pagar: <strong className="text-amber-400 font-bold text-base">{paymentConfig.priceBs || 49} Bs / {paymentConfig.priceUsdt} USDT</strong>
                <span className="block text-[11px] text-rose-300/80 mt-0.5 font-medium">✨ Incluye publicación online activa por 1 Año Completo</span>
              </div>
            </div>

            {/* Customization Details Summary & Warning */}
            <div className="mb-6 p-4 rounded-2xl bg-[#230d36] border border-rose-500/30 text-xs space-y-2">
              <div className="flex items-center justify-between font-semibold border-b border-rose-500/20 pb-2">
                <span className="text-rose-300 font-serif font-bold text-sm">Resumen de tu Detalle</span>
                <span className="text-[11px] text-amber-300 font-mono">
                  {pageData.photos?.length || 0} Fotos personalizadas
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-rose-200">
                <div>
                  <span className="text-rose-400 text-[10px] uppercase font-bold block">Para (Destinatario):</span>
                  <strong className="text-white font-bold">{pageData.recipientName}</strong>
                </div>
                <div>
                  <span className="text-rose-400 text-[10px] uppercase font-bold block">De (Remitente):</span>
                  <strong className="text-white font-bold">{pageData.senderName}</strong>
                </div>
              </div>

              {(pageData.senderName === 'Carlos' || pageData.recipientName === 'Sofía' || pageData.recipientName === 'Valeria') && (
                <div className="mt-3 p-3 rounded-xl bg-amber-950/80 border border-amber-500/60 text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">⚠️</span>
                    <div>
                      <strong className="block text-amber-300">¡Nombres por defecto detectados!</strong>
                      <span className="text-[11px] text-amber-200/80">Estás por pedir con los nombres de muestra ({pageData.senderName} & {pageData.recipientName}).</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs shrink-0 shadow transition"
                  >
                    🎨 Personalizar Ahora
                  </button>
                </div>
              )}
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {availableMethods.map((method) => {
                const Icon = method.icon;
                const active = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                    className={`relative p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                      active
                        ? 'bg-gradient-to-b from-rose-600/90 to-pink-700/90 border-rose-400 text-white shadow-lg shadow-rose-500/30 scale-105'
                        : 'bg-[#210d33] border-rose-500/20 text-rose-200/70 hover:bg-rose-900/30'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-rose-400'}`} />
                    <span>{method.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Method Details Box */}
            <div className="glass-card-rose rounded-2xl p-5 border border-rose-500/30 mb-6 space-y-4">
              {paymentMethod === 'qr_bolivia' && paymentConfig.qrBolivia && (
                <div className="text-center space-y-3">
                  <span className="text-xs text-rose-300 font-semibold block">
                    {paymentConfig.qrBolivia.instructions}
                  </span>
                  
                  {/* Clickable QR Code with Zoom & Ref */}
                  <div
                    ref={qrSvgRef}
                    onClick={() => setIsQrZoomed(true)}
                    className="mx-auto flex flex-col items-center justify-center cursor-pointer group relative"
                  >
                    {paymentConfig.qrBolivia.qrImageUrl ? (
                      <div className="relative p-2 bg-white rounded-2xl border-4 border-rose-500 shadow-xl max-w-[220px] group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105">
                        <img
                          src={paymentConfig.qrBolivia.qrImageUrl}
                          alt="QR Bolivia Oficial"
                          className="max-h-56 w-auto object-contain rounded-xl mx-auto"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-1 text-white text-xs font-bold backdrop-blur-[2px]">
                          <ZoomIn className="w-8 h-8 text-amber-300 animate-bounce" />
                          <span className="bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[11px] shadow font-extrabold">
                            Haz clic para ampliar 🔍
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-44 h-44 bg-white p-3 rounded-2xl shadow-xl border-4 border-rose-500 group-hover:border-amber-400 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                        <QRCodeSVG
                          value={paymentConfig.qrBolivia.qrValue || 'https://qr.simple.bo/pay/detalles-de-amor-49bs'}
                          size={150}
                          level="H"
                          includeMargin={false}
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-1 text-white text-xs font-bold backdrop-blur-[2px]">
                          <ZoomIn className="w-8 h-8 text-amber-300 animate-bounce" />
                          <span className="bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[11px] shadow font-extrabold">
                            Haz clic para ampliar 🔍
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* QR Action Buttons: Zoom & Download */}
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsQrZoomed(true)}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-bold text-xs flex items-center gap-1.5 border border-rose-500/30 transition shadow-sm"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ampliar QR</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadQr}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-500/40 transition shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Descargar QR</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-rose-200/80 font-mono">
                    Titular: {paymentConfig.qrBolivia.holder} | Monto: {paymentConfig.priceBs || 49}.00 Bs
                  </p>
                </div>
              )}

              {paymentMethod === 'bank_transfer' && paymentConfig.bankTransfer && (
                <div className="space-y-3 text-xs">
                  <p className="text-rose-200 font-semibold mb-2">
                    {paymentConfig.bankTransfer.instructions}
                  </p>

                  {paymentConfig.bankTransfer.accounts.map((acc, index) => (
                    <div key={acc.id || index} className="bg-[#240d38] p-3 rounded-xl border border-rose-500/20 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white block">{acc.bankName} {acc.accountType ? `(${acc.accountType})` : ''}</span>
                        <span className="text-rose-300 font-mono">N° Cuenta: {acc.accountNumber}</span>
                        {acc.accountHolder && (
                          <span className="text-[11px] text-rose-200/60 block">Titular: {acc.accountHolder}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleCopy(acc.accountNumber, acc.id || `acc-${index}`)}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1 shrink-0 ml-2"
                      >
                        {copiedText === (acc.id || `acc-${index}`) ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedText === (acc.id || `acc-${index}`) ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {paymentMethod === 'binance_pay' && paymentConfig.binancePay && (
                <div className="space-y-4 text-xs">
                  <div className="text-center pb-1">
                    <span className="text-xs text-rose-300 font-semibold">
                      Elige tu opción de pago en Criptomonedas (Monto: {paymentConfig.priceUsdt} USDT):
                    </span>
                  </div>

                  {/* Option 1: Binance Pay */}
                  {paymentConfig.binancePay.payId && (
                    <div className="bg-[#240d38] p-3.5 rounded-xl border border-amber-500/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                          <span>💎 Opción 1: Binance Pay ID</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(paymentConfig.binancePay.payId, 'binance_id')}
                          className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1"
                        >
                          {copiedText === 'binance_id' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedText === 'binance_id' ? 'Copiado' : 'Copiar Pay ID'}</span>
                        </button>
                      </div>
                      <div className="font-mono text-base font-bold text-white bg-[#190829] p-2 rounded-lg text-center border border-amber-500/20">
                        {paymentConfig.binancePay.payId}
                      </div>
                    </div>
                  )}

                  {/* Option 2: Crypto USDT Transfer */}
                  {paymentConfig.binancePay.usdtAddress && (
                    <div className="bg-[#240d38] p-3.5 rounded-xl border border-rose-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-300 text-xs flex items-center gap-1.5">
                          <span>🌐 Opción 2: Transferencia Cripto USDT</span>
                        </span>
                        <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                          Red: {paymentConfig.binancePay.network || 'BEP20'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-[#190829] p-2 rounded-lg border border-rose-500/20 gap-2">
                        <span className="text-rose-200 font-mono text-[11px] break-all">
                          {paymentConfig.binancePay.usdtAddress}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(paymentConfig.binancePay.usdtAddress, 'usdt_address')}
                          className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1 shrink-0"
                        >
                          {copiedText === 'usdt_address' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedText === 'usdt_address' ? 'Copiado' : 'Copiar Wallet'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Form Inputs: Phone & Receipt */}
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                  Tu Número de Celular (Será tu contraseña de cuenta) *
                </label>
                <input
                  type="tel"
                  placeholder="Ej: 77123456"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#28133b] border border-rose-500/40 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rose-400"
                  required
                />
                <span className="text-[11px] text-rose-300/70 mt-1 block">
                  Con este número podrás consultar el estado de tu pedido y acceder a la cuenta de la pareja.
                </span>
              </div>

              {/* Upload Receipt Optional */}
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-rose-400" />
                  Subir Comprobante de Pago (Opcional)
                </label>
                <div className="relative border-2 border-dashed border-rose-500/30 hover:border-rose-400 rounded-xl p-4 text-center bg-[#1c0a2a] transition cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {receiptName ? (
                    <div className="flex items-center justify-center gap-2 text-rose-300 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>{receiptName}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-rose-300/70">
                      <p className="font-semibold text-rose-200">Haz clic para adjuntar captura del pago</p>
                      <p className="text-[10px]">JPG, PNG o WEBP</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !phoneNumber}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-base shadow-xl shadow-rose-500/40 flex items-center justify-center gap-2 transition duration-300 disabled:opacity-50 mt-6"
              >
                {isSubmitting ? (
                  <span>Procesando Pedido...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Confirmar y Enviar Pedido</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen with Credentials Emphasis */
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400 text-green-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                ¡Comprobante Registrado con Éxito! 🎉
              </h3>
              <p className="text-rose-200/90 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Tu detalle para <strong className="text-white font-bold">{createdOrder.coupleTitle}</strong> fue enviado a administración para su revisión y aprobación.
              </p>
            </div>

            {/* HIGH-IMPACT CREDENTIALS BOX */}
            <div className="bg-gradient-to-br from-[#2a133a] via-[#1a0a28] to-[#2a133a] rounded-3xl p-5 border-2 border-amber-400/80 shadow-2xl text-left space-y-4 max-w-md mx-auto relative overflow-hidden">
              <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm sm:text-base border-b border-amber-500/30 pb-2.5">
                <Lock className="w-5 h-5 text-amber-400 animate-pulse shrink-0" />
                <span>¿CÓMO VER EL ESTADO DE TU PEDIDO? 🔑</span>
              </div>

              <p className="text-xs text-rose-100 font-light leading-relaxed">
                Para consultar si tu pedido ya fue aprobado o ver tu página/QR activo en cualquier momento, ingresa a la sección <strong className="text-amber-300 font-bold">"Mi Cuenta"</strong> utilizando tus credenciales de acceso:
              </p>

              {/* USER & PASSWORD DISPLAYED TOGETHER */}
              <div className="bg-[#12051f] p-4 rounded-2xl border border-amber-500/40 space-y-3 shadow-inner">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-rose-300/80 font-bold tracking-wider">👤 USUARIO:</span>
                  <span className="font-mono font-black text-amber-300 text-sm sm:text-base bg-amber-950/80 px-3 py-1 rounded-xl border border-amber-500/50 shadow-sm">
                    {createdOrder.clientCode || createdOrder.id}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-rose-500/20 pt-2.5">
                  <span className="text-xs text-rose-300/80 font-bold tracking-wider">🔑 CONTRASEÑA:</span>
                  <span className="font-mono font-black text-rose-200 text-sm sm:text-base bg-rose-950/80 px-3 py-1 rounded-xl border border-rose-500/50 shadow-sm">
                    {createdOrder.phoneNumber}
                  </span>
                </div>
              </div>

              <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-rose-300/80">
                  Estado: <strong className="text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded text-[11px] border border-amber-500/40">⏱️ PENDIENTE DE APROBACIÓN</strong>
                </span>
                <Link
                  href="/mi-cuenta"
                  onClick={onClose}
                  className="font-bold text-amber-300 hover:text-white underline flex items-center gap-1 transition"
                >
                  <span>Ir a Login Cliente</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={`https://wa.me/59175949161?text=Hola,%20acabo%20de%20enviar%20el%20comprobante%20de%20pago%20para%20el%20pedido%20${createdOrder.clientCode || createdOrder.id}%20de%20${encodeURIComponent(createdOrder.coupleTitle)}.`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30 transition border border-emerald-300/30"
              >
                <span>Acelerar aprobación por WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-rose-200 font-semibold text-sm transition border border-rose-500/30"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Lightbox Modal for Enlarged QR View */}
      <AnimatePresence>
        {isQrZoomed && (
          <div
            onClick={() => setIsQrZoomed(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="relative max-w-lg w-full bg-[#1b0829] p-6 sm:p-8 rounded-3xl border-2 border-rose-500 shadow-2xl text-center space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsQrZoomed(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-rose-600 text-white transition border border-rose-500/40"
              >
                <X className="w-6 h-6" />
              </button>

              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block font-mono mb-1">
                  📲 Escanear Código QR de Pago
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Monto a pagar: {paymentConfig.priceBs || 49}.00 Bs
                </h4>
                <p className="text-xs text-rose-200/80 mt-1 font-mono">
                  Titular: {paymentConfig.qrBolivia?.holder || 'Detalles de Amor SRL'}
                </p>
              </div>

              {/* Large Zoomed QR Code */}
              <div className="w-72 h-72 sm:w-80 sm:h-80 bg-white p-4 rounded-3xl border-4 border-rose-500 shadow-2xl flex items-center justify-center mx-auto">
                {paymentConfig.qrBolivia?.qrImageUrl ? (
                  <img
                    src={paymentConfig.qrBolivia.qrImageUrl}
                    alt="QR Bolivia Ampliado"
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <QRCodeSVG
                    value={paymentConfig.qrBolivia?.qrValue || 'https://qr.simple.bo/pay/detalles-de-amor-49bs'}
                    size={260}
                    level="H"
                    includeMargin={false}
                  />
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadQr}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-amber-950 font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 border border-amber-300 transition"
                >
                  <Download className="w-5 h-5" />
                  <span>Descargar Código QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsQrZoomed(false)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-rose-200 font-semibold text-sm transition border border-rose-500/30"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
