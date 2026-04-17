import { useEffect, useState } from 'react';
import { PACKAGE_META_EVENT, type PackageMetaRuntime } from '../utils/packageMeta';

type PackageMetaWindow = Window & {
  __ANSI_TUI_PACKAGE_META__?: PackageMetaRuntime | null;
};

export function usePackageMeta() {
  const [meta, setMeta] = useState<PackageMetaRuntime | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return (window as PackageMetaWindow).__ANSI_TUI_PACKAGE_META__ ?? null;
  });

  useEffect(() => {
    const handleMeta = (event: Event) => {
      const customEvent = event as CustomEvent<PackageMetaRuntime>;
      setMeta(customEvent.detail);
    };

    const packageMetaWindow = window as PackageMetaWindow;

    if (packageMetaWindow.__ANSI_TUI_PACKAGE_META__) {
      setMeta(packageMetaWindow.__ANSI_TUI_PACKAGE_META__);
    }

    window.addEventListener(PACKAGE_META_EVENT, handleMeta);

    return () => {
      window.removeEventListener(PACKAGE_META_EVENT, handleMeta);
    };
  }, []);

  return meta;
}
