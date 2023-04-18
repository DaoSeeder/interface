<p align="center">
  <a href="https://github.com/daoseeder/interface/actions/workflows/build.yaml">
    <img src="https://github.com/daoseeder/interface/actions/workflows/build.yaml/badge.svg?branch=main" alt="Build Status">
  </a>
</p>

# DaoSeeder
### **World's first decentralized Crowdfunding platform**

To install missing dependencies **yarn**

To Start the project run **yarn start**

Create **.env.local** file and then add your infura key in that file. Do not add your secret keys in .env file as it will be committed and it will be available to anyone. The **.env** should only contains the environment variable names so that when new variable are introduced others can copy and paste their secret values accordingly in their local files

Add a secrets.json file
{
  "mnemonic":"test test test test test test test test test test test test",
  "path":"m/44'/60'/0'/0"
}

You can choose your own 12 word mnemonic and your own path.