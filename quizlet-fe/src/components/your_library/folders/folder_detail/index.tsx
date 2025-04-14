import { CiFolderOn } from "react-icons/ci";

import { AssemblyCard } from "../../../../shared/components";
import { FolderFlashSetItemDetailsResponse } from "../../../../type";

type FolderDetailsType = {
  folderDetails: FolderFlashSetItemDetailsResponse;
};

export default function FolderDetails({ folderDetails }: FolderDetailsType) {
  return (
    <>
      <h3 className="text-white text-4xl font-bold mt-5">Folder List</h3>
      {folderDetails.foldersChildren.map((folderChildren) => {
        return (
          <li key={folderChildren.id}>
            <AssemblyCard
              // path={`/libraries/folders/${folder.id}`}
              className="mt-5 folder__list-card"
              contentClassName="folder__list-card-content"
            >
              <div className="flex">
                {/* <span className="border-r-white border-r-2 pr-3">
                {folder.flashSetCount !== 0 && folder.flashSetCount > 1
                  ? `${folder.flashSetCount} items`
                  : `${folder.flashSetCount} item`}
              </span> */}

                {/* <span className="pl-3">
                {folder.flashSetCount !== 0 && folder.flashSetCount > 1
                  ? `${folder.flashSetCount} folders`
                  : `${folder.flashSetCount} folder`}
              </span> */}
              </div>

              <div className="flex items-center">
                <CiFolderOn className="text-[2rem]" />
                <p className="ml-3">{folderChildren.name}</p>
              </div>
            </AssemblyCard>
          </li>
        );
      })}

      <h3 className="text-white text-4xl font-bold mt-10 border-t-2 pt-5 border-t-gray-500">
        FlashSet List
      </h3>
      {folderDetails.flashSets.map((flashSet) => {
        return (
          <li key={flashSet.id}>
            <AssemblyCard
              className="mt-5 flashset-list__card"
              contentClassName="flashset-list__card-content"
            >
              <div className="flashset-list__card-info">
                {/* <p>
                  {flashSet.flashSetItemCount > 1
                    ? `${flashSet.flashSetItemCount} items`
                    : `${flashSet.flashSetItemCount} item`}
                </p> */}

                <div className="flex pl-5 items-center">
                  {/* <AssemblyAvatar
                    imagePath="https://graph.facebook.com/1191245547971182/picture?type=large"
                    height="20px"
                    width="20px"
                  /> */}
                  {/* <span className="ml-3">{currentUser.sub}</span> */}
                </div>
              </div>
              <p className="text-[1.8rem] font-bold">{flashSet.name}</p>
            </AssemblyCard>
          </li>
        );
      })}
    </>
  );
}
