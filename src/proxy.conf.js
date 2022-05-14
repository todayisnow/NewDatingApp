const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
    ],
    target: "https://localhost:5001",
    secure: false
  },
  {
    context: [
      "/api/",
    ],
    target: "https://localhost:5001",
    secure: false
  }
  
]

module.exports = PROXY_CONFIG;
