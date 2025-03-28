import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useCallback } from "react";

export default function useThunk() {
  const dispatch = useDispatch<AppDispatch>();
  const {} = useSelector((rootState: RootState) => rootState);

  const runThunk = useCallback(() => {}, [dispatch]);
}
