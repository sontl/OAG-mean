'use strict';

module.exports = {
  db: 'mongodb://localhost/mean-dev1',
  mongoose: {
    debug: true
  },
  app: {
    name: 'Grapevine Art | Discover, Sell, Collect Vietnam\'s Best Artwork'
  },
  facebook: {
    clientID: '342399349255155',
    clientSecret: '29fa87b3c564d3bf02d9d0b9e3e01f1f',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: 'DEFAULT_CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  github: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  google: {
    clientID: '675994177948-n4elauav37i9u91irgfkenefu84mc3et.apps.googleusercontent.com',
    clientSecret: 'GsAzVhmxMiwol1C4eurc-H4U',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  linkedin: {
    clientID: 'DEFAULT_API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SERVICE_PROVIDER', // Gmail, SMTP
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  }
};
