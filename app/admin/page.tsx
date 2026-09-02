'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Lock,
  User,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  QrCode,
  Download,
  Eye,
  ExternalLink,
  Search,
  Filter,
  LogOut,
  Sparkles,
  PhoneCall,
  CreditCard,
  Smartphone,
  Coins,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Settings,
  DollarSign,
  Building,
  Check,
  ArrowLeft,
  Music,
  Youtube,
  Play,
  Pause,
  Volume2,
  BarChart3,
  TrendingUp,
  PieChart,
  ZoomIn,
  Award
} from 'lucide-react';
import { Order, OrderStatus, PaymentMethodsConfig, BankAccount, AdminSong } from '@/types';
import { AudioPlayer } from '@/components/romantic/AudioPlayer';
import {
  getStoredOrders,
  approveOrder,
  rejectOrder,
  getPaymentConfig,
  savePaymentConfig,
  defaultPaymentConfig,
  getAdminSongs,
  saveAdminSongs,
  defaultAdminSongs,
  syncAllAdminDataFromSupabase,
  deleteOrder,
} from '@/lib/store';
import { getYouTubeVideoId } from '@/lib/musicCatalog';
import { uploadClientPhotoToSupabase } from '@/lib/supabase';
import { QRCodeSVG } from 'qrcode.react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState<'orders' | 'analytics' | 'payment_methods' | 'music_catalog'>('orders');
  
  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | OrderStatus>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [previewReceiptUrl, setPreviewReceiptUrl] = useState<string | null>(null);

  // Payment Methods Config State
  const [paymentConfig, setPaymentConfig] = useState<PaymentMethodsConfig>(defaultPaymentConfig);

  // Admin Music Songs Catalog State
  const [adminSongs, setAdminSongs] = useState<AdminSong[]>(defaultAdminSongs);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [activePreviewSong, setActivePreviewSong] = useState<AdminSong | null>(null);

  const loadData = async () => {
    setOrders(getStoredOrders());
    setPaymentConfig(getPaymentConfig());
    setAdminSongs(getAdminSongs());
    await syncAllAdminDataFromSupabase();
    setOrders(getStoredOrders());
    setPaymentConfig(getPaymentConfig());
    setAdminSongs(getAdminSongs());
  };

  useEffect(() => {
    // Check if session persists
    const session = sessionStorage.getItem('admin_authenticated');
    if (session === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'chris0712' && password === '75949161') {
      setIsAuthenticated(true);
      setLoginError('');
      sessionStorage.setItem('admin_authenticated', 'true');
      loadData();
    } else {
      setLoginError('Usuario o contraseña incorrectos.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
  };

  const handleApprove = (orderId: string) => {
    const approved = approveOrder(orderId, typeof window !== 'undefined' ? window.location.origin : '');
    setOrders(getStoredOrders());
    if (selectedOrder && selectedOrder.id === orderId && approved) {
      setSelectedOrder(approved);
    }
  };

  const handleReject = (orderId: string) => {
    const rejected = rejectOrder(orderId);
    setOrders(getStoredOrders());
    if (selectedOrder && selectedOrder.id === orderId && rejected) {
      setSelectedOrder(rejected);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (selectedFilter === 'ALL') return true;
    return o.status === selectedFilter;
  });

  // Save payment configuration
  const handleSavePaymentConfig = (e: React.FormEvent) => {
    e.preventDefault();
    savePaymentConfig(paymentConfig);
    setSaveSuccessMessage('¡Configuración de métodos de pago guardada exitosamente!');
    setTimeout(() => setSaveSuccessMessage(null), 3500);
  };

  // Save admin songs catalog
  const handleSaveAdminSongs = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdminSongs(adminSongs);
    setSaveSuccessMessage('¡Catálogo de canciones actualizado exitosamente!');
    setTimeout(() => setSaveSuccessMessage(null), 3500);
  };

  // Reset payment configuration to default
  const handleResetPaymentConfig = () => {
    if (confirm('¿Estás seguro de restablecer todos los métodos de pago a sus valores iniciales?')) {
      savePaymentConfig(defaultPaymentConfig);
      setPaymentConfig(defaultPaymentConfig);
      setSaveSuccessMessage('Se ha restablecido la configuración por defecto de pagos.');
      setTimeout(() => setSaveSuccessMessage(null), 3500);
    }
  };

  // Reset songs catalog to default
  const handleResetAdminSongs = () => {
    if (confirm('¿Estás seguro de restablecer el catálogo de canciones por defecto?')) {
      saveAdminSongs(defaultAdminSongs);
      setAdminSongs(defaultAdminSongs);
      setSaveSuccessMessage('Se ha restablecido el catálogo de canciones por defecto.');
      setTimeout(() => setSaveSuccessMessage(null), 3500);
    }
  };

  // Add new song to admin catalog
  const handleAddAdminSong = () => {
    const newSong: AdminSong = {
      id: `song-${Date.now()}`,
      title: 'Nueva Canción',
      artist: 'Artista',
      youtubeUrl: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
      category: 'Romántico',
    };
    setAdminSongs([...adminSongs, newSong]);
  };

  const handleUpdateAdminSong = (index: number, field: keyof AdminSong, value: string) => {
    const updated = [...adminSongs];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setAdminSongs(updated);
  };

  const handleRemoveAdminSong = (index: number) => {
    const updated = adminSongs.filter((_, i) => i !== index);
    setAdminSongs(updated);
  };

  // Bank account helpers
  const handleAddBankAccount = () => {
    const newAcc: BankAccount = {
      id: `bank-${Date.now()}`,
      bankName: 'Nuevo Banco',
      accountNumber: '000-000000',
      accountHolder: 'Detalles de Amor SRL',
      accountType: 'Cuenta Corriente',
    };
    setPaymentConfig({
      ...paymentConfig,
      bankTransfer: {
        ...paymentConfig.bankTransfer,
        accounts: [...paymentConfig.bankTransfer.accounts, newAcc],
      },
    });
  };

  const handleUpdateBankAccount = (index: number, field: keyof BankAccount, value: string) => {
    const updatedAccounts = [...paymentConfig.bankTransfer.accounts];
    updatedAccounts[index] = {
      ...updatedAccounts[index],
      [field]: value,
    };
    setPaymentConfig({
      ...paymentConfig,
      bankTransfer: {
        ...paymentConfig.bankTransfer,
        accounts: updatedAccounts,
      },
    });
  };

  const handleRemoveBankAccount = (index: number) => {
    const updatedAccounts = paymentConfig.bankTransfer.accounts.filter((_, i) => i !== index);
    setPaymentConfig({
      ...paymentConfig,
      bankTransfer: {
        ...paymentConfig.bankTransfer,
        accounts: updatedAccounts,
      },
    });
  };

  // Login Form Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b0512] via-[#1a0826] to-[#0b0512] text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-[#180927] rounded-3xl p-8 border border-rose-500/30 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-rose-600/20 blur-2xl pointer-events-none rounded-full" />

          {/* Return to Home Link */}
          <div className="mb-6 relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-rose-300 hover:text-white transition px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-rose-500/20 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-rose-400" />
              <span>Volver a la Página Principal</span>
            </Link>
          </div>

          <div className="text-center mb-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-rose-500/40">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white">
              Panel de Administración
            </h1>
            <p className="text-xs text-rose-200/70 mt-1">
              Ingresa con tus credenciales de administrador
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-rose-400" />
                Usuario
              </label>
              <input
                type="text"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rose-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#28133b] border border-rose-500/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rose-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-rose-500/40 transition active:scale-95 mt-2"
            >
              Iniciar Sesión
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-[#0b0512] text-white p-4 sm:p-8">
      {/* Top Admin Navbar */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-8 border-b border-rose-500/20 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Panel de Control Admin
            </h1>
            <p className="text-xs text-rose-300/70">
              Gestión de Pedidos, Pagos & Canciones de YouTube
            </p>
          </div>
        </div>

        {/* Tab Selection Buttons */}
        <div className="flex items-center gap-2">
          <div className="bg-[#1a0929] p-1.5 rounded-2xl border border-rose-500/30 flex gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg'
                  : 'text-rose-300/70 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Pedidos ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'analytics'
                  ? 'bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 text-white shadow-lg shadow-amber-500/20'
                  : 'text-amber-300/80 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Dashboard Estadístico 📊</span>
            </button>

            <button
              onClick={() => setActiveTab('payment_methods')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'payment_methods'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg'
                  : 'text-rose-300/70 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Métodos de Pago</span>
            </button>

            <button
              onClick={() => setActiveTab('music_catalog')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'music_catalog'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg'
                  : 'text-rose-300/70 hover:text-white'
              }`}
            >
              <Music className="w-4 h-4 text-rose-300" />
              <span>Música ({adminSongs.length})</span>
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition ml-2 shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </header>

      {/* SUCCESS TOAST MESSAGE */}
      <AnimatePresence>
        {saveSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-7xl mx-auto mb-6 p-4 rounded-2xl bg-emerald-600/90 border border-emerald-400 text-white text-sm font-bold flex items-center justify-between shadow-xl"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-200" />
              <span>{saveSuccessMessage}</span>
            </div>
            <button onClick={() => setSaveSuccessMessage(null)} className="text-white hover:text-emerald-200 text-xs">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-8">
          {/* Main Stats Cards */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="glass-card-rose rounded-2xl p-4 border border-rose-500/30">
              <span className="text-xs text-rose-300 font-semibold uppercase tracking-wider">Total Pedidos</span>
              <p className="text-3xl font-bold font-mono text-white mt-1">{orders.length}</p>
            </div>

            <div className="bg-amber-950/40 rounded-2xl p-4 border border-amber-500/30">
              <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Pendientes de Aprobar</span>
              <p className="text-3xl font-bold font-mono text-amber-400 mt-1">
                {orders.filter((o) => o.status === 'PENDIENTE').length}
              </p>
            </div>

            <div className="bg-emerald-950/40 rounded-2xl p-4 border border-emerald-500/30">
              <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">Aprobados & Con QR</span>
              <p className="text-3xl font-bold font-mono text-emerald-400 mt-1">
                {orders.filter((o) => o.status === 'APROBADO').length}
              </p>
            </div>

            <div className="bg-red-950/40 rounded-2xl p-4 border border-red-500/30">
              <span className="text-xs text-red-300 font-semibold uppercase tracking-wider">Rechazados</span>
              <p className="text-3xl font-bold font-mono text-red-400 mt-1">
                {orders.filter((o) => o.status === 'RECHAZADO').length}
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { id: 'ALL', label: 'Todos los Pedidos' },
              { id: 'PENDIENTE', label: '⏱️ Pendientes' },
              { id: 'APROBADO', label: '✅ Aprobados' },
              { id: 'RECHAZADO', label: '❌ Rechazados' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                  selectedFilter === tab.id
                    ? 'bg-rose-600 text-white shadow-lg'
                    : 'bg-[#1a0a27] text-rose-300/70 hover:text-white border border-rose-500/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Orders Table / List */}
          <div className="max-w-7xl mx-auto space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-3xl border border-rose-500/20 text-rose-300/60">
                No se encontraron pedidos con este filtro.
              </div>
            ) : (
              filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card-rose rounded-2xl p-5 border border-rose-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-rose-500/60 transition"
                >
                  {/* Left Info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-white font-serif">{order.coupleTitle}</h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          order.status === 'APROBADO'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                            : order.status === 'PENDIENTE'
                            ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                            : 'bg-red-950 text-red-300 border-red-500/40'
                        }`}
                      >
                        {order.status === 'APROBADO' ? '✅ APROBADO' : order.status === 'PENDIENTE' ? '⏱️ PENDIENTE' : '❌ RECHAZADO'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-rose-300/80 font-mono">
                      <span className="flex items-center gap-1">
                        <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                        Celular / Clave: <strong className="text-white">{order.phoneNumber}</strong>
                      </span>
                      <span>|</span>
                      <span>Método: <strong>{order.paymentMethod.toUpperCase()}</strong></span>
                      <span>|</span>
                      <span>Monto: <strong className="text-amber-400">{order.amountBs} Bs</strong></span>
                    </div>
                  </div>

                  {/* Right Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver Detalle</span>
                    </button>

                    {order.status === 'PENDIENTE' && (
                      <>
                        <button
                          onClick={() => handleApprove(order.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transition active:scale-95"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Aprobar Pago</span>
                        </button>

                        <button
                          onClick={() => handleReject(order.id)}
                          className="px-3.5 py-2 rounded-xl bg-red-600/30 hover:bg-red-600/50 text-red-300 font-bold text-xs flex items-center gap-1.5 transition"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Rechazar</span>
                        </button>
                      </>
                    )}

                    {order.status === 'APROBADO' && (
                      <a
                        href={`/p/${order.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transition"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>Ver QR / Página</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB: STATISTICAL ANALYTICS DASHBOARD */}
      {activeTab === 'analytics' && (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Dashboard Header Bar */}
          <div className="glass-card-rose p-6 rounded-3xl border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 mb-2">
                <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                <span>Métricas en Tiempo Real</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-2">
                Análisis Estadístico del Sistema 📊
              </h2>
              <p className="text-xs text-rose-200/70 mt-1">
                Visualización de ingresos, tendencias de ventas por plantilla y canales de pago preferidos.
              </p>
            </div>

            <div className="bg-[#1e0a2e] px-4 py-3 rounded-2xl border border-rose-500/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                💰
              </div>
              <div>
                <span className="text-[11px] text-rose-300/70 font-semibold uppercase block">Recaudación Total (Bs)</span>
                <span className="text-xl font-bold font-mono text-amber-400">
                  {orders.filter(o => o.status === 'APROBADO').reduce((acc, o) => acc + (o.amountBs || 49), 0)} Bs
                </span>
              </div>
            </div>
          </div>

          {/* Top 4 KPI Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1: Ingresos Aprobados */}
            <div className="bg-gradient-to-br from-[#24133b] to-[#140624] p-5 rounded-2xl border border-emerald-500/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-xl pointer-events-none rounded-full" />
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-1">
                Ingresos Aprobados
              </span>
              <p className="text-3xl font-extrabold font-mono text-white">
                {orders.filter(o => o.status === 'APROBADO').reduce((acc, o) => acc + (o.amountBs || 49), 0)} <span className="text-base text-emerald-400 font-sans">Bs</span>
              </p>
              <span className="text-[11px] text-emerald-300/70 font-mono mt-2 block">
                / {orders.filter(o => o.status === 'APROBADO').reduce((acc, o) => acc + (o.amountUsdt || 7), 0)} USDT en Crypto
              </span>
            </div>

            {/* KPI 2: Ingresos Proyectados (Pendientes) */}
            <div className="bg-gradient-to-br from-[#2b170c] to-[#170904] p-5 rounded-2xl border border-amber-500/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-xl pointer-events-none rounded-full" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                Ingresos por Aprobar
              </span>
              <p className="text-3xl font-extrabold font-mono text-amber-400">
                {orders.filter(o => o.status === 'PENDIENTE').reduce((acc, o) => acc + (o.amountBs || 49), 0)} <span className="text-base text-amber-300 font-sans">Bs</span>
              </p>
              <span className="text-[11px] text-amber-200/70 mt-2 block">
                ⏱️ {orders.filter(o => o.status === 'PENDIENTE').length} pedidos esperando revisión
              </span>
            </div>

            {/* KPI 3: Tasa de Conversión / Aprobación */}
            <div className="bg-gradient-to-br from-[#2b0c24] to-[#170413] p-5 rounded-2xl border border-rose-500/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 blur-xl pointer-events-none rounded-full" />
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block mb-1">
                Tasa de Aprobación
              </span>
              <p className="text-3xl font-extrabold font-mono text-white">
                {orders.length > 0
                  ? Math.round((orders.filter(o => o.status === 'APROBADO').length / orders.length) * 100)
                  : 0}%
              </p>
              <span className="text-[11px] text-rose-300/70 mt-2 block">
                {orders.filter(o => o.status === 'APROBADO').length} aprobados de {orders.length} totales
              </span>
            </div>

            {/* KPI 4: Ticket Promedio por Cliente */}
            <div className="bg-gradient-to-br from-[#0c1f2b] to-[#040e17] p-5 rounded-2xl border border-cyan-500/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-xl pointer-events-none rounded-full" />
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-1">
                Ticket Promedio
              </span>
              <p className="text-3xl font-extrabold font-mono text-cyan-300">
                {orders.length > 0
                  ? Math.round(
                      orders.reduce((acc, o) => acc + (o.amountBs || 49), 0) / orders.length
                    )
                  : 49} <span className="text-base text-cyan-400 font-sans">Bs</span>
              </p>
              <span className="text-[11px] text-cyan-200/70 mt-2 block">
                Basado en planes de 49 Bs y 99 Bs VIP
              </span>
            </div>
          </div>

          {/* Detailed Statistics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Template Popularity Chart / Breakdown */}
            <div className="glass-card-rose p-6 rounded-3xl border border-rose-500/30 space-y-6">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
                <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Popularidad por Plantilla Vendida
                </h3>
                <span className="text-xs text-rose-300/70 font-mono">Desglose %</span>
              </div>

              <div className="space-y-5">
                {[
                  {
                    name: '💌 El Sobre de Amor Animado (Plantilla 1)',
                    count: orders.filter(
                      o => o.pageData?.themeColor === 'rose' || o.pageData?.themeColor === 'wine' || !o.pageData?.themeColor
                    ).length,
                    color: 'from-rose-500 to-pink-600',
                  },
                  {
                    name: '🌌 Galaxia de Recuerdos (Plantilla 2)',
                    count: orders.filter(o => o.pageData?.themeColor === 'purple').length,
                    color: 'from-cyan-500 to-purple-600',
                  },
                  {
                    name: '📸 Álbum Polaroid Vintage & Vinilo (Plantilla 3)',
                    count: orders.filter(o => o.pageData?.themeColor === 'gold').length,
                    color: 'from-amber-500 to-yellow-600',
                  },
                  {
                    name: '🎁 Caja de Regalo 3D & Vales de Amor (Plantilla 4)',
                    count: orders.filter(o => o.pageData?.themeColor === 'emerald').length,
                    color: 'from-emerald-500 to-teal-600',
                  },
                ].map((item, idx) => {
                  const percentage = orders.length > 0 ? Math.round((item.count / orders.length) * 100) : 0;
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-white">{item.name}</span>
                        <span className="font-mono text-rose-300">
                          {item.count} pedidos ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-[#170929] rounded-full overflow-hidden border border-rose-500/20 p-0.5">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-700`}
                          style={{ width: `${Math.max(percentage, 5)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Methods Distribution */}
            <div className="glass-card-rose p-6 rounded-3xl border border-rose-500/30 space-y-6">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
                <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-cyan-400" />
                  Canales de Pago Preferidos
                </h3>
                <span className="text-xs text-cyan-300/70 font-mono">Porcentaje de Uso</span>
              </div>

              <div className="space-y-5">
                {[
                  {
                    label: '📱 QR Bolivia (QR Simple / Pago Móvil)',
                    count: orders.filter(o => o.paymentMethod === 'qr_bolivia').length,
                    badge: 'Recomendado',
                    color: 'bg-emerald-500',
                  },
                  {
                    label: '🏦 Transferencias Bancarias',
                    count: orders.filter(o => o.paymentMethod === 'bank_transfer').length,
                    badge: 'Bancos',
                    color: 'bg-indigo-500',
                  },
                  {
                    label: '🪙 Binance Pay & Crypto (USDT)',
                    count: orders.filter(o => o.paymentMethod === 'binance_pay').length,
                    badge: 'Crypto',
                    color: 'bg-amber-500',
                  },
                ].map((m, idx) => {
                  const pct = orders.length > 0 ? Math.round((m.count / orders.length) * 100) : 0;
                  return (
                    <div key={idx} className="bg-[#1a082b] p-4 rounded-2xl border border-rose-500/20 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-white flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${m.color}`} />
                          {m.label}
                        </span>
                        <span className="font-mono text-amber-300 font-bold">
                          {m.count} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#0d0417] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${m.color} transition-all duration-700`}
                          style={{ width: `${Math.max(pct, 3)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAYMENT METHODS MANAGEMENT */}
      {activeTab === 'payment_methods' && (
        <form onSubmit={handleSavePaymentConfig} className="max-w-7xl mx-auto space-y-8">
          {/* Header & Save Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card-rose p-6 rounded-3xl border border-rose-500/30">
            <div>
              <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                <Settings className="w-6 h-6 text-rose-400" />
                Configuración de Métodos de Pago
              </h2>
              <p className="text-xs text-rose-200/70 mt-1">
                Edita los precios, cuentas bancarias, números de Tigo Money y QR de cobro que verán los usuarios al finalizar su pedido.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleResetPaymentConfig}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 font-semibold text-xs flex items-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restablecer Valores</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-xl shadow-rose-500/30 flex items-center gap-2 transition active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>

          {/* 1. PRECIOS GENERALES */}
          <div className="glass-card-rose p-6 rounded-3xl border border-rose-500/30 space-y-4">
            <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2 border-b border-rose-500/20 pb-3">
              <DollarSign className="w-5 h-5 text-amber-400" />
              Precios del Servicio
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Precio en Bolivianos (Bs) *
                </label>
                <input
                  type="number"
                  value={paymentConfig.priceBs}
                  onChange={(e) => setPaymentConfig({ ...paymentConfig, priceBs: Number(e.target.value) })}
                  className="w-full bg-[#240e36] border border-rose-500/40 rounded-xl px-4 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-rose-400"
                  required
                  min={1}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Precio en USDT (Cripto) *
                </label>
                <input
                  type="number"
                  value={paymentConfig.priceUsdt}
                  onChange={(e) => setPaymentConfig({ ...paymentConfig, priceUsdt: Number(e.target.value) })}
                  className="w-full bg-[#240e36] border border-rose-500/40 rounded-xl px-4 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-rose-400"
                  required
                  min={1}
                />
              </div>
            </div>
          </div>

          {/* 2. QR BOLIVIA */}
          <div className="glass-card-rose p-6 rounded-3xl border border-rose-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                <QrCode className="w-5 h-5 text-rose-400" />
                Configuración QR Bolivia
              </h3>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentConfig.qrBolivia?.enabled ?? true}
                  onChange={(e) =>
                    setPaymentConfig({
                      ...paymentConfig,
                      qrBolivia: { ...paymentConfig.qrBolivia, enabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 accent-rose-500 rounded"
                />
                <span className="text-xs font-bold text-rose-200">Habilitar este método</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Nombre del Titular de la Cuenta
                </label>
                <input
                  type="text"
                  value={paymentConfig.qrBolivia.holder}
                  onChange={(e) =>
                    setPaymentConfig({
                      ...paymentConfig,
                      qrBolivia: { ...paymentConfig.qrBolivia, holder: e.target.value },
                    })
                  }
                  className="w-full bg-[#240e36] border border-rose-500/40 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Enlace o Código QR Texto (Opcional)
                </label>
                <input
                  type="text"
                  value={paymentConfig.qrBolivia.qrValue}
                  onChange={(e) =>
                    setPaymentConfig({
                      ...paymentConfig,
                      qrBolivia: { ...paymentConfig.qrBolivia, qrValue: e.target.value },
                    })
                  }
                  className="w-full bg-[#240e36] border border-rose-500/40 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400 font-mono"
                />
              </div>

              {/* Subir Imagen del QR */}
              <div className="md:col-span-2 bg-[#1b0a29] p-4 rounded-2xl border border-rose-500/20 space-y-3">
                <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center gap-2">
                  <span>📸 Imagen Oficial del Código QR (Subir a Supabase Storage)</span>
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs cursor-pointer shadow-lg flex items-center gap-2">
                    <span>Subir Foto del QR</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const uploadedUrl = await uploadClientPhotoToSupabase(
                            file,
                            'admin-config',
                            'qr-bolivia-oficial.jpg'
                          );
                          setPaymentConfig({
                            ...paymentConfig,
                            qrBolivia: {
                              ...paymentConfig.qrBolivia,
                              qrImageUrl: uploadedUrl,
                            },
                          });
                        }
                      }}
                    />
                  </label>
                  {paymentConfig.qrBolivia.qrImageUrl && (
                    <div className="flex items-center gap-3">
                      <img
                        src={paymentConfig.qrBolivia.qrImageUrl}
                        alt="QR Bolivia Preview"
                        className="w-16 h-16 object-contain bg-white p-1 rounded-lg border border-rose-500/40"
                      />
                      <span className="text-xs text-emerald-400 font-semibold">✓ Imagen de QR guardada en Supabase</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Instrucciones para el Usuario
                </label>
                <textarea
                  value={paymentConfig.qrBolivia.instructions}
                  onChange={(e) =>
                    setPaymentConfig({
                      ...paymentConfig,
                      qrBolivia: { ...paymentConfig.qrBolivia, instructions: e.target.value },
                    })
                  }
                  className="w-full bg-[#240e36] border border-rose-500/40 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400 h-20"
                />
              </div>
            </div>
          </div>

          {/* 3. TRANSFERENCIAS BANCARIAS */}
          <div className="glass-card-rose p-6 rounded-3xl border border-rose-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                <Building className="w-5 h-5 text-rose-400" />
                Cuentas Bancarias
              </h3>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentConfig.bankTransfer?.enabled ?? true}
                  onChange={(e) =>
                    setPaymentConfig({
                      ...paymentConfig,
                      bankTransfer: { ...paymentConfig.bankTransfer, enabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 accent-rose-500 rounded"
                />
                <span className="text-xs font-bold text-rose-200">Habilitar este método</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-300 mb-1">
                Instrucciones para el Usuario
              </label>
              <input
                type="text"
                value={paymentConfig.bankTransfer.instructions}
                onChange={(e) =>
                  setPaymentConfig({
                    ...paymentConfig,
                    bankTransfer: { ...paymentConfig.bankTransfer, instructions: e.target.value },
                  })
                }
                className="w-full bg-[#240e36] border border-rose-500/40 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400 mb-4"
              />
            </div>

            {/* List of Bank Accounts */}
            <div className="space-y-4">
              <span className="block text-xs font-bold text-rose-200 uppercase tracking-wider">
                Lista de Cuentas Bancarias Registradas:
              </span>

              {paymentConfig.bankTransfer.accounts.map((acc, index) => (
                <div key={acc.id || index} className="bg-[#1f0b2e] p-4 rounded-2xl border border-rose-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">Cuenta #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBankAccount(index)}
                      className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] text-rose-300/80 mb-0.5">Nombre del Banco</label>
                      <input
                        type="text"
                        value={acc.bankName}
                        onChange={(e) => handleUpdateBankAccount(index, 'bankName', e.target.value)}
                        className="w-full bg-[#2a133d] border border-rose-500/30 rounded-lg px-3 py-2 text-white font-semibold"
                        placeholder="Ej: Banco Nacional de Bolivia (BNB)"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-rose-300/80 mb-0.5">Número de Cuenta</label>
                      <input
                        type="text"
                        value={acc.accountNumber}
                        onChange={(e) => handleUpdateBankAccount(index, 'accountNumber', e.target.value)}
                        className="w-full bg-[#2a133d] border border-rose-500/30 rounded-lg px-3 py-2 text-white font-mono"
                        placeholder="Ej: 150-09283741"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-rose-300/80 mb-0.5">Titular de la Cuenta</label>
                      <input
                        type="text"
                        value={acc.accountHolder || ''}
                        onChange={(e) => handleUpdateBankAccount(index, 'accountHolder', e.target.value)}
                        className="w-full bg-[#2a133d] border border-rose-500/30 rounded-lg px-3 py-2 text-white"
                        placeholder="Ej: Detalles de Amor SRL"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-rose-300/80 mb-0.5">Tipo de Cuenta</label>
                      <input
                        type="text"
                        value={acc.accountType || ''}
                        onChange={(e) => handleUpdateBankAccount(index, 'accountType', e.target.value)}
                        className="w-full bg-[#2a133d] border border-rose-500/30 rounded-lg px-3 py-2 text-white"
                        placeholder="Ej: Cuenta Corriente / Caja de Ahorros"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddBankAccount}
                className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-rose-200 border border-dashed border-rose-500/40 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Plus className="w-4 h-4 text-rose-400" />
                <span>+ Agregar Nueva Cuenta Bancaria</span>
              </button>
            </div>
          </div>

          {/* 4. BINANCE PAY & CRIPTO (USDT) */}
          <div className="glass-card-rose p-6 rounded-3xl border border-rose-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-400" />
                Binance Pay & Criptomonedas (USDT)
              </h3>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentConfig.binancePay?.enabled ?? true}
                  onChange={(e) =>
                    setPaymentConfig({
                      ...paymentConfig,
                      binancePay: { ...paymentConfig.binancePay, enabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 accent-rose-500 rounded"
                />
                <span className="text-xs font-bold text-rose-200">Habilitar este método</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Opción 1: Binance Pay ID
                </label>
                <input
                  type="text"
                  value={paymentConfig.binancePay.payId}
                  onChange={(e) =>
                    setPaymentConfig({
                      ...paymentConfig,
                      binancePay: { ...paymentConfig.binancePay, payId: e.target.value },
                    })
                  }
                  className="w-full bg-[#240e36] border border-rose-500/40 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-rose-400"
                  placeholder="Ej: 89230192"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Opción 2: Dirección Wallet USDT
                </label>
                <input
                  type="text"
                  value={paymentConfig.binancePay.usdtAddress}
                  onChange={(e) =>
                    setPaymentConfig({
                      ...paymentConfig,
                      binancePay: { ...paymentConfig.binancePay, usdtAddress: e.target.value },
                    })
                  }
                  className="w-full bg-[#240e36] border border-rose-500/40 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-rose-400"
                  placeholder="Ej: 0x71C7656EC7ab88..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-300 mb-1">
                  Red USDT (Network)
                </label>
                <input
                  type="text"
                  value={paymentConfig.binancePay.network}
                  onChange={(e) =>
                    setPaymentConfig({
                      ...paymentConfig,
                      binancePay: { ...paymentConfig.binancePay, network: e.target.value },
                    })
                  }
                  className="w-full bg-[#240e36] border border-rose-500/40 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-rose-400"
                  placeholder="Ej: BEP20 / TRC20 / Polygon"
                />
              </div>
            </div>
          </div>

          {/* Bottom Submit Action */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-base shadow-xl shadow-rose-500/40 flex items-center gap-2 transition duration-300 active:scale-95"
            >
              <Save className="w-5 h-5" />
              <span>Guardar Configuración de Pagos</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: ADMIN MUSIC CATALOG MANAGEMENT */}
      {activeTab === 'music_catalog' && (
        <form onSubmit={handleSaveAdminSongs} className="max-w-7xl mx-auto space-y-8">
          {activePreviewSong && (
            <AudioPlayer
              audioUrl={activePreviewSong.youtubeUrl}
              audioTitle={activePreviewSong.title}
              audioArtist={activePreviewSong.artist}
              autoPlayTrigger={true}
            />
          )}
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card-rose p-6 rounded-3xl border border-rose-500/30">
            <div>
              <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                <Music className="w-6 h-6 text-rose-400" />
                Gestión de Canciones (Catálogo de Música)
              </h2>
              <p className="text-xs text-rose-200/70 mt-1">
                Agrega, edita o elimina los enlaces de YouTube / Spotify que estarán disponibles para que los clientes elijan en sus páginas románticas.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleResetAdminSongs}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 font-semibold text-xs flex items-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restablecer Canciones</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm shadow-xl shadow-rose-500/30 flex items-center gap-2 transition active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Catálogo</span>
              </button>
            </div>
          </div>

          {/* Songs Editor List */}
          <div className="glass-card-rose p-6 rounded-3xl border border-rose-500/30 space-y-6">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Canciones Disponibles para Clientes ({adminSongs.length}):
              </span>

              <button
                type="button"
                onClick={handleAddAdminSong}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>+ Agregar Nueva Canción de YouTube</span>
              </button>
            </div>

            <div className="space-y-4">
              {adminSongs.map((song, index) => {
                const ytId = getYouTubeVideoId(song.youtubeUrl);
                const coverUrl =
                  song.coverUrl ||
                  (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80');

                return (
                  <div key={song.id || index} className="bg-[#1f0b2e] p-5 rounded-2xl border border-rose-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={coverUrl} alt={song.title} className="w-10 h-10 rounded-lg object-cover border border-rose-500/30" />
                        <div>
                          <span className="text-sm font-bold text-white">{song.title || 'Sin Título'}</span>
                          <span className="text-xs text-rose-300/70 block">{song.artist || 'Sin Artista'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (activePreviewSong?.id === song.id) {
                              setActivePreviewSong(null);
                            } else {
                              setActivePreviewSong(song);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                            activePreviewSong?.id === song.id
                              ? 'bg-rose-600 text-white shadow-lg animate-pulse border border-rose-300'
                              : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30'
                          }`}
                        >
                          {activePreviewSong?.id === song.id ? (
                            <>
                              <Pause className="w-3.5 h-3.5 text-white" />
                              <span>Pausar</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                              <span>Escuchar Canción 🎵</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveAdminSong(index)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-1 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
                      <div>
                        <label className="block text-[11px] text-rose-300/80 mb-0.5">Título de la Canción</label>
                        <input
                          type="text"
                          value={song.title}
                          onChange={(e) => handleUpdateAdminSong(index, 'title', e.target.value)}
                          className="w-full bg-[#2a133d] border border-rose-500/30 rounded-lg px-3 py-2 text-white font-semibold"
                          placeholder="Ej: Perfect"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-rose-300/80 mb-0.5">Artista</label>
                        <input
                          type="text"
                          value={song.artist}
                          onChange={(e) => handleUpdateAdminSong(index, 'artist', e.target.value)}
                          className="w-full bg-[#2a133d] border border-rose-500/30 rounded-lg px-3 py-2 text-white"
                          placeholder="Ej: Ed Sheeran"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-rose-300/80 mb-0.5">Categoría</label>
                        <input
                          type="text"
                          value={song.category || 'Romántico'}
                          onChange={(e) => handleUpdateAdminSong(index, 'category', e.target.value)}
                          className="w-full bg-[#2a133d] border border-rose-500/30 rounded-lg px-3 py-2 text-white"
                          placeholder="Ej: Romántico, Piano, Acústico, Baladas"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-[11px] text-rose-300/80 mb-0.5 flex items-center gap-1">
                          <Youtube className="w-3.5 h-3.5 text-red-500" />
                          Enlace de YouTube o Spotify (URL)
                        </label>
                        <input
                          type="text"
                          value={song.youtubeUrl}
                          onChange={(e) => handleUpdateAdminSong(index, 'youtubeUrl', e.target.value)}
                          className="w-full bg-[#2a133d] border border-rose-500/30 rounded-lg px-3 py-2 text-white font-mono"
                          placeholder="https://www.youtube.com/watch?v=2Vv-BfVoq4g"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Submit Action */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-base shadow-xl shadow-rose-500/40 flex items-center gap-2 transition duration-300 active:scale-95"
            >
              <Save className="w-5 h-5" />
              <span>Guardar Catálogo de Canciones</span>
            </button>
          </div>
        </form>
      )}

      {/* Order Detail Modal with QR Generator */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#170a24] rounded-3xl p-6 sm:p-8 border border-rose-500/40 shadow-2xl text-white max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4 text-rose-300 hover:text-white p-2 rounded-full hover:bg-rose-500/20 transition"
              >
                ✕
              </button>

              <h2 className="text-2xl font-serif font-bold text-white mb-4">
                Detalle del Pedido #{selectedOrder.id}
              </h2>

              <div className="space-y-4 text-xs mb-6">
                <div className="bg-[#240e36] p-4 rounded-2xl border border-rose-500/20 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-rose-300/70">Pareja:</span>
                    <span className="font-bold text-white text-sm">{selectedOrder.coupleTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-rose-300/70">N° Celular (Contraseña):</span>
                    <span className="font-mono font-bold text-amber-400">{selectedOrder.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-rose-300/70">Método de Pago:</span>
                    <span className="font-bold text-white">{selectedOrder.paymentMethod.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-rose-300/70">Fecha:</span>
                    <span className="font-mono text-rose-200">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Receipt Image Preview with Full Uncropped Display */}
                {selectedOrder.receiptUrl && (
                  <div className="bg-[#210c33] p-4 rounded-2xl border border-rose-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-300 text-xs flex items-center gap-1.5">
                        <span>📸 Comprobante de Pago Adjuntado</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => setPreviewReceiptUrl(selectedOrder.receiptUrl || null)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-500/40 transition shadow-sm"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Ver Foto Completa 🔍</span>
                      </button>
                    </div>

                    <div
                      onClick={() => setPreviewReceiptUrl(selectedOrder.receiptUrl || null)}
                      className="rounded-2xl overflow-hidden border-2 border-rose-500/40 bg-black/80 cursor-pointer hover:border-amber-400 transition p-2 flex items-center justify-center min-h-[220px] max-h-[55vh]"
                    >
                      <img
                        src={selectedOrder.receiptUrl}
                        alt="Comprobante de Pago"
                        className="max-h-[50vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                      />
                    </div>

                    <p className="text-[11px] text-rose-300/70 text-center font-light">
                      💡 Haz clic sobre la imagen para abrir la captura del comprobante en alta resolución.
                    </p>
                  </div>
                )}

                {/* Generated QR Code Section if Approved */}
                {selectedOrder.status === 'APROBADO' && (
                  <div className="bg-rose-950/60 p-6 rounded-2xl border border-rose-500/40 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                      <QrCode className="w-4 h-4 text-emerald-400" />
                      <span>Código QR de Invitación Generado</span>
                    </div>

                    {/* Vector QR */}
                    <div className="w-44 h-44 bg-white p-3 rounded-2xl shadow-2xl mx-auto border-4 border-rose-500 flex items-center justify-center">
                      <QRCodeSVG
                        value={selectedOrder.qrUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/p/${selectedOrder.slug}`}
                        size={150}
                        level="H"
                      />
                    </div>

                    <p className="text-[11px] font-mono text-rose-200 break-all bg-black/40 p-2 rounded-lg">
                      {selectedOrder.qrUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/p/${selectedOrder.slug}`}
                    </p>

                    <div className="flex gap-2 justify-center">
                      <a
                        href={selectedOrder.qrUrl || `/p/${selectedOrder.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Probar Enlace QR</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-rose-500/20">
                {selectedOrder.status === 'PENDIENTE' && (
                  <button
                    onClick={() => handleApprove(selectedOrder.id)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Aprobar Pago y Generar QR</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 text-sm font-semibold"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Full-Screen Receipt Lightbox Modal */}
      <AnimatePresence>
        {previewReceiptUrl && (
          <div
            onClick={() => setPreviewReceiptUrl(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[92vh] bg-[#140621] p-4 sm:p-6 rounded-3xl border-2 border-amber-400/80 shadow-[0_0_50px_rgba(245,158,11,0.3)] flex flex-col items-center justify-center text-white"
            >
              <button
                onClick={() => setPreviewReceiptUrl(null)}
                className="absolute top-4 right-4 text-white hover:text-rose-300 px-3 py-1.5 rounded-full bg-rose-600/80 hover:bg-rose-600 border border-white/20 z-20 font-bold text-xs shadow-lg transition"
              >
                ✕ Cerrar Vista
              </button>

              <div className="text-center mb-3">
                <span className="text-amber-300 text-xs font-bold font-mono uppercase tracking-wider block">
                  🔍 Comprobante de Pago Alta Resolución
                </span>
              </div>

              <div className="overflow-auto max-h-[75vh] w-full flex items-center justify-center p-2 bg-black/60 rounded-2xl border border-rose-500/20">
                <img
                  src={previewReceiptUrl}
                  alt="Comprobante Completo"
                  className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <a
                  href={previewReceiptUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xl transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir en Nueva Pestaña / Descargar</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
