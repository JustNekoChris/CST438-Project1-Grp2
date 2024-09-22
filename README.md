# Welcome to Poki Party 👋

Curious about the world of Pokemon and the various creatures you can use to compete against other trainers?

Looking to go through the list of Pokemon you have at your disposal in your PC?

How about setting up various teams as a reference of balanced teams you have ready to go at your disposal?

Do all this and even some more in the Poki Party App!

## How to get started

First and foremost, this app uses Google Authentication to keep track of user data so make sure you're signed in!

## Introduction

* How was communication managed
  * We communicated through slack and weekly meetings
* How many stories/issues were initially considered
  * We considered 13 User Stories
* How many stories/issues were completed
  * We completed 12

# The Development Story (aka Team Retrospective)

## Judah Silva
- [Pull requests](https://github.com/JustNekoChris/CST438-Project1-Grp2/pulls?q=is%3Apr+is%3Aclosed+author%3AJudah-Silva)
- [Issues](https://github.com/JustNekoChris/CST438-Project1-Grp2/issues?q=is%3Aissue+assignee%3AJudah-Silva)

### My Role: Working on Google OAuth and User's teams
+ What was the biggest challenge? 
  + Making the functionality to add pokemon from a user's pc to a team
+ Why was it a challenge?
  + I had to learn how a Modal works in React-Native, make the page the modal is on refetch database info, and handling multiple custom components
  + How was the challenge addressed?
    + I took it one step at a time and completed the database stuff, then created the modal, then attached the modal to another component
+ Favorite / most interesting part of this project
  + I think my favorite part was either getting the modal to work, or integrating OAuth
+ If you could do it over, what would you change?
  + I would start working on Unit tests a lot earlier
+ What is the most valuable thing you learned?
  + Probably how to actually create and manage a React-Native app. I can use it going forward and make it something I can possibly put on a resume.

## Edward Leon
- [Pull requests](https://github.com/JustNekoChris/CST438-Project1-Grp2/pulls?q=is%3Apr+is%3Aclosed+author%3AEdwardLe0n)
- [Issues](https://github.com/JustNekoChris/CST438-Project1-Grp2/issues?q=is%3Aissue+assignee%3AEdwardLe0n+)

### My Role: Cleaning up the Front End by Utilizing the PokeAPI 
+ What was the biggest challenge? 
  + For the most part, most of my challenges centered around figuring out to properly utilize our database calls to properly display information 
+ Why was it a challenge?
  + There are various API calls that return info very differently from each other, which is expected to say the least
    + One primary instance of this would be when someone calls https://pokeapi.co/api/v2/pokemon/ this results in getting a list of Pokemon with just the name and url
    + This is different than the https://pokeapi.co/api/v2/type/fire/ ; where fire can be any type in the games; as it returns all the data mentioned previously, with the addition of   
+ Favorite / most interesting part of this project
  + As much trouble as the API calls gave me, I really enjoyed 'being a rat' and doing whatever I could to cobble stuff together
  + For instance, in the https://pokeapi.co/api/v2/pokemon/ call, the link given directs to a Pokemon Poke API page, but it utilizes the same id system for pictures, so I went ahead and pulled the ID from the URL, and slapped it into another call to properly get images!
+ If you could do it over, what would you change?
  + Abstracting stuff is the first thing I'd like to do, as there were many areas that had duplicate code, so being able to abstract and easily make all the changes in one place would be nice
+ What is the most valuable thing you learned?
  + Communication is key, especially near the tail end, as knowing who's working on what as to not step on each others toes and save time is crucial
 
 ## Christian Barajas
- [Pull requests](https://github.com/JustNekoChris/CST438-Project1-Grp2/pulls?q=is%3Apr+is%3Aclosed+author%3AJustNekoChris)
- [Issues](https://github.com/JustNekoChris/CST438-Project1-Grp2/issues?q=is%3Aissue+assignee%3AJustNekoChris)

### My Role: 
+ What was the biggest challenge? 
  + For me, my biggest challenge I had was making a database for the app using the module name roomdb.
+ Why was it a challenge?
  + This was a big challenge because the database was stored inside the inside android core while we were working with typescript on the outside, to make it work I had to make the code on the inside with java and I had to connect it outside using a bridge that would allow me to use the function on the typescript side.
+ Favorite / most interesting part of this project
  + My most favorite part was bridging the functions because as soon as I was able to build the first function, the other functions were pretty easy to build as well
+ If you could do it over, what would you change?
  + If I could do this again I would like to start with testing earlier in the project 
+ What is the most valuable thing you learned?
  + Having good communications with your teammates is key because if you change one thing it may mess things up for the others.

## Saul Machuca
- [Pull requests](https://github.com/JustNekoChris/CST438-Project1-Grp2/issues?q=is%3Aclosed+is%3Amerged+head%3Asaul-week2)
- [Issues](https://github.com/JustNekoChris/CST438-Project1-Grp2/issues?q=is%3Aissue+assignee%3ABetterCallSaulM)

### My Role: Working on the search functions and displaying the Pokemon
+ What was the biggest challenge? 
  + The biggest challenge would be the fact that I missed the first 2 weeks of class for reasons out of my control.
+ Why was it a challenge?
  + It was a big challenge because I missed the first few weeks of class which also meant that I missed our few meetings and sprint iterations, so when I did get back, I was fairly behind.
+ Favorite / most interesting part of this project
  + My favorite part was implementing the search by type functionality.
+ If you could do it over, what would you change?
  + If I could do this over I would try to communicate better with my team, especially for the days where we cannot meet in person.
+ What is the most valuable thing you learned?
  + The most valuable takeaway was definitely the importance of good communication with your team and how it can make your lives so much easier.

## How's this app built?

This app is built through the use of React Native as a basic template to make the android app!

Following this, we also use Google Authentication to keep track of users info by making sure they sign in!

As for page traversal, we use the Expo System to flip between the main pages!

### Relevant documentation

Getting Started with React Native: https://reactnative.dev/docs/getting-started

Setting up Google Oauth: https://medium.com/@mnabilarta/google-oauth-using-react-native-cli-23ce8e1cf716 

Using the Expo Router System: https://docs.expo.dev/router/introduction/

## Conclusion

- How successful was the project?
  - The project turned out fairly successful. There are a few things that we attempted, but could not get done. However, we accomplished most of our goals.
- What was the largest victory?
  - Getting all the main requirements done, such as the database, api integration, and user authentication
- Final assessment of the project
  - Happy to see finished it
