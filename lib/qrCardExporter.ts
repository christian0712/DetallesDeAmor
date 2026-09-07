export interface PrintableQRData {
  coupleTitle: string;
  senderName: string;
  recipientName: string;
  slug: string;
  qrUrl?: string;
  id?: string;
}

export const exportPrintableQRCard = async (
  order: PrintableQRData,
  qrCanvasId: string
) => {
  if (typeof window === 'undefined') return;

  // 1. Find the QR Canvas or fallback to rendering
  let qrCanvasElement = document.getElementById(qrCanvasId) as HTMLCanvasElement;
  
  if (!qrCanvasElement) {
    // If not found, try searching for any canvas in element or container
    qrCanvasElement = document.querySelector(`#${qrCanvasId} canvas`) as HTMLCanvasElement;
  }

  let qrDataUrl = '';
  if (qrCanvasElement && typeof qrCanvasElement.toDataURL === 'function') {
    qrDataUrl = qrCanvasElement.toDataURL('image/png');
  } else {
    // Fallback: try SVG if SVG was rendered instead of Canvas
    const svgElement = document.getElementById(qrCanvasId) as unknown as SVGElement;
    if (svgElement) {
      const svgString = new XMLSerializer().serializeToString(svgElement);
      qrDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
    }
  }

  if (!qrDataUrl) {
    console.error('No se pudo obtener el código QR para la tarjeta imprimible.');
    return;
  }

  // Load QR Image
  const qrImage = new Image();
  qrImage.src = qrDataUrl;
  await new Promise((resolve, reject) => {
    qrImage.onload = resolve;
    qrImage.onerror = reject;
  });

  // 2. Create High-Resolution Card Canvas (1200 x 1600 px - 300 DPI 3:4 aspect ratio)
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1600;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background Gradient (Soft Romantic Cream & Pearl Pink)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1600);
  bgGrad.addColorStop(0, '#FFF0F5');
  bgGrad.addColorStop(0.4, '#FFFFFF');
  bgGrad.addColorStop(1, '#FFF5F8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 1600);

  // Outer Decorative Borders
  ctx.strokeStyle = '#D87093';
  ctx.lineWidth = 14;
  ctx.strokeRect(40, 40, 1120, 1520);

  ctx.strokeStyle = '#C71585';
  ctx.lineWidth = 4;
  ctx.strokeRect(58, 58, 1084, 1484);

  ctx.strokeStyle = '#FFB6C1';
  ctx.lineWidth = 2;
  ctx.strokeRect(66, 66, 1068, 1468);

  // Corner Hearts Decoration
  ctx.font = '36px serif';
  ctx.fillStyle = '#C71585';
  ctx.textAlign = 'center';
  ctx.fillText('💖', 88, 108);
  ctx.fillText('💖', 1112, 108);
  ctx.fillText('💖', 88, 1515);
  ctx.fillText('💖', 1112, 1515);

  // Header Title & Subtitle
  ctx.fillStyle = '#800020';
  ctx.font = 'bold 38px Georgia, serif';
  ctx.fillText('DETALLES DE AMOR', 600, 130);

  ctx.fillStyle = '#AD1457';
  ctx.font = 'italic 26px sans-serif';
  ctx.fillText('✨ Una Sorpresa Especial Hecha para Ti ✨', 600, 175);

  // Decorative Divider Line with Heart Center
  ctx.beginPath();
  ctx.moveTo(320, 205);
  ctx.lineTo(570, 205);
  ctx.moveTo(630, 205);
  ctx.lineTo(880, 205);
  ctx.strokeStyle = '#E91E63';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#E91E63';
  ctx.font = '22px sans-serif';
  ctx.fillText('❤️', 600, 212);

  // Couple Title (Big Romantic Serif)
  ctx.fillStyle = '#4A0E17';
  ctx.font = 'bold 64px Georgia, serif';
  const coupleText = order.coupleTitle || `${order.senderName} & ${order.recipientName}`;
  
  // Wrap or truncate long title if needed
  if (coupleText.length > 25) {
    ctx.font = 'bold 48px Georgia, serif';
  }
  ctx.fillText(coupleText, 600, 310);

  // Dedication Line
  ctx.fillStyle = '#880E4F';
  ctx.font = '28px sans-serif';
  const sender = order.senderName || 'Tu Amor';
  const recipient = order.recipientName || 'Mi Vida';
  ctx.fillText(`De: ${sender}   ❤️   Para: ${recipient}`, 600, 370);

  // QR Container Card Frame
  const qrSize = 500;
  const qrX = (1200 - qrSize) / 2;
  const qrY = 440;

  // Card Shadow & Box Fill
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(199, 21, 133, 0.22)';
  ctx.shadowBlur = 35;
  ctx.shadowOffsetY = 12;
  
  // Rounded Box for QR
  const pad = 35;
  const boxX = qrX - pad;
  const boxY = qrY - pad;
  const boxW = qrSize + pad * 2;
  const boxH = qrSize + pad * 2;

  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(boxX, boxY, boxW, boxH, 32);
  } else {
    ctx.rect(boxX, boxY, boxW, boxH);
  }
  ctx.fill();

  // Reset Shadow
  ctx.shadowColor = 'transparent';
  ctx.strokeStyle = '#FF69B4';
  ctx.lineWidth = 6;
  ctx.stroke();

  // Draw QR Code Image
  ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

  // QR Scan Instructions Box
  ctx.fillStyle = '#880E4F';
  ctx.font = 'bold 34px sans-serif';
  ctx.fillText('📱 Escanea este Código QR', 600, 1085);

  ctx.fillStyle = '#4A0E17';
  ctx.font = '24px sans-serif';
  ctx.fillText('Apunta con la cámara de tu celular para abrir nuestra', 600, 1135);
  ctx.fillText('publicación e historia romántica en vivo', 600, 1175);

  // Quote Box
  const quoteY = 1240;
  ctx.fillStyle = '#FFF0F5';
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(180, quoteY, 840, 125, 24);
  } else {
    ctx.rect(180, quoteY, 840, 125);
  }
  ctx.fill();

  ctx.strokeStyle = '#FFB6C1';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#C71585';
  ctx.font = 'italic bold 28px Georgia, serif';
  ctx.fillText('“Cada segundo a tu lado es mi momento favorito” 💌', 600, quoteY + 70);

  // Footer URL & Branding
  const targetUrl = order.qrUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/p/${order.slug}`;
  ctx.fillStyle = '#AD1457';
  ctx.font = 'bold 22px monospace';
  ctx.fillText(targetUrl, 600, 1435);

  ctx.fillStyle = '#880E4F';
  ctx.font = '18px sans-serif';
  ctx.fillText('www.detallesdeamor.com — Tarjeta Romántica Imprimible para Regalo 🎁', 600, 1480);

  // Download Trigger
  const cleanTitle = (order.coupleTitle || 'Tarjeta-Romantica').replace(/[^a-zA-Z0-9]/g, '_');
  const link = document.createElement('a');
  link.download = `Tarjeta_Imprimible_QR_${cleanTitle}.png`;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
};
