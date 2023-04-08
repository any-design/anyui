export interface AChatMessage {
  id: string | number;
  content: string;
  role: 'user' | 'target';
}
