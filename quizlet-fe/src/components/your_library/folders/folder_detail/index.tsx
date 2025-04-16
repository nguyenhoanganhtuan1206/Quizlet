import { CiFolderOn } from "react-icons/ci";

import { decodeToken, getCurrentToken } from "../../../../utils";

import AssemblyAvatar from "../../../AssemblyAvatar";
import { AssemblyCard } from "../../../../shared/components";
import { FolderFlashSetItemDetailsResponse } from "../../../../type";

type FolderDetailsType = {
  folderDetails: FolderFlashSetItemDetailsResponse;
};

export default function FolderDetails({ folderDetails }: FolderDetailsType) {
  const currentUser = decodeToken(getCurrentToken());
  
  return (
    <>
      {/* Folder List Section */}
      {folderDetails.foldersSummaryChildren &&
        folderDetails.foldersSummaryChildren.length > 0 && (
          <div>
            <h3 className="text-white text-4xl font-bold mt-5">Folder List</h3>
            <ul>
              {folderDetails.foldersSummaryChildren.map((folder) => (
                <li key={folder.id}>
                  <AssemblyCard
                    // path={`/libraries/folders/${folder.id}`} // Uncomment if needed
                    className="mt-5 folder__list-card"
                    contentClassName="folder__list-card-content"
                  >
                    <div className="flex">
                      <span className="border-r-white border-r-2 pr-3">
                        {folder.numberOfFlashSets !== 0 &&
                        folder.numberOfFlashSets > 1
                          ? `${folder.numberOfFlashSets} items`
                          : `${folder.numberOfFlashSets} item`}
                      </span>
                      <span className="pl-3">
                        {folder.numberOfChildrenFolders !== 0 &&
                        folder.numberOfChildrenFolders > 1
                          ? `${folder.numberOfChildrenFolders} folders`
                          : `${folder.numberOfChildrenFolders} folder`}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CiFolderOn className="text-[2rem]" />
                      <p className="ml-3">{folder.name}</p>
                    </div>
                  </AssemblyCard>
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* FlashSet List Section */}
      {folderDetails.flashSets && folderDetails.flashSets.length > 0 && (
        <div>
          <h3 className="text-white text-4xl font-bold mt-10 border-t-2 pt-5 border-t-gray-500">
            FlashSet List
          </h3>
          <ul>
            {folderDetails.flashSets.map((flashSet) => (
              <li key={flashSet.id}>
                <AssemblyCard
                  className="mt-5 flashset-list__card"
                  contentClassName="flashset-list__card-content"
                >
                  <div className="flashset-list__card-info">
                    <div className="flex pl-5 items-center">
                      <AssemblyAvatar
                        imagePath="https://graph.facebook.com/1191245547971182/picture?type=large"
                        height="20px"
                        width="20px"
                      />
                      
                      <span className="ml-3">{currentUser.sub}</span>
                    </div>
                  </div>
                  <p className="text-[1.8rem] font-bold">{flashSet.name}</p>
                </AssemblyCard>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
