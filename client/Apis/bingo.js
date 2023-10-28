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

export async function addGame(data) {
  try {
    //post data to create new game
    const response = await fetch(`api/bingo/create`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: data.userName }),
    })
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}
