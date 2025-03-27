import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchFolders, RootState } from "../../store";
import { useEffect } from "react";

export default function DevPage() {
  // const { data, isError, isLoading } = useSelector(
  //   (rootState: RootState) => rootState.folder
  // );
  const dispatch = useDispatch<AppDispatch>();

  console.log("fetchFolders()", fetchFolders());

  useEffect(() => {
    dispatch(fetchFolders());
  }, []);

  return <div></div>;
}
