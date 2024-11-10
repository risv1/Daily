import type { H3Event } from "h3";

export const healthCheck = async (_event: H3Event) => {
  return { status: "ok" };
};
