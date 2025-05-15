import "./FolderListSection.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CiFolderOn } from "react-icons/ci";

import { Folder } from "../../../../type";

import { AssemblyCard, Skeleton } from "../../../../shared/components";
import { AppDispatch, fetchParentFolders, RootState } from "../../../../store";
import {
  addMorePage,
  BreadcrumbNavigationItem,
} from "../../../../store/slices/navigateBreadCrumbSlices";

export default function FolderListSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useSelector(
    (state: RootState) => state.folderSlice
  );

  useEffect(() => {
    dispatch(fetchParentFolders());
  }, [dispatch]);

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

  if (isLoading) {
    return (
      <Skeleton variant="section" className="w-full" times={1}>
        <Skeleton
          textBars={data.length % 2 > 0 ? data.length % 2 : 3}
          className="mt-5"
          variant="text"
          height="45px"
          width="100%"
        />
      </Skeleton>
    );
  }

  return (
    <ul className="mt-10">
      {data.length === 0 && <div>Folder still is empty. Let create it</div>}

      {data.length > 0 &&
        data.map((folder) => {
          const numberOfFlashSets = folder.flashSets.length;
          const numberOfFoldersChild = folder.foldersChild.length;

          return (
            <li key={folder.id} className="mt-5">
              <AssemblyCard
                onClick={() => handleNavigateFolder(folder)}
                path={`/libraries/folders/${folder.id}`}
                className="folder__list-card p-5"
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
          );
        })}
    </ul>
  );
}
