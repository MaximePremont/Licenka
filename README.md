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
1. Install the correct version of node with `nvm install 16`
2. Use the correct version of node with `nvm use`
3. Install dependencies with `npm install`
4. Build the app with `npm run build`
5. Start the app with `npm start`
## 💣 Problem
**It is difficult for small businesses to manage their license sale.**

After thinking about the tracks proposed in this hackathon, we have finally found this problem: "It's difficult for small businesses to manage their sold licenses" wich is into the "E-Society" track.

Nowadays, many companies want to sell their software products through the sale of licenses to its users.  
However, in order to be able to sell licenses, these companies are forced to choose between two options: develop their own license and user management solution, or pay another company for a license management service.

In both cases, doing this is very expensive for businesses, which is very complicated for small businesses. This problem can also affect open source projects, which do not have funds, and which must also find their own solution to make the companies that use the project pay, for example.
The other problem that can arise concerns users, indeed if the platform managing their license were to close, there is no longer any evidence that the user has the paid license.

In our opinion, this issue falls within the theme of "Building a decentralized Future" because the important themes of real possession of its information, infalsiability and democratization of decentralized technologies are at the heart of the challenges of Web3.
## 💡 Solution
To solve this issue, we decided to create a license management platform called **Licenka**.

The objective of our platform is to make it easy to create a license by defining a price in BUSD and linking a wallet that will receive the funds when purchasing the license.

One of the challenges is to allow companies to use our solution very easily, so we were inspired by Starton in order to offer public API routes allowing companies to very simply buy, and check if a user has a license without Web3 knowledge.

The technologies we used are [Next.js](https://nextjs.org/) for the front and the API, [Vercel](https://vercel.com/) for the deploy, [Docker](https://vercel.com/), [Web3.js](https://github.com/web3/web3.js), **Starton API**, **BNB Chain** and we support **Ledger**.

Our main technical challenge was to be able to buy licenses easily, because it is necessary to approve the transfer of funds beforehand to be able to make the payment, and companies should not need to use Web3 technologies. Thus, we decided to create a page inspired by Paypal, on which the payment is made and which redirects the user to the chosen address once the license has been acquired.
## 📄 Facility
#### See the deployed project on [licenka.space](licenka.space) !
Here are the steps to install and test our project :
1. Use `git clone git@github.com:MaximePremont/Licenka.git`
2. Use `cd Licenka`
3. Setup and start like described [here](#how-to-setup-your-project), recommanded : `docker compose up`
## 👋 Team and comments
#### Team name: POCKER
Team members :
- [Maxime PREMONT](https://github.com/MaximePremont)
- [Victor GUYOT](https://github.com/MrSIooth)
- [Nolann SABRE](https://github.com/Nolann71)
- [Mikael VALLENET](https://github.com/Mikatech)
- [Ahmed ABOUELLEIL-SAYED](https://github.com/AhmedFr)

During this hachathon we learned how to use the Starton API with the BNB Chain.
## 📌 Technical documenttion
a
## 📤 Project Submission
<p align="center">
<a href="https://www.youtube.com/watch?v=DI_l7lQiE4U&ab_channel=MaximePremont"><img src="./.github/assets/video.png" width="85%" alt="Demo video" /></a>
<a href="https://www.youtube.com/watch?v=DI_l7lQiE4U&ab_channel=MaximePremont">https://www.youtube.com/watch?v=DI_l7lQiE4U&ab_channel=MaximePremont</a>
</p>

### Our project is deployed and available on [licenka.space](licenka.space) !
#### 🚀 We also created a demo service available on [demo.licenka.space](demo.licenka.space)

- Provide an explanation of the features of your projects. You must link a demonstration video with commentary and screen recording of your presentation (10 slides max) or demo product (example: Loom, 4 minutes max).
- Include a brief demonstration of the use of **Starton** or its partners **iExec**, **BNB Chain**, **NodeReal,** or **Ledger**.
The more you use partner technologies, the more points you will earn. Example: Use the **Starton** API on the **BNB Chain** blockchain.
You have used two partners.

TODO (Victor)
