## My Thought Process
* It was not explicitly stated if I should use a database or not to store votes.  However, I like making databases, so I have included one.
* I was not entirely sure about the "single vote for a given framework per user email address and browser session" constraint.  I assumed that it meant...
    * Given the same email and session, the user can only vote once
    * Given the same email and a different session, the user can change their vote
    * Given a different email and the same session, the new email can submit a new vote
* The app does support limiting one vote per email per session but doesn't seem to have an effect since a new session is created with every request.  

##Directions to run locally

###Setting-up PostgreSQL

1. Download and install PostgreSQL (https://www.postgresql.org/download/) (alternatively you can use brew ```brew install postgresql``` )
2. In a terminal run ```initdb /usr/local/var/postgres```
3. Then run ```createdb framework-dashboard```

###How to Run

1. Start-up the afformentioned PostgreSQL server
2. In the root directory of the program, run ```npm install```
3. In the root directory of the program, run ```npm start```
4. The server is listening on ```localhost:3000```