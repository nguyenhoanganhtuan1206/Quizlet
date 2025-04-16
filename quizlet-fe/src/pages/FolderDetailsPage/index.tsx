import { Navigate, useParams } from "react-router-dom";

import { useFetchFolderByIdQuery } from "../../store";
import { ErrorComponent, Skeleton } from "../../shared/components";
import {
  BreadCrumbNavigation,
  FolderDetails,
} from "../../components/your_library";

export default function FolderDetailsPage() {
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

  console.log("folderDetails", folderDetails);

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

  return (
    <div>
      <BreadCrumbNavigation
        currentPage={folderDetails.folder.name}
        allPages={allPages}
      />

      <FolderDetails folderDetails={folderDetails} />
    </div>
  );
}
