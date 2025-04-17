import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import { AppDispatch, initialNavigationBreadCrumb, useFetchFolderByIdQuery } from "../../store";
import { ErrorComponent, Skeleton } from "../../shared/components";
import {
  BreadCrumbNavigation,
  FolderDetailHeader,
  FolderDetails,
} from "../../components/your_library";

export default function FolderDetailsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { folderId } = useParams<{ folderId: string }>();

  const {
    data: folderDetails,
    isLoading,
    isError,
  } = useFetchFolderByIdQuery(folderId ?? "", {
    skip: !folderId, // Skip the query if folderId is undefined
  });

  if (!folderId) {
    return <Navigate to="/not-found" replace />;
  }

  if (isLoading) {
    return (
      <Skeleton variant="section" className="w-full" times={2}>
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

  if (!folderDetails) {
    return <div>Is empty</div>;
  }

  // Define all pages for Breadcrumb
  const allPages = [
    { title: "Folders", path: "/libraries" },
    {
      title: `${folderDetails.folder.name}`,
      path: `/libraries/folders/${folderId}`,
    },
  ];

  dispatch(initialNavigationBreadCrumb(allPages));

  return (
    <>
      <FolderDetailHeader folderDetails={folderDetails.folder} />

      <BreadCrumbNavigation
        wrapperClassName="px-2 py-10"
        currentPage={folderDetails.folder.name}
        allPages={allPages}
      />

      <FolderDetails folderDetails={folderDetails} />
    </>
  );
}
