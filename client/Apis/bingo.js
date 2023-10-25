export async function getLiveGames(token) {
  try {
    //fetch live games
    const response = await fetch(`api/bingo/get`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}
