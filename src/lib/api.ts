// Method GET: https://mockapi.io/users
// With ID:    https://mockapi.io/users?userID=id
export async function getData(url: string, params: {}) {
  const postData = Object.entries(params).map((param) => {
    return `${param[0]}=${param[1]}`
  })
  const response = await fetch(`${url}?${postData}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'},
  })
  return response.json();
}

// Method POST: https://mockapi.io/users
export async function postData(url: string, data: {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
    credentials: "include",
    body: JSON.stringify(data)
  })
  return response.json();
}

// Method DELETE: https://mockapi.io/users?userID=id
export async function deleteData(url: string, params: {}) {
  const deleteData = Object.entries(params).map((param) => {
    return `${param[0]}=${param[1]}`
  })
  const response = await fetch(`${url}?${deleteData}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'},
  })
  return response.json()
}