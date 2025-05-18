import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToken } from "./baseQueryWithToken";
import { FlashSetItem, FlashSetItemCreateDTO } from "@/type";

type FlashSetItemCreationProps = {
  flashSetId: string;
  flashSetItemDTO: FlashSetItemCreateDTO;
};

export const flashSetItemApis = createApi({
  reducerPath: "flashSetItems",
  baseQuery: baseQueryWithToken,
  tagTypes: ["FlashSetItem"],
  endpoints: (builder) => ({
    fetchFlashSetItemById: builder.query<
      FlashSetItem, // Return Types
      string // Arg
    >({
      query: (id) => {
        return {
          url: `flashsetitems/${id}`,
          method: "GET",
        };
      },
    }),
    createFlashSetItem: builder.mutation<
      FlashSetItem, // Return Types
      FlashSetItemCreationProps // Arg
    >({
      query: ({ flashSetId, flashSetItemDTO }) => {
        return {
          url: `flashsetitems/${flashSetId}/flashset`,
          method: "POST",
          body: flashSetItemDTO,
        };
      },
    }),
  }),
});

export const { useFetchFlashSetItemByIdQuery, useCreateFlashSetItemMutation } =
  flashSetItemApis;
