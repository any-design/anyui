export interface AChatMessage {
  id: string | number;
  content: string;
  role: 'self' | 'target';
}
