import { FlashSet } from "../flash_set/flashSetTypes";
import { Folder } from "./folderTypes";

export interface FolderFlashSetItemDetailsResponse {
  folder: Folder;
  foldersChildren: Folder[];
  flashSets: FlashSet[];
}
