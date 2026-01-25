export const config = {
  runtime: "edge",
};

export default function handler(req: Request) {
  const url = new URL(req.url);
  const target = new URL("/og.svg", url.origin);
  return Response.redirect(target.toString(), 302);
}
