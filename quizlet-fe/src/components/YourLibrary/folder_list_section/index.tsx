import "./FolderListSection.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CiFolderOn } from "react-icons/ci";

import {
  AssemblyCard,
  ErrorComponent,
  Skeleton,
} from "../../../shared/components";
import { AppDispatch, fetchFolders, logout, RootState } from "../../../store";

export default function FolderListSection() {
  const currentUserId = useSelector(
    (rootState: RootState) => rootState.authProvider.jwtInfo?.user_id
  );
  const dispatch = useDispatch<AppDispatch>();
  const { data, isError, isLoading } = useSelector(
    (state: RootState) => state.folder
  );

  // useEffect(() => {
  //   if (!currentUserId) {
  //     dispatch(logout());
  //     return;
  //   }

  //   dispatch(fetchFolders(currentUserId));
  // }, []);

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

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <ul className="mt-10">
      {data.map((folder) => {
        return (
          <li key={folder.id} className="mt-5">
            <AssemblyCard
              path={`folders/${folder.id}`}
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
