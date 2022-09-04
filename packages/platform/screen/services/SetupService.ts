import TrackPlayer, { Capability } from 'react-native-track-player'

export const SetupService = async (): Promise<boolean> => {
  let isSetup = false
  try {
    // this method will only reject if player has not been setup yet
    await TrackPlayer.getCurrentTrack()
    isSetup = true
  } catch {
    await TrackPlayer.setupPlayer({ waitForBuffer: true })
    await TrackPlayer.updateOptions({
      stoppingAppPausesPlayback: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
        Capability.Skip,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SeekTo,
        Capability.Skip,
      ],
      progressUpdateEventInterval: 2,
    })

    isSetup = true
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return isSetup
  }
}
