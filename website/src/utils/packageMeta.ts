export const PACKAGE_NAME = '@3a2dev/ansi-tui';
export const PACKAGE_REGISTRY_URL = 'https://registry.npmjs.org/@3a2dev/ansi-tui/latest';
export const PACKAGE_DOWNLOADS_URL = 'https://api.npmjs.org/downloads/point/last-month/%403a2dev%2Fansi-tui';
export const PACKAGE_META_EVENT = 'ansi-tui:package-meta';

export interface PackageMetaRuntime {
  version: string;
  tarball: string;
  downloads: number;
  downloadsCompact: string;
  downloadsFull: string;
  downloadsLabel: string;
}

export function fillPackageTemplate(template: string, meta: PackageMetaRuntime): string {
  return template
    .replaceAll('{{version}}', meta.version)
    .replaceAll('{{tarball}}', meta.tarball)
    .replaceAll('{{downloadsCompact}}', meta.downloadsCompact)
    .replaceAll('{{downloadsFull}}', meta.downloadsFull)
    .replaceAll('{{downloadsLabel}}', meta.downloadsLabel)
    .replaceAll('{{package}}', PACKAGE_NAME);
}
