import React, { useState, Fragment } from 'react'

import globalStyles from '/shared/global.scss'
import formStyles from '/forms/forms.scss'

// const searchLocations = (searchText, coordinates) => {
//   try {
//     return searchClient(searchText, coordinates)
//   } catch (e) {
//     return [
//       {
//         text: 'Search failed'
//       }
//     ]
//   }
// }

// const disableSearch = input => {
//   input.setAttribute('disabled', true)
//   input.setAttribute('readonly', true)

//   return () => {
//     input.removeAttribute('disabled')
//     input.removeAttribute('readonly')
//     input.focus()
//   }
// }

// const makeBold = (str, find) => {
//   const re = new RegExp(find, 'gi')

//   return str.replace(re, `<strong>${find}</strong>`)
// }

// const handleSearchInput = (coords, setState) => async e => {
//   const searchInput = e.target
//   const enableSearch = disableSearch(searchInput)
//   const searchText = searchInput.value
//   const results = await searchLocations(searchText, coords)

//   await setState({
//     searchText,
//     results
//   })

//   enableSearch()
// }

const handleSearchResultSelect = (
  setState,
  onLocationSelect
) => result => () => {
  setState({
    searchText: result.displayName,
    results: []
  })

  onLocationSelect(result)
}

const handleLocationSelect = setState => result => {
  setState({
    selectedLocation: result
  })
}

const handleLocationSave = (user, selectedLocation, setState) => async () => {
  if (selectedLocation != null) {
    await user.saveLocation(selectedLocation)
    setState()
  }
}

const LocationSearch = ({ coords, onLocationSelect }) => {
  const [{ searchText, results }, setState] = useState({
    searchText: '',
    results: null
  })

  const handleResultSelect = handleSearchResultSelect(
    setState,
    onLocationSelect
  )

  return (
    <Fragment>
      <input
        type="search"
        value={searchText}
        placeholder="Search locations"
        onInput={handleSearchInput(coords, setState)}
      />
      <ul
        style={{
          display: results && results.length > 0 ? 'block' : 'none'
        }}
        {...classNames(globalStyles.listUnstyled, styles.searchResultsList)}>
        {results &&
          results.map(result => (
            <li
              onClick={handleResultSelect(result)}
              innerHTML={makeBold(result.displayName, searchText)}></li>
          ))}
      </ul>
    </Fragment>
  )
}

export default LocationSearch
