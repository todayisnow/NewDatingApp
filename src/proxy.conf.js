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
      "/api/users",
    ],
    target: "https://localhost:5001",
    secure: false
  },
  {
    context: [
      "/api/account",
    ],
    target: "https://localhost:5001",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
