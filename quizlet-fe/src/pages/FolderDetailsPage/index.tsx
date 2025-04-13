import { Navigate, useParams } from "react-router-dom";
import { CiFolderOn } from "react-icons/ci";

import { useFetchFolderByIdQuery } from "../../store";
import {
  AssemblyCard,
  ErrorComponent,
  Skeleton,
} from "../../shared/components";
import { BreadCrumbNavigation } from "../../components/your_library";

export default function FolderDetailsPage() {
  const { folderId } = useParams<{ folderId: string }>();

  if (!folderId) {
    return <Navigate to="/not-found" replace />;
  }

  console.log("folderId", folderId);

  const {
    data: folderDetail,
    isLoading,
    isError,
  } = useFetchFolderByIdQuery(folderId);

  if (isLoading) {
    return (
      <Skeleton variant="section" className="w-full" times={1}>
        <Skeleton
          textBars={2}
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

  if (!folderDetail) {
    return <div>Is empty</div>;
  }

  const allPages = [
    { title: "Folders", path: "/libraries" },
    {
      title: `${folderDetail.folder.name}`,
      path: `/libraries/folders/${folderId}`,
    },
  ];

  return (
    <div>
      <BreadCrumbNavigation
        currentPage={folderDetail.folder.name}
        allPages={allPages}
      />

      <h3 className="text-white text-4xl font-bold mt-5">Folder List</h3>
      {folderDetail.foldersChildren.map((folderChildren) => {
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
      {folderDetail.flashSets.map((flashSet) => {
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
    </div>
  );
}
