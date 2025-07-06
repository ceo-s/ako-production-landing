export async function onRequest(context) {
  let res = {};
  let cursor = undefined;
  const videos = undefined;

  try {
    while (!videos || !videos.list_complete) {
      videos = await context.env.AKO_VIDEOS_KV.list({ cursor });
      res = { ...res, ...videos.keys };
      cursor = videos.cursor;
    }

    return new Response(JSON.stringify(res), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
