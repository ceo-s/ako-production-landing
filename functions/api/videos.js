export async function onRequest(context) {
  try {
    const keys = fetchKeys();
    const videos = fetchVideos(keys);

    return new Response(JSON.stringify(videos), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}

async function fetchKeys() {
  let res = {};
  let cursor = undefined;
  let videos = undefined;

  while (!videos || !videos.list_complete) {
    videos = await context.env.AKO_VIDEOS_KV.list({ cursor });
    res = { ...res, ...videos.keys };
    cursor = videos.cursor;
  }

  return res;
}

async function fetchVideos(keys) {}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // Для DEV
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}
