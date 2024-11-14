import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosApi from "../../axiosApi.ts";
import { Show, ShowBlock } from "../../types";

interface ShowState {
  shows: Show[];
  showBlock: ShowBlock | null;
  loading: boolean;
  error: boolean;
}

export const initialState: ShowState = {
  shows: [],
  showBlock: {
    name: "",
    summary: "",
    image: {
      original: "",
    },
  },
  loading: false,
  error: false,
};

export const fetchShowFilmAll = createAsyncThunk<Show[], string>(
  "show/fetchShowFilmAll",
  async (name: string) => {
    const response: AxiosResponse<{ show: Show }[]> = await axiosApi(
      `search/shows?q=${name}`,
    );
    return response.data.map((res) => res.show);
  },
);

export const fetchFilmByInfo = createAsyncThunk<ShowBlock | null, string>(
  "show/fetchFilmByInfo",
  async (id: string) => {
    try {
      const { data: showBlock } = await axiosApi.get<ShowBlock | null>(
        `shows/${id}`,
      );
      return showBlock || null;
    } catch (error) {
      console.error("Error fetching show data:", error);
      return null;
    }
  },
);

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowFilmAll.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchShowFilmAll.fulfilled, (state, action) => {
        state.loading = false;
        state.shows = action.payload || [];
      })
      .addCase(fetchShowFilmAll.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchFilmByInfo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchFilmByInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.showBlock = action.payload;
      })
      .addCase(fetchFilmByInfo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export type { ShowState };
export const showReducer = showSlice.reducer;
