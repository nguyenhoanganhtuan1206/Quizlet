import { FlashSet } from "../flash_set/flashSetTypes";
import { Folder, FolderSummaryDTO } from "./folderTypes";

export interface FolderFlashSetItemDetailsResponse {
  folder: Folder;
  foldersSummaryChildren: FolderSummaryDTO[];
  flashSets: FlashSet[];
}
