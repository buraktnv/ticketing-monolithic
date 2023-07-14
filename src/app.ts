import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "./common/index";

import { currentUserRouter } from "./routes/auth/current-user";
import { signinRouter } from "./routes/auth/signin";
import { signoutRouter } from "./routes/auth/signout";
import { signupRouter } from "./routes/auth/signup";
import { createTicketRouter } from "./routes/tickets/new";
import { showTicketRouter } from "./routes/tickets/show";
import { indexTicketRouter } from "./routes/tickets/index";
import { updateTicketRouter } from "./routes/tickets/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
