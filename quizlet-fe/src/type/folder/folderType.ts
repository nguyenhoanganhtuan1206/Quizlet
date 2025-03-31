export interface Folder {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface FolderSummaryDTO {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  flashSetCount: number;
  foldersChildrenCount: number;
}

export interface FolderCreationRequestDTO {
  name: string;
  description: string;
}
