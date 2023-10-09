export async function fetchWords(token) {
  try {
    const words = await fetch('api/words/get', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const jsonData = await words.json()
    return jsonData
  } catch (error) {
    console.log(error)
  }
}

export async function addWord(data) {
  try {
    const addedWord = await fetch('api/words/add', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: data.word, userName: data.userName }),
    })
    const jsonData = await addedWord.json()
    return jsonData
  } catch (error) {
    console.log(error)
  }
}

export async function editWord(data) {
  try {
    const editedWord = await fetch(`api/words/edit/${data.id}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word: data.word, userName: data.userName }),
    })
  } catch (error) {
    console.log(error)
  }
}
