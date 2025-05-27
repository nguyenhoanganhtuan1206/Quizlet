export interface FlashSetItem {
  id: string;
  question: string;
  answer: string;
  isMarked: string;
  createdAt: string;
  updatedAt: string;
  flashsetId: string;
}

export interface FlashSetItemCreateDTO {
  answer: string;
  question: string;
  orderPosition: number;
}
