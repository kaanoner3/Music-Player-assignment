export type AudioItem = {
  title: string
  audio: string
  cover: string
  totalDurationMs: number
}

export type ContentResponse = {
  data: AudioItem[]
}
