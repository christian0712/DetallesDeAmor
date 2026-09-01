'use client';

import React, { useState } from 'react';
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
  UserCheck
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
    { id: 'tigo_money', label: 'Tigo Money', icon: Smartphone, enabled: paymentConfig.tigoMoney?.enabled },
    { id: 'binance_pay', label: 'Binance Pay', icon: Coins, enabled: paymentConfig.binancePay?.enabled },
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
              <p className="text-rose-200/70 text-xs sm:text-sm mt-1">
                Total a pagar: <strong className="text-amber-400 font-bold text-base">{paymentConfig.priceBs} Bs / {paymentConfig.priceUsdt} USDT</strong>
              </p>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
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
                  
                  {/* Generated QR visual preview */}
                  <div className="w-44 h-44 bg-white p-3 rounded-2xl shadow-xl mx-auto flex items-center justify-center border-4 border-rose-500">
                    <QRCodeSVG
                      value={paymentConfig.qrBolivia.qrValue || 'https://qr.simple.bo/pay/detalles-de-amor-49bs'}
                      size={150}
                      level="H"
                      includeMargin={false}
                    />
                  </div>

                  <p className="text-[11px] text-rose-200/80 font-mono">
                    Titular: {paymentConfig.qrBolivia.holder} | Monto: {paymentConfig.priceBs}.00 Bs
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

              {paymentMethod === 'tigo_money' && paymentConfig.tigoMoney && (
                <div className="space-y-3 text-xs text-center">
                  <p className="text-rose-200 font-semibold">
                    {paymentConfig.tigoMoney.instructions}
                  </p>

                  <div className="bg-[#240d38] p-4 rounded-xl border border-rose-500/30 inline-flex items-center gap-4">
                    <span className="text-xl font-bold font-mono text-amber-400">{paymentConfig.tigoMoney.phoneNumber}</span>
                    <button
                      onClick={() => handleCopy(paymentConfig.tigoMoney.phoneNumber, 'tigo')}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1"
                    >
                      {copiedText === 'tigo' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedText === 'tigo' ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'binance_pay' && paymentConfig.binancePay && (
                <div className="space-y-3 text-xs">
                  {paymentConfig.binancePay.payId && (
                    <div className="bg-[#240d38] p-3 rounded-xl border border-rose-500/20 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-amber-400 block">Binance Pay ID</span>
                        <span className="text-rose-200 font-mono">{paymentConfig.binancePay.payId}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(paymentConfig.binancePay.payId, 'binance_id')}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1"
                      >
                        {copiedText === 'binance_id' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedText === 'binance_id' ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                  )}

                  {paymentConfig.binancePay.usdtAddress && (
                    <div className="bg-[#240d38] p-3 rounded-xl border border-rose-500/20 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-amber-400 block">Dirección USDT ({paymentConfig.binancePay.network || 'BEP20'})</span>
                        <span className="text-rose-300 font-mono text-[10px] break-all">{paymentConfig.binancePay.usdtAddress}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(paymentConfig.binancePay.usdtAddress, 'usdt_address')}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1 shrink-0 ml-2"
                      >
                        {copiedText === 'usdt_address' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedText === 'usdt_address' ? 'Copiado' : 'Copiar'}</span>
                      </button>
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
          /* Success Screen with Credentials */
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-400 text-green-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                ¡Pedido Registrado con Éxito! 🎉
              </h3>
              <p className="text-rose-200/80 text-sm max-w-md mx-auto">
                Tu detalle romántico ha sido enviado al equipo de administración para su revisión y activación.
              </p>
            </div>

            {/* Generated Account Card */}
            <div className="glass-card-rose rounded-2xl p-5 border border-rose-500/40 text-left space-y-3 max-w-md mx-auto">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm border-b border-rose-500/20 pb-2">
                <UserCheck className="w-4 h-4 text-rose-400" />
                <span>Datos de tu Cuenta Automática</span>
              </div>

              <div className="text-xs space-y-2">
                <div className="flex justify-between items-center bg-[#251138] p-2 rounded-lg border border-rose-500/20">
                  <span className="text-rose-300/70">Código de Usuario:</span>
                  <span className="font-bold text-amber-300 font-mono text-sm px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40">
                    {createdOrder.clientCode || createdOrder.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rose-300/70">Pareja:</span>
                  <span className="font-bold text-white">{createdOrder.coupleTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rose-300/70">Celular (Contraseña):</span>
                  <span className="font-bold text-rose-200 font-mono">{createdOrder.phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rose-300/70">Estado Actual:</span>
                  <span className="font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded text-[11px] border border-amber-500/40">
                    ⏱️ PENDIENTE DE APROBACIÓN
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-rose-300/70 max-w-sm mx-auto">
              Una vez que el administrador apruebe tu pago, se generará tu **Código QR Oficial** para ingresar a la invitación.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={`https://wa.me/59177123456?text=Hola,%20acabo%20de%20realizar%20el%20pedido%20${createdOrder.id}%20para%20${encodeURIComponent(createdOrder.coupleTitle)}.`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Acelerar aprobación por WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 font-semibold text-sm transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
