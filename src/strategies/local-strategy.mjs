import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";

export default passport.use(
  new Strategy((username, password, done) => {
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
