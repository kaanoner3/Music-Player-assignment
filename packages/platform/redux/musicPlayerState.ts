import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { AudioItem } from '@skoove/home.content'

export interface ReducerStateType {
  currentSongIndex: number
  duration: number
  progression: number
  songs: AudioItem[]
  sliderProgression: number
  activeSong?: AudioItem
}

const initialState: ReducerStateType = {
  currentSongIndex: 0,
  duration: 0,
  progression: 0,
  sliderProgression: 0,
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
      state.duration = currentSong.totalDurationMs
      state.progression = 0
      state.currentSongIndex = action.payload
    },
    setProgression: (state, action: PayloadAction<number>) => {
      state.progression = (state.duration * action.payload) / 100
      state.sliderProgression = action.payload
    },
  },
})

export const { setStore, setCurrentSong, setProgression } = musicPlayerStateSlice.actions

export const store = configureStore({
  reducer: musicPlayerStateSlice.reducer,
})
