import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Detalles de Amor | Galería de Páginas e Invitaciones Románticas para Novios',
  description: 'Crea y personaliza páginas web románticas interactivas para tu pareja con sobres animados, contadores de aniversario, música y lluvia de corazones.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#0b0512] text-white selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
