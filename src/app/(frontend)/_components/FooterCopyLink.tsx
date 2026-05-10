'use client';

import { useToast } from './ui/Toast';

/**
 * Footer link that — for mailto: and tel:/wa.me URLs — copies the address/number
 * to clipboard alongside the default navigation. Shows a small toast confirming
 * the copy. Falls back to plain link behavior when copy isn't available.
 */
export function FooterCopyLink({
  label,
  href,
  className,
}: {
  label: string;
  href: string;
  className?: string;
}) {
  const toast = useToast();

  const isCopyable =
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.includes('wa.me/');

  const extractValue = () => {
    if (href.startsWith('mailto:')) return href.replace(/^mailto:/, '');
    if (href.startsWith('tel:')) return href.replace(/^tel:/, '');
    const m = href.match(/wa\.me\/(\d+)/);
    if (m) return `+${m[1]}`;
    return label;
  };

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (!isCopyable) return;
        // Only copy when modifier keys aren't pressed (so users can still cmd+click etc.)
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        const value = extractValue();
        try {
          navigator.clipboard?.writeText(value);
          toast.success(`${value} tersalin`, 'Sudah masuk clipboard — bisa ditempel langsung.');
        } catch {
          // Silent fail — link still navigates
        }
      }}
    >
      {label}
    </a>
  );
}
