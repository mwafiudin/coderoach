/**
 * Seven-segment readout, drawn the way rideDeck draws its numbers: from segments, never a font,
 * so the unlit segments stay visible (rideDeck DESIGN.md, "Angka Bukan Huruf"). Only the glyphs
 * this page needs: digits, the dash an idle readout shows, and a blank.
 */
const ON: Record<string, string> = {
  '0': 'abcdef',
  '1': 'bc',
  '2': 'abdeg',
  '3': 'abcdg',
  '4': 'bcfg',
  '5': 'acdfg',
  '6': 'acdefg',
  '7': 'abc',
  '8': 'abcdefg',
  '9': 'abcdfg',
  '-': 'g',
  ' ': '',
};

// Segment shapes in a 12 x 20 cell, gaps kept so each bar reads on its own.
const SEGMENTS: Record<string, string> = {
  a: 'M2.2 1h7.6l-1.4 1.6H3.6z',
  b: 'M10.2 1.4l.8 .9v6.8l-.8.8-1.3-1.2V3z',
  c: 'M10.2 10.1l.8.8v6.8l-.8.9-1.3-1.6V11.3z',
  d: 'M3.6 17.4h4.8l1.4 1.6H2.2z',
  e: 'M1.8 10.1l1.3 1.2V17l-1.3 1.6-.8-.9v-6.8z',
  f: 'M1.8 1.4L3.1 3v5.7l-1.3 1.2-.8-.8V2.3z',
  g: 'M3.4 9.2h5.2l.9.8-.9.8H3.4l-.9-.8z',
};

export function Segments({ text, label }: { text: string; label: string }) {
  const glyphs = [...text];
  return (
    <svg className="rd-seg" viewBox={`0 0 ${glyphs.length * 14} 20`} role="img" aria-label={label}>
      {glyphs.map((ch, i) => (
        <g key={i} transform={`translate(${i * 14} 0)`}>
          {Object.entries(SEGMENTS).map(([name, d]) => (
            <path key={name} d={d} className={(ON[ch] ?? '').includes(name) ? 'rd-seg__on' : 'rd-seg__off'} />
          ))}
        </g>
      ))}
    </svg>
  );
}
