import QRCode from 'qrcode';

export function generate(link) {
  return QRCode.toDataURL(link, {
    width: 256,
    height: 256,
    margin: 2
  });
}
