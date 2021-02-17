export function addOrUpdate(arr, item, append = false) {
  if (!item) { return }
  const i = arr.findIndex(i => i.id === item.id)
  i === -1 ? (append ? arr.push(item) : arr.unshift(item)) : arr.splice(i, 1, item)
}
export function remove(arr, item) {
  if (!item) { return }
  const i = arr.findIndex(i => i.id === item.id)
  if (i !== -1) { arr.splice(i, 1) }
}

export function sortByDate(a, b) {
  return new Date(b.startDate || b.date || b.createdAt) - new Date(a.startDate || a.date || a.createdAt)
}
