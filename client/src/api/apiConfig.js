const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "39f7a57ce01da1b2de62da1e925233c2",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
