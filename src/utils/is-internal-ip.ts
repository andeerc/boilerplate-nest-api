/**
 * Verifica se um IP é interno/local.
 * Considera:
 * - localhost (127.0.0.1 ou ::1)
 * - Faixas privadas IPv4: 10.x.x.x, 172.16.x.x - 172.31.x.x e 192.168.x.x
 */
export function isInternalIp(ip: string): boolean {
  if (ip === '127.0.0.1' || ip === '::1') return true;

  const parts = ip.split('.');
  if (parts.length === 4) {
    const first = parseInt(parts[0], 10);
    const second = parseInt(parts[1], 10);

    if (first === 10) return true;
    if (first === 192 && second === 168) return true;
    if (first === 172 && second >= 16 && second <= 31) return true;
  }

  return false;
}