export type AccountBookHistory = {
  id?: number;
  type: '사용' | '수입';
  price: number;
  comment: string;
  createdAt: number;
  updateAt: number;
  photoUrl: string | null;
};
