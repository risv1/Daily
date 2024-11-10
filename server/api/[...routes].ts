import { createRouter, useBase, setResponseStatus } from "h3";
import authRouterHandler from "./routes/auth.routes";
import { healthCheck } from "./handlers/misc.handlers";

const router = createRouter();

router.get(
  "/health",
  defineEventHandler(async (_event) => healthCheck),
);

router.use("/auth/**", useBase("/auth", authRouterHandler));

router.use(
  "/**",
  defineEventHandler((event) => {
    setResponseStatus(event, 404);
    return { error: "Endpoint not found" };
  }),
);

export default useBase("/api", router.handler);
