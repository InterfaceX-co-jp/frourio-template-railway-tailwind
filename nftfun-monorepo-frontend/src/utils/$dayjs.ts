import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localeData)
dayjs.extend(relativeTime)

dayjs.tz.setDefault('Asia/Tokyo')

const formatMap = {
  "HH:mm": "HH:mm",
  'MM/DD': 'MM/DD',
  "YYYY-MM-DD": "YYYY-MM-DD",
  'YYYY年MM月DD日': 'YYYY年MM月DD日',
  'YYYY年MM月DD日_HH:mm': 'YYYY年MM月DD日 HH:mm',
  'YYYY年MM月DD日_HH:mm:ss': 'YYYY年MM月DD日 HH:mm:ss'
}


const dayMap =  { 0: '日', 1: '月', 2: '火', 3: '水', 4: '木', 5: '金', 6: '土' }

export type $DayNum = keyof typeof dayMap

export const $getDayLabel = (dayNum: $DayNum) => {
  return dayMap[dayNum]
}

export const $formatDate = ({
  date,
  format
}: {
  date: string | number | Date
  format: keyof typeof formatMap
}): string => {
  const parsed = dayjs.utc(date)

  return parsed.tz().format(formatMap[format]) // NOTE: tzはデフォルトセットしても常にコールする必要がある @see: https://github.com/iamkun/dayjs/issues/1195
}

export const $dayjs = dayjs