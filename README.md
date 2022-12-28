<p align="center">
  <a href="https://github.com/daoseeder/landing/actions/workflows/build.yaml">
    <img src="https://github.com/daoseeder/landing/actions/workflows/build.yaml/badge.svg?branch=main" alt="Build Status">
  </a>
</p>

## Deploying to Production

1. Obtain root access to the ssh to the server (currently @ 104.168.102.30) from an admin using your ssh pub key.
2. After sshing into the server switch to the daoseeder user.
3. Clone the repo or pull latest changes. `git pull`
4. Run `yarn install`
5. Build using `yarn build`
6. Delete any existing PM2 service named landing-app.sh.
7. Serve the app by calling `pm2 start landing-app.sh`
