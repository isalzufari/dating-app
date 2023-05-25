const api = (() => {
  const BASE_URL = 'http://localhost:9001';

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  function putRefreshToken(token) {
    return localStorage.setItem('refreshToken', token);
  }

  function getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  function deleteToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status, data };
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/authentications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users`);
    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data } = responseJson;

    return data;
  }

  async function getRegion() {
    const response = await fetch(`${BASE_URL}/location/region`);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getAreaByIdRegion({ id }) {
    const response = await fetch(`${BASE_URL}/location/area?regions=${id}`);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getSpotsByIdArea({ id }) {
    const response = await fetch(`${BASE_URL}/location/spot/${id}`);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getSpotsByIdRegion({ id }) {
    const response = await fetch(`${BASE_URL}/spot/region/${id}`);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getSpots() {
    const response = await fetch(`${BASE_URL}/spot`);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getSpotBySlug({ slug }) {
    const response = await fetch(`${BASE_URL}/spot/${slug}`);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function addReview({ id_spot, image, rating, review }) {
    const response = await _fetchWithAuth(`${BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_spot,
        image,
        rating,
        review,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status, data };
  }


  return {
    putAccessToken,
    getAccessToken,
    putRefreshToken,
    getRefreshToken,
    deleteToken,
    register,
    login,
    getOwnProfile,
    getRegion,
    getAreaByIdRegion,
    getSpotsByIdArea,
    getSpotsByIdRegion,
    getSpots,
    getSpotBySlug,
    addReview,
  }
})();

export default api;
