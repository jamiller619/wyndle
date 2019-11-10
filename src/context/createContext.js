export default function(externalState) {
  const state = externalState
  return {
    useContext: () => state
  }
}
