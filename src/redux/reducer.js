/*

const formReducer = (state, action)=> {
  console.log(state);
  switch (action.type) {
    case "SEND_DOWNLOADER":
      const newDownloader = Object.assign({}, state.downloader, action.value);
      state.downloader = newDownloader;
      return state;
    default:
      return state;
  }
}

export default formReducer;
