import { useDispatch, useSelector } from "react-redux";
import { CiFolderOn } from "react-icons/ci";
import { FC } from "react";
import classNames from "classnames";

import { decodeToken, getCurrentToken } from "../../../../utils";

import { JwtPayload } from "jwt-decode";
import { AppDispatch, RootState } from "../../../../store";
import AssemblyAvatar from "../../../AssemblyAvatar";
import { AssemblyCard } from "../../../../shared/components";
import { FlashSet, Folder, FolderSummaryDTO } from "../../../../type";
import {
  addMorePage,
  BreadcrumbNavigationItem,
} from "../../../../store/slices/navigateBreadCrumbSlices";
import BreadCrumbNavigation from "../../breadcrumb_navigation";
import EmptyMaterials from "../../empty_materials";

type FolderDetailsType = {
  folderDetails: FolderSummaryDTO;
};

interface FlashSetsListProps {
  flashSets: FlashSet[];
  currentUser: JwtPayload;
}

interface FolderListProps {
  folders: FolderSummaryDTO;
  onClickNavigationFolder: (folder: Folder) => void;
  numberOfFlashSets: number;
  numberOfFoldersChild: number;
}

/**
 * FlashSet Cards List
 */
const FlashSetsList: FC<FlashSetsListProps> = ({ currentUser, flashSets }) => {
  return (
    <>
      <h3
        className={classNames("text-white text-4xl font-bold pt-5 mb-3", {
          "mt-10 border-t-gray-500 border-t-2": flashSets.length > 0,
        })}
      >
        FlashSet List
      </h3>
      <ul>
        {flashSets.map((flashSet) => (
          <li key={flashSet.id}>
            <AssemblyCard
              className="mt-5 flashset-list__card px-3 pt-6 pb-5"
              contentClassName="flashset-list__card-content"
            >
              <div className="flashset-list__card-info">
                <div className="flex items-center">
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
    </>
  );
};

/**
 * Folders List
 */
const FoldersList: FC<FolderListProps> = ({
  folders,
  onClickNavigationFolder,
  numberOfFlashSets,
  numberOfFoldersChild,
}) => {
  return (
    <>
      <h3 className="text-white text-4xl font-bold mt-5 mb-3">Folder List</h3>
      <ul>
        {folders.foldersChild.map((folder) => (
          <li key={folder.id}>
            <AssemblyCard
              onClick={() => onClickNavigationFolder(folder)}
              path={`/libraries/folders/${folder.id}`}
              className="mt-5 folder__list-card px-3 py-4"
              contentClassName="folder__list-card-content"
            >
              <div className="flex items-center">
                <span className="border-r-white border-r-2 pr-3">
                  {numberOfFlashSets !== 0 && numberOfFlashSets > 1
                    ? `${numberOfFlashSets} items`
                    : `${numberOfFlashSets} item`}
                </span>
                <span className="pl-3">
                  {numberOfFoldersChild !== 0 && numberOfFoldersChild > 1
                    ? `${numberOfFoldersChild} folders`
                    : `${numberOfFoldersChild} folder`}
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
    </>
  );
};

export default function FolderDetails({ folderDetails }: FolderDetailsType) {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = decodeToken(getCurrentToken());
  const navigationBreadCrumbState = useSelector(
    (state: RootState) => state.navigationBreadCrumb
  );

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
      {navigationBreadCrumbState.allPages.length > 1 && (
        <BreadCrumbNavigation
          className="text-[1.7rem]"
          wrapperClassName="px-2 py-10"
          currentPage={folderDetails.name}
        />
      )}

      {folderDetails.flashSets && folderDetails.flashSets.length > 0 && (
        <FlashSetsList
          currentUser={currentUser}
          flashSets={folderDetails.flashSets}
        />
      )}

      {/* Folder List Section */}
      {folderDetails.foldersChild && folderDetails.foldersChild.length > 0 && (
        <FoldersList
          folders={folderDetails}
          onClickNavigationFolder={handleNavigateFolder}
          numberOfFlashSets={folderDetails.flashSets.length}
          numberOfFoldersChild={folderDetails.foldersChild.length}
        />
      )}
      {/* FlashSet List Section */}

      {folderDetails.flashSets.length === 0 &&
        folderDetails.foldersChild.length === 0 && <EmptyMaterials />}
    </>
  );
}
