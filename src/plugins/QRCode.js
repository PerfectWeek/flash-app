import QRCode from 'qrcode';

export class QRCodePlugin {
  generate(link) {
    return QRCode.toDataURL(link, {
      width: 256,
      height: 256,
    });
  }
}
