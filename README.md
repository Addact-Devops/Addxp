# Introduction

Addxp is all about digital experiences and digital transformation. Through the power of headless, we provide smart and unique experiences to the customers, the people and the community.

We can say we are a combination of a digital experience provider, headless solutions creator, and a content experience company that designs unique user experiences to connect with the audience and make their digital journeys more engaging, more enjoyable and more valuable.

### `Requirements`

1. Node JS Version : 18.14.0 or above any LTS
2. NPM Version : 9.8.0
3. MYSQL Version : 8.0.34
4. EDITION : Community
5. Strapi Version : 4.12.6

# Installation process

### `Step : 1 `

-   Install node JS Form the https://nodejs.org/en (Install latest Version v18.14.0)

### `Step : 2 `

1. Install MYSQL Form the https://dev.mysql.com/downloads/windows/installer/8.0.html (Install Version 8.0.34)
   2 Give Port : 3306
2. password : root

### `Step : 3 `

1. Clone AppXp repository
2. Go to the AddXp-CMS : cd AddXp-CMS
3. Run the Command : npm i
4. Run the Command (Build your admin panel) : npm run build
5. Run the Command (Start your Strapi application with autoReload enabled) : npm run develop

### `Step : 4 `

1. import mysql database : AddXP (if in your system 'AddXP' database is not avaliable just create 'AddXP' database using this command : CREATE DATABASE AddXP) ;
2. go to mysql workbench :
   Login into your instents
   username : root
   password : root
3. select Data Import/Restore into that Click on import from self-Contained File and select your database File
4. select Default schema to be imported to : "select addxp from the drop down"
5. Go to the MySQL Cli command Line and Enter the password `root` and apply below command .
   -> use addxp;
   -> SET GLOBAL sort_buffer_size = 512000000;(this command is use when the strapi server not working properly and got the error for database size increased) .
6. Now your AddXp strapi CMS is running On http://localhost:1337/admin

### `Step : 5 `

1. Install and setup Next JS Project.
   Pre Requirements : NddeJs Installed Version :18.14.0
2. Go to the addxp-nextjs : cd addxp-nextjs
3. Run this command : npm i
4. Run this command : npm run build (build your nextjs application)
5. Run this Command : npm run dev (start you application)
