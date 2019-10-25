## My Thought Process
* It was not explicitly stated if I should use a database or not to store votes.  However, I like making databases, so I have included one.
* I was not entirely sure about the "single vote for a given framework per user email address and browser session" constraint.  I assumed that it meant...
    * Given the same email and session, the user can only vote once
    * Given the same email and a different session, the user can change their vote
    * Given a different email and the same session, the new email can submit a new vote
