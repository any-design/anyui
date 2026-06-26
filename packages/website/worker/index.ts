interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const response = await env.ASSETS.fetch(request);
      // If the asset binding couldn't find a file, serve our cute 404 page with
      // the proper status so the browser address bar + devtools stay honest.
      if (response.status === 404) {
        const notFound = await env.ASSETS.fetch(new URL('/404.html', request.url).toString());
        const body = await notFound.text();
        return new Response(body, {
          status: 404,
          headers: { 'content-type': 'text/html;charset=utf-8' },
        });
      }
      return response;
    } catch (error) {
      // Any unexpected failure while serving falls back to the cute 500 page so
      // users never see Cloudflare's raw error screen.
      try {
        const serverError = await env.ASSETS.fetch(new URL('/500.html', request.url).toString());
        const body = await serverError.text();
        return new Response(body, {
          status: 500,
          headers: { 'content-type': 'text/html;charset=utf-8' },
        });
      } catch {
        // last-resort: if even 500.html can't be read, return a minimal text body
        return new Response('Internal Server Error', {
          status: 500,
          headers: { 'content-type': 'text/plain;charset=utf-8' },
        });
      }
    }
  },
} satisfies ExportedHandler<Env>;