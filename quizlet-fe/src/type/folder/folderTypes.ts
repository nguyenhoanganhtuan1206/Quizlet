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
  numberOfChildrenFolders: number;
  numberOfFlashSets: number;
}

export interface FolderCreationRequestDTO {
  name: string;
  description: string;
  folderChildIds: string[];
}
