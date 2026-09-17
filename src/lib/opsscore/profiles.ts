/**
 * Five synthetic businesses for checking the scoring rules before release (brief §5).
 * Answers are what a plausible owner of each business would pick, not tuned to hit a result.
 */
import type { Answers } from './scoring';

export type Profile = { name: string; employees: string; answers: Answers };

export const PROFILES: Record<'warung' | 'fnb' | 'consultant' | 'distributor' | 'erp', Profile> = {
  warung: {
    name: 'Warung, 3 orang',
    employees: '1-5',
    answers: {
      A1: 'kepala', A2: 'tidak-ada', A3: 'lt30', A4: 'tidak-bisa',
      B1: 'kepala', B2: 'besok', B3: 'mingguan', B4: 'chat-saya',
      C1: 'spreadsheet', C2: 'hafal', C3: 'belum-pasti', C4: 'sudah-masalah',
      D0: 'ya', D1: 'kepala', D2: 'tidak-pernah',
      E1: 'kepala', E2: 'mingguan', E3: 'kepala',
      F1: 'lt1', F2: ['semua'], F3: 'feeling',
      G1: 'tidak-ada', G2: 'tidak-ada', G3: 'kira-kira',
      H1: 'belum', H2: 'tidak-ada', H3: ['balas-chat'],
    },
  },
  fnb: {
    name: 'Outlet F&B, 4 cabang',
    employees: '21-50',
    answers: {
      A1: 'chat', A2: 'saya', A3: 'gt500', A4: 'hari',
      B1: 'chat', B2: 'besok', B3: 'mingguan', B4: 'chat-atasan',
      C1: 'spreadsheet', C2: 'excel', C3: 'lebih-2-minggu', C4: 'rekon-bulanan',
      D0: 'ya', D1: 'spreadsheet', D2: 'besar',
      E1: 'spreadsheet', E2: 'mingguan', E3: 'tidak-dipakai',
      F1: '1-3', F2: ['approval', 'laporan'], F3: 'manual',
      G1: 'lama', G2: 'wa-admin', G3: 'kira-kira',
      H1: 'pribadi', H2: 'tersebar', H3: ['laporan', 'prediksi-stok'],
    },
  },
  consultant: {
    name: 'Konsultan jasa, 12 orang',
    employees: '11-20',
    answers: {
      A1: 'spreadsheet', A2: 'saya', A3: '30-100', A4: 'hari',
      B1: 'chat', B2: 'mingguan', B3: 'mingguan', B4: 'chat-saya',
      C1: 'aplikasi', C2: 'excel', C3: 'seminggu', C4: 'rekon-bulanan',
      D0: 'tidak',
      E1: 'spreadsheet', E2: 'mingguan', E3: 'dokumen',
      F1: '1-3', F2: ['approval', 'harga'], F3: 'manual',
      G1: 'rutin', G2: 'wa-admin', G3: 'kira-kira',
      H1: 'pribadi', H2: 'tersebar', H3: ['laporan', 'follow-up'],
    },
  },
  distributor: {
    name: 'Distributor, 40 orang',
    employees: '21-50',
    answers: {
      A1: 'chat', A2: 'sales', A3: '100-500', A4: 'hari',
      B1: 'chat', B2: 'besok', B3: 'harian', B4: 'chat-saya',
      C1: 'spreadsheet', C2: 'catatan-sales', C3: 'lebih-2-minggu', C4: 'sudah-masalah',
      D0: 'ya', D1: 'spreadsheet', D2: 'besar',
      E1: 'spreadsheet', E2: 'bulanan', E3: 'kepala',
      F1: '1-3', F2: ['pembayaran', 'harga'], F3: 'manual',
      G1: 'lama', G2: 'wa-pribadi', G3: 'tidak-tahu',
      H1: 'belum', H2: 'tersebar', H3: ['rekap-keuangan', 'prediksi-stok'],
    },
  },
  erp: {
    name: 'Manufaktur yang sudah pakai ERP',
    employees: '51-100',
    answers: {
      A1: 'aplikasi', A2: 'sistem', A3: '100-500', A4: 'jam',
      B1: 'aplikasi', B2: 'hari-itu', B3: 'jarang', B4: 'sistem',
      C1: 'aplikasi', C2: 'sistem', C3: 'seminggu', C4: 'hari-itu',
      D0: 'ya', D1: 'aplikasi', D2: 'terlacak',
      E1: 'aplikasi', E2: 'seminggu', E3: 'dokumen',
      F1: 'lt1', F2: ['harga'], F3: 'dashboard',
      G1: 'rutin', G2: 'crm', G3: 'ada-data',
      H1: 'tim', H2: 'database', H3: ['balas-chat', 'laporan'],
    },
  },
};
