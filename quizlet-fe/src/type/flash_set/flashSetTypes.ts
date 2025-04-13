export interface FlashSet {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  folderId: string;
  drafted: boolean;
}

export interface FlashSetSummaryDTO {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  folderId: string;
  drafted: boolean;
  flashSetItemCount: number;
}
