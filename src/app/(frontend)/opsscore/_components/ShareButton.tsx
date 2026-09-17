'use client';

import { useState } from 'react';
import { SHARE_COPY } from '@/lib/opsscore/copy';

/** Web Share API where available (most phones), otherwise copy the link. */
export function ShareButton({ path, className = '' }: { path: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = new URL(path, window.location.origin).toString();
    if (navigator.share) {
      try {
        await navigator.share({ title: SHARE_COPY.shareTitle, text: SHARE_COPY.shareText, url });
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(SHARE_COPY.copyPrompt, url);
    }
  };

  return (
    <button type="button" onClick={share} className={className} aria-live="polite">
      {copied ? SHARE_COPY.copied : SHARE_COPY.button}
    </button>
  );
}
