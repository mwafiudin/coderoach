import { readFileSync } from 'node:fs';
import path from 'node:path';

// The site's own logo file, inlined so its dark ink can follow the admin theme: as an <img> it
// would vanish on the dark theme. The file is ours, read once at startup, never user input.
const svg = readFileSync(path.join(process.cwd(), 'public/assets/coderoach_logo.svg'), 'utf8')
  .replace(/rgb\(24,\s*24,\s*24\)/g, 'currentColor')
  .replace(/\s(width|height)="\d+"/g, '')
  .replace('<svg', '<svg width="100%" height="100%" aria-hidden="true" focusable="false"');

export function BrandMark({ size }: { size: number }) {
  return (
    <span
      style={{ display: 'block', width: size, height: size, flex: 'none', color: 'var(--theme-text)' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
