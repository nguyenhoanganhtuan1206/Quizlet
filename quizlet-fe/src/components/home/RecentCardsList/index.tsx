import { toast } from "react-toastify";

import RecentCardItem from "../RecentCardItem";
import { Skeleton } from "../../../shared/components";
import { AppDispatch, fetchFlashSets, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function RecentCardsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector(
    (rootState: RootState) => rootState.flashSetSlice
  );

  useEffect(() => {
    dispatch(fetchFlashSets());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-10">
        <div className="grid-cols-1">
          <Skeleton variant="section" times={1}>
            <Skeleton variant="icon" />
            <Skeleton variant="text" textBars={2} />
          </Skeleton>
        </div>

        <div className="grid-cols-1">
          <Skeleton variant="section" times={1}>
            <Skeleton variant="icon" />
            <Skeleton variant="text" textBars={2} />
          </Skeleton>
        </div>

        <div className="grid-cols-1">
          <Skeleton variant="section" times={1}>
            <Skeleton variant="icon" />
            <Skeleton variant="text" textBars={2} />
          </Skeleton>
        </div>

        <div className="grid-cols-1">
          <Skeleton variant="section" times={1}>
            <Skeleton variant="icon" />
            <Skeleton variant="text" textBars={2} />
          </Skeleton>
        </div>
      </div>
    );
  }

  if (error) {
    toast.error("Something went wrong!");
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {data &&
        data.map((flashset) => {
          return (
            <RecentCardItem
              key={flashset.id}
              name={flashset.name}
              isActive={flashset.drafted}
            />
          );
        })}
    </div>
  );
}
