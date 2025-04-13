import "./FolderListSection.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CiFolderOn } from "react-icons/ci";

import {
  AssemblyCard,
  ErrorComponent,
  Skeleton,
} from "../../../shared/components";
import { AppDispatch, fetchFolders, RootState } from "../../../store";
import { decodeToken, getCurrentToken } from "../../../utils";

export default function FolderListSection() {
  const currentUser = decodeToken(getCurrentToken());
  const dispatch = useDispatch<AppDispatch>();
  const { data, error, isLoading } = useSelector(
    (state: RootState) => state.folder
  );

  useEffect(() => {
    dispatch(fetchFolders(currentUser.user_id));
  }, []);

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

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <ul className="mt-10">
      {data.length === 0 && <div>Folder still is empty. Let create it</div>}

      {data.length > 0 &&
        data.map((folder) => {
          return (
            <li key={folder.id} className="mt-5">
              <AssemblyCard
                path={`/libraries/folders/${folder.id}`}
                className={"folder__list-card"}
                contentClassName="folder__list-card-content"
              >
                <div className="flex">
                  <span className="border-r-white border-r-2 pr-3">
                    {folder.flashSetCount !== 0 && folder.flashSetCount > 1
                      ? `${folder.flashSetCount} items`
                      : `${folder.flashSetCount} item`}
                  </span>

                  <span className="pl-3">
                    {folder.foldersChildrenCount !== 0 &&
                    folder.foldersChildrenCount > 1
                      ? `${folder.foldersChildrenCount} folders`
                      : `${folder.foldersChildrenCount} folder`}
                  </span>
                </div>

                <div className="flex items-center">
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
