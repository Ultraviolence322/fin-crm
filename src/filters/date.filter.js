import store from '@/store'

export default function dateFilter(val, type = 'data') {
  const options = {}

  if (type.includes('data')) {
    options.day = 'numeric'
    options.month = 'short'
    options.year = 'numeric'
  }

  if (type.includes('time')) {
    options.hour = 'numeric'
    options.minute = 'numeric'
    options.second = 'numeric'
  }

  const key = store.getters.info.locales || 'ru-RU'

  return new Intl.DateTimeFormat(key, options).format(val)
}