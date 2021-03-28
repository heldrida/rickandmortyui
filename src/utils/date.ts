export const formatDate = (timestamp: string) => {
  let options: Record<string, string> = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  options.timeZone = 'EST'
  options.timeZoneName = 'short'
  var dt = new Date(timestamp)
  var locale = dt.toLocaleDateString('en-US', options).split(',')
  return `${locale[1]},${locale[2]}`
  }