import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

export const nowDate = () => dayjs().tz()
export const targetDate = (date: Dayjs) => dayjs(date).tz()
export const targetDateF = (date: Dayjs, format: string) =>
  dayjs(date).tz().format(format)
export const startOfMonth = (date: Dayjs, format?: string) =>
  targetDate(date).startOf('month').format(format)
export const endOfLastMonth = (date: Dayjs, format?: string) =>
  targetDate(date).subtract(1, 'month').tz().endOf('month').format(format)
export const endOfMonth = (date: Dayjs, format?: string) =>
  targetDate(date).endOf('month').format(format)
export const startOfNextMonth = (date: Dayjs, format?: string) =>
  targetDate(date).add(1, 'month').endOf('month').format(format)
