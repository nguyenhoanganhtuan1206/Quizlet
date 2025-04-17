import { CiFolderOn } from "react-icons/ci";

import { decodeToken, getCurrentToken } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../../store";
import AssemblyAvatar from "../../../AssemblyAvatar";
import { AssemblyCard } from "../../../../shared/components";
import { Folder, FolderFlashSetItemDetailsResponse } from "../../../../type";
import {
  addMorePage,
  BreadcrumbNavigationItem,
} from "../../../../store/slices/navigateBreadCrumbSlices";
import BreadCrumbNavigation from "../../breadcrumb_navigation";

type FolderDetailsType = {
  folderDetails: FolderFlashSetItemDetailsResponse;
};

export default function FolderDetails({ folderDetails }: FolderDetailsType) {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = decodeToken(getCurrentToken());

  const handleNavigateFolder = (folder: Folder) => {
    if (!folder) {
      return;
    }

    const newNavigation: BreadcrumbNavigationItem = {
      path: `/libraries/folders/${folder.id}`,
      title: folder.name,
    };

    dispatch(addMorePage(newNavigation));
  };

  return (
    <>
      <BreadCrumbNavigation
        wrapperClassName="px-2 py-10"
        currentPage={folderDetails.folder.name}
      />

      {/* Folder List Section */}
      {folderDetails.foldersSummaryChildren &&
        folderDetails.foldersSummaryChildren.length > 0 && (
          <div>
            <h3 className="text-white text-4xl font-bold mt-5 mb-3">
              Folder List
            </h3>
            <ul>
              {folderDetails.foldersSummaryChildren.map((folder) => (
                <li key={folder.id}>
                  <AssemblyCard
                    onClick={() => handleNavigateFolder(folder)}
                    path={`/libraries/folders/${folder.id}`}
                    className="mt-5 folder__list-card px-3 py-4"
                    contentClassName="folder__list-card-content"
                  >
                    <div className="flex items-center">
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
                    <div className="flex items-center mt-2">
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
          <h3 className="text-white text-4xl font-bold mt-10 border-t-2 pt-5 border-t-gray-500 mb-3">
            FlashSet List
          </h3>
          <ul>
            {folderDetails.flashSets.map((flashSet) => (
              <li key={flashSet.id}>
                <AssemblyCard
                  className="mt-5 flashset-list__card px-3 pt-6 pb-5"
                  contentClassName="flashset-list__card-content"
                >
                  <div className="flashset-list__card-info">
                    <div className="flex pl-5 items-center">
                      <AssemblyAvatar
                        imagePath="https://graph.facebook.com/1191245547971182/picture?type=large"
                        height="20px"
                        width="20px"
                      />

                      <span className="ml-3 mt-3">{currentUser.sub}</span>
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
