import { mapbox } from 'config'

const fetchLocation = async place => {
  const client = await mapbox.getClient()
  const response = await client
    .forwardGeocode({
      query: place
    })
    .send()

  return response.body.features[0]
}

const filterLocationContext = (context, filter) =>
  context.filter(({ id }) => id.includes(filter))

const parseLocationContext = ({ context }) => {
  const cityFilter = filterLocationContext(context, 'place')
  const regionFilter = filterLocationContext(context, 'region')

  return {
    city: cityFilter.length && cityFilter[0].text,
    region: regionFilter.length && regionFilter[0].text
  }
}

const parseLocationResponse = location => {
  const { city, region } = parseLocationContext(location)

  return {
    id: location.id,
    latitude: location.center[1],
    longitude: location.center[0],
    address: location.place_name,
    city,
    region
  }
}

export const createForwardClient = async () => {
  const client = await mapbox.getClient()
  let request = null

  return async (searchText, coordinates) => {
    if (request && request.abort) {
      request.abort()
    }

    if (searchText && searchText.length > 1) {
      const config = {
        query: searchText,
        limit: 5,
        autocomplete: true,
        types: ['place']
      }

      if (coordinates) {
        config.proximity = coordinates
      }

      request = client.forwardGeocode(config)

      const response = await request.send()

      return response.body.features.map(parseLocationResponse)
    }
  }
}

export const reverseGeocode = async ({ longitude, latitude }) => {
  const client = await mapbox.getClient()

  const response = await client
    .reverseGeocode({
      query: [longitude, latitude]
    })
    .send()

  return parseLocationResponse(response.body.features[0])
}
