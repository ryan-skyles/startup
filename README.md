#WhatayaWatchin 

[My Notes](notes.md)



> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Have you ever struggled to find something to watch before your food gets cold? Have you ever spent more time looking for something to watch then actually watching something? Are you looking for an easy conversation starter with someone you like? Then **_WhatyaWatchin_** is for you! **_WhatyaWatchin_** allows you to post your top 3 favorite movies or tv series that you've watched in the past week. With your account you can easily update your top 3 every week and see what others are also choosing to watch. It's a much more friendly and personal approach to finding something to watch and can help you narrow down searches from huge libraries to close friends and families. Scroll through everyones top picks and click the save button to make your own watchlist! 

### Design

![Design image](WhatyaWatchin.png)

Here is a diagram displaying the sequence of how people would interact with the backend to share lists with others. 

```mermaid
sequenceDiagram
    actor You
    actor Becca
    actor Charles
    You->> Server: list +1 +2 +3
    server -->>Becca: list 1 2 3
    server -->>Charles: list 1 2 3 
    Becca->> Server: List +1 +2 +3
    server -->You: 1 2 3
    server -->Charles: 1 2 3 
    Charles->> Server: list +1 +2 +3
    server --> Becca: 1 2 3
    server --> You: 1 2 3

```

### Key features

- Secure login over HTTPS
- Ability to type in 3 movie/tv-show titles to share 
- Ability to save titles from other accounts to personal account
- Separate pages displaying:
  1. lists from other users 
  2. Saved titles
  3. Personal account profile

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Two HTML pages for login and main page interface getting input title names from user. After one week, clear users lists and remind users to input a new list after clearing the titles.
- **CSS** - Styling with vibrant colors for each page displaying usernames and numbered lists with bold fonted movie and tv titles
- **React** - Login data collection. Choice of display whether homepage, saved titles page, or profile page.  Routing and components to work interface. 
- **Service** - Backend service with endpoints for:
    - login
    - retrieving 3 titles
    - pushing usernames with their list retrieved to other users
    - retrieve movie titles from large database containing information on the movies inputed
- **DB/Login** - Store top 3 titles entered by user and saved list created by user.
- **WebSocket** - When users update their list of titles for that week, their list is broadcast to all the other users homepage

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
