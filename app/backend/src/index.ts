import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { usersRoute } from "./routes/users";

const app = new Hono();
app.use(logger());

const apiRoutes = app.basePath("/api").route("/users", usersRoute);

const port = 3001;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
