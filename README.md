<p align="center">
<img src="./.github/assets/logo.png" width="45%" alt="Demo video" />
</p>
<h3 align="center">Web3 license manager for the Starton Hackathon</h3>

## ⚙️ How to setup your project
### 🐳 With Docker (recommanded)
1. Add your [Starton API Key](https://app.starton.io/en/projects) `API_KEY` in the [.env](.env) file of the project
2. Make sure Docker is working with `docker run hello-world`
3. Build and start the app with `docker compose up`
### 🫳🏼 By hand
It is recommanded to use [NVM](https://github.com/nvm-sh/nvm) to have the correct node version.
1. Export your Starton API Key with `export API_KEY=xx_xxx_xxxxxxx-xxxx-xxxx-xxxxxxxxxx`, replacing *xxxxx* with your key
2. Install the correct version of node with `nvm install 18`
3. Use the correct version of node with `nvm use`
4. Install dependencies with `npm install`
5. Build the app with `npm run build`
6. Start the app with `npm start`

You can now access to the app at [http://localhost:3000](http://localhost:3000) or [http://localhost:80](http://localhost:80)
#### See the deployed project on [licenka.space](https://licenka.space) !
## 💣 Problem
**It is difficult for small businesses to manage their license sale.**

After thinking about the tracks proposed in this hackathon, we have finally found this problem: "It's difficult for small businesses to manage their sold licenses" which is into the "E-Society" track.

Nowadays, many companies want to sell their software products through the sale of licenses to its users.  
However, in order to be able to sell licenses, these companies are forced to choose between two options: develop their own license and user management solution, or pay another company for a license management service.

In both cases, doing this is very expensive for businesses, which is very complicated for small businesses. This problem can also affect open-source projects, which do not have funds, and which must also find their own solution to make the companies that use the project pay, for example.
The other problem that can arise concerns users, indeed if the platform managing their license were to close, there is no longer any evidence that the user has paid the license.

In our opinion, this issue falls within the theme of "Building a decentralized Future" because the important themes of real possession of its information, infallibility and democratization of decentralized technologies are at the heart of the challenges of Web3.
## 💡 Our solution
To solve this issue, we decided to create a license management platform called **Licenka**.

The objective of our platform is to make it easy to create a license by defining a price in BUSD and linking a wallet that will receive the funds when purchasing the license.

One of the challenges is to allow companies to use our solution very easily, so we were inspired by Starton in order to offer public API routes allowing companies to very simply buy, and check if a user has a license without Web3 knowledge.

The technologies we used are [Next.js](https://nextjs.org/) for the front and the API, [Vercel](https://vercel.com/) for the deploy, [Docker](https://vercel.com/), [Web3.js](https://github.com/web3/web3.js), **Starton API**, **BNB Chain** and we support **Ledger**.

Our main technical challenge was to be able to buy licenses easily, because it is necessary to approve the transfer of funds beforehand to be able to make the payment, and companies should not need to use Web3 technologies. Thus, we decided to create a page inspired by Paypal, on which the payment is made and which redirects the user to the chosen address once the license has been acquired.
<p align="center">
<img src="./.github/assets/figma.png" width="75%" alt="Figma model" />
<br>Created figma model
</p>

Another problem we had to deal with was the fact that we could easily authenticate a user with metamask to verify that he had a license. However, it should be possible on top of that to be able to call the Web2 API without having to authenticate, and without verification everyone could enter the wallet of someone who owns the license. For this, users can set a password to use the Web2 version.

Thus, our solution can work both with the simplicity of authentication in Web3, and both with the Web2 version for companies that do not wish to use Metamask auth.

## 📄 Facility
#### See the deployed project on [licenka.space](https://licenka.space) !
Here are the steps to install and test our project :
1. Use `git clone git@github.com:MaximePremont/Licenka.git`
2. Use `cd Licenka`
3. Add your [Starton API Key](https://app.starton.io/en/projects) `API_KEY` in the [.env](.env) file of the project
4. Setup and start like described [here](#how-to-setup-your-project), recommanded : `docker compose up`

You can now access to the app at [http://localhost:3000](http://localhost:3000)
## 👋 Team and comments
#### Team name: POCKER
Team members :
- [Maxime PREMONT](https://github.com/MaximePremont)
- [Victor GUYOT](https://github.com/MrSIooth)
- [Nolann SABRE](https://github.com/Nolann71)
- [Mikael VALLENET](https://github.com/Mikatech)
- [Ahmed ABOUELLEIL-SAYED](https://github.com/AhmedFr)

During the hackathon we learned how to create a contract on the BSC blockchain and deploy it using Starton API/Front. Using next.js and Web3.js we were able to create our first Dapp, and interact with our contract using Starton and direct function calling with Web3.js.
## 📌 Technical documentation
Our solution is deployed and working with 3 parts :  
1. A main page ([https://licenka.space](https://licenka.space)) to show the project
2. A license creation page ([https://licenka.space/create](https://licenka.space/create)), to create a new license with our wallet
3. A license buy page ([https://licenka.space/approve](https://licenka.space/approuve)), which allow the user to buy a license with his wallet, and redirect to the company page after that.

⚠️ To work with the purchase page, the company must indicate the license to be purchased and the page to redirects to something like this : *https://licenka.space/approve/?license=XX&redirect=https://xxxxxx.xx*

As explained, our API can be used in 2 different ways: Web2 or Web3 :
- Web2 API
    - Know if a user has a license `https://licenka.space/api/license`
        ```
        Query:
            userAddress
            licenseId
        200:
            license: {
            licenseId: 
            validTime: 
            isInfinite: 
        }
    - Get license informations for a user `https://www.licenka.space/api/checkLicense`
        ```
        Query:
            userAddress
            licenseId
            userPassword
        200:
            license: bool
- Web3  
(TODO) Victor
## 📤 Project Submission
<p align="center">
<a href="https://www.youtube.com/watch?v=DI_l7lQiE4U&ab_channel=MaximePremont"><img src="./.github/assets/video.png" width="85%" alt="Demo video" /></a>
<a href="https://www.youtube.com/watch?v=DI_l7lQiE4U&ab_channel=MaximePremont">https://www.youtube.com/watch?v=DI_l7lQiE4U&ab_channel=MaximePremont</a>
</p>

### Our project is deployed and available on [licenka.space](licenka.space) !
#### 🚀 We also created a demo service available on [demo.licenka.space](https://demo.licenka.space) , see the code on [this branch](https://github.com/MaximePremont/Licenka/tree/20-create-a-demo-which-use-licenka).
### Features :
- Web3 implementation
- Web2 API simple implementation
- Create a license
- Check if user has a license
- Get license informations for a user
- Buy a license and define a password

### Partners :
- Starton : for contract calls and management
- BNB Chain : deployment
- Ledger : full compatibility of ledger wallets with our system

❤️ Thanks to Starton and all of its partners for making it possible to attend the talks, workshops and the organization of this hackathon.
