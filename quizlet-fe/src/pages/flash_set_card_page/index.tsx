import { Navigate, useParams } from "react-router-dom";

import { useFetchFlashSetItemByIdQuery } from "@/store";

import { Skeleton } from "@/shared/components";
import { FlashCardHeader, FlashCardList } from "@/components";

const LoadingSkeleton = () => {
  return (
    <>
      {/**
       * Loading for Header
       */}
      <div className="grid grid-cols-5 gap-4">
        <Skeleton
          textBars={1}
          wrapperClassName="col-span-3"
          className="h-full w-[90%]"
          variant="text"
        />

        <div className="col-span-2 flex justify-end">
          <Skeleton
            variant="button"
            className="mr-5 h-[35px] w-[35%] rounded-[20px]"
          />

          <Skeleton
            variant="button"
            className="h-[35px] w-[25%] rounded-[15px]"
          />
        </div>
      </div>
      {/**
       * Loading for Header
       */}

      {/**
       * Loading for Title
       */}
      <Skeleton
        textBars={1}
        wrapperClassName="col-span-3"
        className="h-[35px] w-[70%] mt-5"
        variant="text"
      />

      {/**
       * Loading for FlashCard Item Slip
       */}
      <Skeleton
        textBars={1}
        wrapperClassName="col-span-3"
        className="h-[250px] w-[90%] mt-5"
        variant="text"
      />
    </>
  );
};

export default function FlashCardPage() {
  const { flashCardId } = useParams<{ flashCardId: string }>();

  const { isFetching, isLoading, isError } = useFetchFlashSetItemByIdQuery(
    flashCardId ?? "",
    {
      skip: !flashCardId,
    }
  );

  if (!flashCardId) {
    return <Navigate to="/not-found" replace />;
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      {/**
       * Header
       */}
      <FlashCardHeader />
      {/**
       * Header
       */}

      {/**
       * Middle
       */}
      <FlashCardList />
    </div>
  );
}
