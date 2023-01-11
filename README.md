<p align="center">
  <a href="https://github.com/daoseeder/landing/actions/workflows/build.yaml">
    <img src="https://github.com/daoseeder/landing/actions/workflows/build.yaml/badge.svg?branch=main" alt="Build Status">
  </a>
</p>

# Deploy to Prod

1. Login to 104.168.102.30 as user.
2. git pull on the repo.
3. yarn, then yarn build.
4. pm2 start landing-app.sh.
