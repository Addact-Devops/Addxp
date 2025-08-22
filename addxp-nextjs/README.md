# Introduction

Addxp is all about digital experiences and digital transformation. Through the power of headless, we provide smart and unique experiences to the customers, the people and the community.

We can say we are a combination of a digital experience provider, headless solutions creator, and a content experience company that designs unique user experiences to connect with the audience and make their digital journeys more engaging, more enjoyable and more valuable.

## Getting Started

### `Requirements`

1. Node JS Version : 18.14.0 or above any LTS
2. NPM Version : 9.8.0
3. MYSQL Version : 8.0.34
4. EDITION : Community
5. Strapi Version : 4.12.6

# Installation process

### `Step : 1 `

-   Follow the Strapi-CMS installation Steps First Its given in CMS Readme file and Install Strapi CMS and Mysql.

### `Step : 2 `

-   Install node JS Form the https://nodejs.org/en (Install latest Version v18.14.0)

### `Step : 3 `

1. Clone AppXp repository
2. Go to the addxp-nextjs : cd addxp-nextjs
3. Run this command : npm i
4. Run this command : npm run build (build your nextjs application)
5. Run this Command : npm run dev (start you application)

## Update Redirection

Add your redirects rule in below file. this file contains source and destination column. `(DONT Change Name of columns)`
`public/redirects.xlxs`

After updating run this command and it will update `redirect.js`
`node generateRedirects.js`
