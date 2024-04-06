import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  // console.log(request.cookies);
  console.log(request.headers.cookie);
  console.log(request.cookies);
  console.log(request.signedCookies.hello);

  if (request.cookies.hello && request.cookies.hello === "world") {
    response.send([{ id: 123, name: "chicken breast", price: "199" }]);
  } else {
    response.status(404).send({ msg: "No Cookie" });
  }
});

export default router;
