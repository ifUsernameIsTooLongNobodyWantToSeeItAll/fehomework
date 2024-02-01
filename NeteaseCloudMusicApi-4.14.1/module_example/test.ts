import {banner, lyric} from 'NeteaseCloudMusicApi-4.14.1'

banner({type: 0}).then((res) => {
  console.log(res)
})
lyric({
  id: '33894312',
}).then((res) => {
  console.log(res)
})
