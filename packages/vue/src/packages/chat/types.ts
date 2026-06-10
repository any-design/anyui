export type AChatMessageRole = 'self' | 'target';

export interface AChatMessage {
  id: string | number;
  content: string;
  role: AChatMessageRole;
}
