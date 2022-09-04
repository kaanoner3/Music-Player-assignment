import { AudioItem } from '@skoove/home.content'
import { ReducerStateType } from '@skoove/platform.redux'
import React from 'react'
import TrackPlayer from 'react-native-track-player'
import { useSelector } from 'react-redux'

import { SetupService, QueueInitalTracksService } from './services'

export const PlayerSetupHOC: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const songs = useSelector<ReducerStateType, AudioItem[]>(state => state.songs)
  const [isPlayerReady, setIsPlayerReady] = React.useState<boolean>(false)

  React.useEffect(() => {
    async function run() {
      const isSetup = await SetupService()
      setIsPlayerReady(isSetup)
      const queue = await TrackPlayer.getQueue()
      if (isSetup && queue.length <= 0 && songs.length > 0) {
        await QueueInitalTracksService(songs)
      }
    }

    run()
  }, [songs])

  if (!isPlayerReady) return null //TODO: return loading view

  return <>{children}</>
}
