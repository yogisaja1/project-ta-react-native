const initVideo = {
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
  return state;
};
