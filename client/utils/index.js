import { parseISO, format as f } from 'date-fns'

export const format = (val, pattern = 'yyyy-MM-dd HH:mm:ss') => {
  return f(parseISO(val), pattern)
}
