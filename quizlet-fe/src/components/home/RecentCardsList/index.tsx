import { toast } from "react-toastify";

import { useGetFlashSetQuery } from "../../../store";

import RecentCardItem from "../RecentCardItem";
import { Skeleton } from "../../../shared/components";

type RecentCardListProps = {
  userId: string;
};

export default function RecentCardsList({
  userId,
}: Readonly<RecentCardListProps>) {
  const { data: flashSets, isLoading, isError } = useGetFlashSetQuery(userId);

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

  if (isError) {
    toast.error("Something went wrong!");
  }

  return (
    <>
      <h3 className="text-white text-[1.6rem] font-bold">Recent Flashcards</h3>
      <div className="grid grid-cols-2 gap-4">
        {flashSets?.map((flashset) => {
          return (
            <RecentCardItem
              key={flashset.id}
              name={flashset.name}
              isActive={flashset.drafted}
            />
          );
        })}
      </div>
    </>
  );
}
