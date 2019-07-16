# GIT AND ME

### Made for the organizations and people


## What is GIT AND ME?
This web application is made for organizations. Admin of the organizations can signup and login through this application to kep a record of their organization and members. This is a fully authenticated app with signup,login,logout for the user with a dashboard for managing the below activities the user data is stored in mongoDB with the help of mongoose models. 
## It provides- 
1. Git search option which allows the admin to search with the username of any github member, and it fetches the details as of how many repos the user has and gives a link to view all repos. 
2. It lists members of the organization both public and private to keep a track of all the members. 
3. For all the repos of the organization it shows the top contributors 
4. It shows the leaderboard based on the score calculated as per the given API 
5. Also it displays the user profile

## How To Use

1) git clone https://github.com/NavyaaSharma/git-and-me-hack-insider.git
2) cd git-and-me-hack-insider
3) npm install
4) Install MongoDB from https://www.mongodb.com/download-center/community in the system
5) Run the Node JS file using
    node app.js
6) Open localhost:3000 in your browser
7) For viewing the leaderboard and top contributors a token and organization name is required. Sample is given below-
    token-dshfisdbfbsdkfbjkdsbfjdsbfjb
    organization-CodeChefVIT


