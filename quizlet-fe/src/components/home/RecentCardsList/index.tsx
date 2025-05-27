import { toast } from "react-toastify";

import { Skeleton } from "../../../shared/components";
import { AppDispatch, fetchFlashSets, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import RecentCardItem from "../RecentCardItem";

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="grid-cols-1">
        <Skeleton variant="section" className="flex" times={1}>
          <Skeleton variant="icon" className="h-[45px] w-[45px] mr-5" />
          <Skeleton variant="text" textBars={2} />
        </Skeleton>
      </div>

      <div className="grid-cols-1">
        <Skeleton variant="section" className="flex" times={1}>
          <Skeleton variant="icon" className="h-[45px] w-[45px] mr-5" />
          <Skeleton variant="text" textBars={2} />
        </Skeleton>
      </div>

      <div className="grid-cols-1">
        <Skeleton variant="section" className="flex" times={1}>
          <Skeleton variant="icon" className="h-[45px] w-[45px] mr-5" />
          <Skeleton variant="text" textBars={2} />
        </Skeleton>
      </div>

      <div className="grid-cols-1">
        <Skeleton variant="section" className="flex" times={1}>
          <Skeleton variant="icon" className="h-[45px] w-[45px] mr-5" />
          <Skeleton variant="text" textBars={2} />
        </Skeleton>
      </div>
    </div>
  );
};

export default function RecentCardsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector(
    (rootState: RootState) => rootState.flashSetSlice
  );

  useEffect(() => {
    dispatch(fetchFlashSets());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSkeleton />;
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
              id={flashset.id}
              name={flashset.name}
              isActive={flashset.drafted}
            />
          );
        })}
    </div>
  );
}
