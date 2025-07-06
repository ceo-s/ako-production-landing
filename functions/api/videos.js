export async function onRequest(context) {
  let res = {};
  let cursor = undefined;

  try {
    while (!videos || !videos.list_complete) {
      const videos = await context.env.AKO_VIDEOS_KV.list({ cursor });
      res = { ...res, ...videos.keys };
      cursor = videos.cursor;
    }
    console.log("Balls");
    console.log(videos.keys);
    return new Response(JSON.stringify(res), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(e.message, { status: 500 });
  }
}
