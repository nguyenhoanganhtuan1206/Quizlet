import { FlashSet } from "../flash_set/flashSetTypes";

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
  flashSets: FlashSet[];
  foldersChild: Folder[];
}

export interface FolderCreateUpdateRequestDTO {
  name: string;
  description: string;
  folderChildIds: string[];
  flashSetIds: string[];
}
