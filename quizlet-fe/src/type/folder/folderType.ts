import { FlashSet } from '../FlashSet/flashSetTypes';

export interface Folder {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface FolderYourLibraryResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  flashsets: FlashSet[];
}

export interface FolderCreationRequestDTO {
  name: string;
  description: string;
}
