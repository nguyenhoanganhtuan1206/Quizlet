import { useParams } from "react-router-dom";

export default function FolderDetailsPage() {
  const folderId = useParams<{ folderId: string }>();

  console.log("folderId", folderId);

  return <div>FolderDetailsPage</div>;
}
