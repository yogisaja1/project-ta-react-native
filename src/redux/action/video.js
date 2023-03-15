const {default: Axios} = require('axios');
const {API_HOST} = require('../../config');

export const getCategoryData = () => dispatch => {
  Axios.get(`${API_HOST.url}/apiCategory`)
    .then(res => {
      dispatch({type: 'SET_CATEGORY', value: res.data.kategori});
    })
    .catch(err => {
      console.log(err);
    });
};

export const getVideoById = id => dispatch => {
  Axios.get(`${API_HOST.url}/apivideo/show/${id}`)
    .then(res => {
      dispatch({type: 'SET_VIDEO', value: res.data});
    })
    .catch(err => {
      console.log(err);
    });
};

export const setRating = (id_video, rating) => dispatch => {
  Axios.post(
    `${API_HOST.url}/apiVideo/updaterating`,
    JSON.stringify({id_video: id_video, rating: rating}),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(res => {})
    .catch(err => {});
};
