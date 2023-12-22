export interface Pageable<T> {
  collections?: T;
  pivot: string | null;
  hasNext: boolean;
  hasPrevious: boolean;
  countAll: number;
  countData: number;
}
