export async function getTestHistory(token) {
  try {
    //fetch history list
    const response = await fetch('api/test/history/get', {
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
