module.exports = {
  MONGO_URL: process.env.MONGO_URL,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  PORT: process.env.PORT,
  URL: process.env.URL,
  PERSISTANCE: process.env.MANAGER_PERSISTANCE,
  mail: {
    GMAIL_ADDRESS: process.env.GMAIL_ADDRESS,
    GMAIL_PWD: process.env.GMAIL_PWD
  },
  twilio: {
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE: process.env.TWILIO_PHONE
  }
}