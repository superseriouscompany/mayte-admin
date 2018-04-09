const baseUrl = window.location.href.match(/localhost/) ?
  'http://mayte.ngrok.io' :
  'https://api.joinunicorn.com'

function request(path, options = {}) {
  if( path[0] !== '/' ) path = `/${path}`;

  options.headers = options.headers || {}
  options.headers['Content-Type'] = 'application/json'
  options.headers['Accept'] = 'application/json'
  if( options.accessToken ) {
    options.headers['X-Access-Token'] = options.accessToken
    delete options.accessToken
  }
  if( options.body && typeof options.body !== 'string' ) {
    options.body = JSON.stringify(options.body)
  }

  var ok, statusCode;
  return fetch(
    `${baseUrl}${path}`,
    options,
  ).then((response) => {
    ok         = response.ok
    statusCode = response.status
    if( statusCode === 204 ) { return true }
    return response.json()
  }).then((json) => {
    if( !ok ) {
      var err = new Error(json.message || json.error || JSON.stringify(json))
      err.name = 'ApiError'
      err.statusCode = statusCode
      throw err
    }
    return json
  }).catch((err) => {
    if( err.name === 'ApiError' ) { throw err }

    err.statusCode = statusCode
    console.error(err)
    throw err
  })
}

export function graph(accessToken, query, variables = {}) {
  return request('/graph', {
    method: 'POST',
    body:   { query, variables },
    accessToken,
  }).then((r) => {
    if( r.errors ) {
      var err = new Error(r.body.errors.map(e => e.message || e).join(', '))
      err.errors = r.errors
      throw err
    }

    return r.data
  })
}

export default request
