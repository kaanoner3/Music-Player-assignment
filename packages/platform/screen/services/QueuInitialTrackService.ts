import { AudioItem } from '@skoove/home.content'
import TrackPlayer from 'react-native-track-player'

const addSongs = async (songs: AudioItem[]) => {
  const formattedSongs = songs.map((item, index) => ({
    id: index.toString(),
    url: item.audio,
    title: item.title,
    duration: item.totalDurationMs / 1000,
    artwork: item.cover,
  }))

  await TrackPlayer.add(formattedSongs)
}
export const QueueInitalTracksService = async (songs: AudioItem[]): Promise<void> => {
  await addSongs(songs)
}
