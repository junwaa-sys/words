export async function fetchTestSetting(token) {
  try {
    const settings = await fetch('api/test/setting/get', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    const jsonSettings = await settings.json()
    return jsonSettings
  } catch (error) {
    console.log(error)
  }
}

export async function addTestSetting(data) {
  try {
    const addedSetting = await fetch('api/test/setting/add', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const jsonData = await addedSetting.json()
    return jsonData
  } catch (error) {
    console.log(error)
  }
}

export async function updateTestSetting(data) {
  try {
    const updatedSetting = await fetch('api/test/setting/update', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const jsonData = await updatedSetting.json()
    return jsonData
  } catch (error) {
    console.log(error)
  }
}

export async function fetchTestWords(data) {
  try {
    const testWords = await fetch(`api/test/words/get`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const jsonData = await testWords.json()
    return jsonData
  } catch (error) {
    console.log(error)
  }
}

export async function addTestResult(data) {
  try {
    const testResult = await fetch('api/test/words/result', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const jsonData = await testResult.json()
    return jsonData
  } catch (error) {
    console.log(error)
  }
}
