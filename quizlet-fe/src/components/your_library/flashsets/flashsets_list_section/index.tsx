import "./FlashSetListSection.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, fetchFlashSets, RootState } from "../../../../store";

import AssemblyAvatar from "../../../AssemblyAvatar";
import {
  AssemblyCard,
  ErrorComponent,
  Skeleton,
} from "../../../../shared/components";
import { decodeToken, getCurrentToken } from "../../../../utils";

export default function FlashSetListSection() {
  const currentUser = decodeToken(getCurrentToken());
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector(
    (rootState: RootState) => rootState.flashSetSlice
  );

  useEffect(() => {
    dispatch(fetchFlashSets(currentUser.user_id));
  }, [currentUser.user_id, dispatch]);

  if (isLoading) {
    return (
      <Skeleton variant="section" className="w-full" times={1}>
        <Skeleton
          textBars={data.length % 2 > 2 ? data.length % 2 : 3}
          className="mt-5"
          variant="text"
          height="45px"
          width="100%"
        />
      </Skeleton>
    );
  }

  if (error) {
    toast.error("Something went wrong!! Please try it again!");
    return <ErrorComponent />;
  }

  return (
    <ul>
      {data.map((flashset) => {
        return (
          <li key={flashset.id}>
            <AssemblyCard
              className="flashset-list__card mt-5"
              contentClassName="flashset-list__card-content"
            >
              <div className="flashset-list__card-info">
                <p>
                  {flashset.flashSetItemCount > 1
                    ? `${flashset.flashSetItemCount} items`
                    : `${flashset.flashSetItemCount} item`}
                </p>

                <div className="flex pl-5 items-center">
                  <AssemblyAvatar
                    imagePath="https://graph.facebook.com/1191245547971182/picture?type=large"
                    height="20px"
                    width="20px"
                  />
                  <span className="ml-3">{currentUser.sub}</span>
                </div>
              </div>
              <p className="text-[1.8rem] font-bold">{flashset.name}</p>
            </AssemblyCard>
          </li>
        );
      })}
    </ul>
  );
}
