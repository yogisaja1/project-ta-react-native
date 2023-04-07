const initVideo = {
  video: [],
  videoById: [],
  category: [],
};

export const videoReducer = (state = initVideo, action) => {
  if (action.type === 'SET_VIDEO') {
    return {
      ...state,
      videoById: action.value,
    };
  }
  if (action.type === 'SET_CATEGORY') {
    return {
      ...state,
      category: action.value,
    };
  }
  if (action.type === 'SET_VIDEO_BY_RATING') {
    return {
      ...state,
      video: action.value,
    };
  }
  return state;
};
