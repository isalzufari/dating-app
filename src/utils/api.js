const api = (() => {
  // const BASE_URL = 'http://192.168.43.34:9001';
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

  async function refreshToken() {
    const response = await fetch(`${BASE_URL}/authentications`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: `${getRefreshToken()}`,
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
    putAccessToken(data.accessToken);
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users`);
    const responseJson = await response.json();

    const { status, message, error, data } = responseJson;

    return { status, error, message, data };
    // if (status !== 'success') {
    //   throw new Error(message);
    // }

    // const { data } = responseJson;

    // return data;
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
    let response;
    if (getAccessToken()) {
      response = await _fetchWithAuth(`${BASE_URL}/spot/${slug}`);
      if (!response.ok) {
        response = await fetch(`${BASE_URL}/spot/${slug}`);
      }
    } else {
      response = await fetch(`${BASE_URL}/spot/${slug}`);
    }


    // const response = getAccessToken()
    //   ? await _fetchWithAuth(`${BASE_URL}/spot/${slug}`)
    //   : await fetch(`${BASE_URL}/spot/${slug}`);

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

  async function updateReview({ id_review, id_spot, image, rating, review }) {
    const response = await _fetchWithAuth(`${BASE_URL}/reviews`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_review,
        id_spot,
        image,
        rating,
        review,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status, message };
  }

  async function deleteReview({ id_review, id_spot }) {
    const response = await _fetchWithAuth(`${BASE_URL}/reviews`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_review,
        id_spot
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status, message };
  }

  async function getReviewAndSpotLoggedIn() {
    const response = await _fetchWithAuth(`${BASE_URL}/app`);
    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getReviewsLoggedIn() {
    const response = await _fetchWithAuth(`${BASE_URL}/app/reviews`);
    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getSpotsLoggedIn() {
    const response = await _fetchWithAuth(`${BASE_URL}/app/spots`);
    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function deleteSpot({ id_spot }) {
    const response = await _fetchWithAuth(`${BASE_URL}/spot`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_spot
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status, data };
  }

  async function getFacilities() {
    const response = await fetch(`${BASE_URL}/app/add/facility`);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function getLabelSpot() {
    const response = await fetch(`${BASE_URL}/app/add/label`);

    const responseJson = await response.json();

    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  }

  async function addSpot({ name, image, desc, price, facility, id_location, id_label }) {
    const response = await _fetchWithAuth(`${BASE_URL}/spot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        image,
        desc,
        price,
        facility,
        id_location,
        id_label
      }),
    });

    const responseJson = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status, data };
  }

  async function editSpot({ id_spot, name, image, desc, price, facility, id_location, id_label }) {
    const response = await _fetchWithAuth(`${BASE_URL}/spot`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_spot,
        name,
        image,
        desc,
        price,
        facility,
        id_location,
        id_label
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return { status, message };
  }

  async function updateProfile({ name, image, old_password, new_password }) {
    const response = await _fetchWithAuth(`${BASE_URL}/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        image,
        old_password,
        new_password
      }),
    });

    const responseJson = await response.json();
    return responseJson;
  }

  async function softDeleteProfile({ old_password }) {
    const response = await _fetchWithAuth(`${BASE_URL}/users`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        old_password
      }),
    });

    const responseJson = await response.json();

    return responseJson;
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
    updateReview,
    deleteReview,
    getReviewAndSpotLoggedIn,
    getReviewsLoggedIn,
    getSpotsLoggedIn,
    getFacilities,
    getLabelSpot,
    addSpot,
    editSpot,
    deleteSpot,
    refreshToken,
    updateProfile,
    softDeleteProfile
  }
})();

export default api;
