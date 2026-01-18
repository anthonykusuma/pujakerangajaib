import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req: Request) => {
	const pathname = new URL(req.url).pathname;

	return serveDir(req, {
		fsRoot: "dist",
		urlRoot: "",
		quiet: true,
	}).then((res) => {
		// If file not found and it's not a static asset, serve index.html for SPA routing
		if (res.status === 404 && !pathname.match(/\.[a-z0-9]+$/i)) {
			return serveDir(new Request(new URL("/index.html", req.url)), {
				fsRoot: "dist",
				urlRoot: "",
				quiet: true,
			});
		}
		return res;
	});
});
