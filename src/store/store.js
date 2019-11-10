import { store as config } from 'config'

const ls = window.localStorage

const getData = () => JSON.parse(ls.getItem(config.userKey))

/**
 * A simple data store based on localStorage, which
 * currently stores the entire JSON-encoded object in a
 * single entry.
 */
const store = {
  get(item) {
    return (getData() || {})[item]
  },

  set(item, value) {
    const updates = {
      ...getData(),
      [item]: value
    }

    ls.setItem(config.userKey, JSON.stringify(updates))
  }
}

export default store
