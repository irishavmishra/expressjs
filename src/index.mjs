import express, { request, response } from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strategy.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "Hello this is a secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.post(
  "/api/auth",
  passport.authenticate("local"),
  (request, response) => {}
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

app.get("/", (request, response) => {
  console.log(request.session.id);
  request.session.visited = true;
  response.cookie("hello", "world", { maxAge: 60000, signed: true });
  response.status(201).send({ msg: "Hello" });
});

app.post("/api/auth", (request, response) => {
  const {
    body: { username, password },
  } = request;

  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser || findUser.password !== password)
    return response.status(401).send({ msg: "BAD CREDENTIALS" });

  request.session.user = findUser;
  return response.status(200).send(findUser);
});

app.get("/api/auth/status", (request, response) => {
  request.sessionStore.get(request.sessionID, (err, session) => {
    console.log(session);
  });
  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send({ msg: "Not Authenticated" });
});

app.post("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  const { body: item } = request;
  const { cart } = request.session;
  if (cart) {
    cart.push(item);
  } else {
    request.session.cart = [item];
  }
  return response.status(201).send(item);
});

app.get("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  return response.send(request.session.cart ?? []);
});
