import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { AudioItem } from '@skoove/home.content'

export interface ReducerStateType {
  currentSongIndex: number
  songs: AudioItem[]
  activeSong?: AudioItem
}

const initialState: ReducerStateType = {
  currentSongIndex: 0,
  songs: [],
  activeSong: undefined,
}

const musicPlayerStateSlice = createSlice({
  name: 'musicPlayerState',
  initialState,
  reducers: {
    setStore: (state, action: PayloadAction<AudioItem[]>) => {
      state.songs = action.payload
    },
    setCurrentSong: (state, action: PayloadAction<number>) => {
      const currentSong = state.songs[action.payload]
      state.activeSong = currentSong
      state.currentSongIndex = action.payload
    },
  },
})

export const { setStore, setCurrentSong } = musicPlayerStateSlice.actions

export const store = configureStore({
  reducer: musicPlayerStateSlice.reducer,
})
