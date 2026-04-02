import { v4 as uuidv4 } from 'uuid';

export const SAMPLE = [
  { id: uuidv4(), name: 'Lương tháng 3', type: 'thu', amount: 5000000, category: 'Lương', date: '2026-03-01' },
  { id: uuidv4(), name: 'Thưởng dự án', type: 'thu', amount: 2000000, category: 'Thưởng', date: '2026-03-05' },
  { id: uuidv4(), name: 'Ăn trưa', type: 'chi', amount: 50000, category: 'Ăn uống', date: '2026-03-02' },
  { id: uuidv4(), name: 'Đi taxi', type: 'chi', amount: 100000, category: 'Di chuyển', date: '2026-03-10' },
  { id: uuidv4(), name: 'Mua sách', type: 'chi', amount: 150000, category: 'Học tập', date: '2026-03-12' },
];
