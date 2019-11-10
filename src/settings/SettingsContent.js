import React, { useEffect, useState, useRef, useContext, Fragment } from 'react'
import anime from 'animejs'
import { useDrag } from 'react-use-gesture'
import Highlighter from 'react-highlight-words'
import Table from '/table'

import user from '/user'
import { classNames } from '/shared/utils'

import globalStyles from '/shared/global.scss'
import styles from './settings-content.scss'

const saveLocation = (user, location, searchInputRef, setState) => async () => {
  if (location != null) {
    searchInputRef.current.value = ''

    try {
      await user.saveLocation(location)

      setState(prevState => ({
        ...prevState,
        searchResults: null,
        locations: [...prevState.locations, location]
      }))
    } catch (e) {
      setState(prevState => ({
        ...prevState,
        searchText: null,
        searchResults: null,
        error: {
          message: 'Unable to save location',
          actual: e
        }
      }))
    }
  }
}

const searchLocations = (searchClient, searchText, coordinates) => {
  try {
    return searchClient(searchText, coordinates)
  } catch (e) {
    return [
      {
        text: 'Search failed'
      }
    ]
  }
}

const handleSearchInput = (searchClient, coords, setState) => async e => {
  const searchInput = e.target
  const searchText = searchInput.value
  try {
    const searchResults = await searchLocations(
      searchClient,
      searchText,
      coords
    )

    setState(prevState => ({
      ...prevState,
      searchText,
      searchResults
    }))
  } catch (e) {}
}

const SearchResult = ({ searchWords, result, ...props }) => {
  return (
    <li {...props}>
      <Highlighter
        searchWords={searchWords}
        textToHighlight={result.displayName}
      />
    </li>
  )
}

const SavedLocation = ({ className, location }) => {
  const { displayName } = location
  const listItemRef = useRef()
  const bind = useDrag(({ movement, delta }) => {
    const targets = listItemRef.current
    const targetContainer = targets.closest('ul')
    const mx = movement[0]
    const lastMx = delta[0]
    const translateX = mx < 0 ? (mx < -100 ? -100 : lastMx) : 0

    anime({
      targets,
      translateX,
      easing: 'spring(0.6, 80, 100, 20)'
    })

    if (mx >= 0) return

    anime({
      targets: targetContainer,
      backgroundColor: [mx === 0 ? '#ef4b4b' : '#e6656e', '#ef4b4b']
    })
  })

  return (
    <div {...bind()} className={className} ref={listItemRef}>
      {displayName}
    </div>
  )
}

const SettingsContent = () => {
  const coords = null
  const searchInputRef = useRef()
  const [
    {
      searchClient,
      searchText,
      searchResults,
      locations,
      activeLocation,
      error
    },
    setState
  ] = useState({
    searchClient: null,
    searchText: null,
    searchResults: null,
    locations: user.getLocations(),
    activeLocation: user.getActiveLocation(),
    error: null
  })

  return (
    <Fragment>
      <section className={styles.section}>
        <Table header="Add Location">
          <div style={{ padding: 0 }}>
            {searchClient && (
              <input
                type="search"
                placeholder="Add location"
                ref={searchInputRef}
                onInput={handleSearchInput(searchClient, coords, setState)}
              />
            )}
            {searchResults && (
              <ul
                {...classNames(
                  globalStyles.listUnstyled,
                  styles.searchResultsList
                )}>
                {searchResults.map(result => (
                  <SearchResult
                    key={result.id}
                    onClick={saveLocation(
                      user,
                      result,
                      searchInputRef,
                      setState
                    )}
                    searchWords={searchText.split(' ')}
                    result={result.displayName}
                  />
                ))}
              </ul>
            )}
          </div>
        </Table>
      </section>
      <section className={styles.section}>
        <Table header="Saved Locations" className={styles.savedLocationsList}>
          <div>Current location</div>
          {locations &&
            locations.map(location => (
              <SavedLocation
                key={location.id}
                location={location}
                className={
                  activeLocation && activeLocation.id === location.id
                    ? 'active'
                    : ''
                }
              />
            ))}
        </Table>
      </section>
    </Fragment>
  )
}

export default SettingsContent
