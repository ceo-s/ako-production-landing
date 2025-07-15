export async function onRequest(context) {
  try {
    const keys = await fetchKeys(context.env.AKO_VIDEOS_KV);
    const videos = await fetchVideos(keys, context.env.AKO_VIDEOS_KV);

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

async function fetchKeys(store) {
  let res = [];
  let cursor = undefined;
  let videos = undefined;

  while (!videos || !videos.list_complete) {
    videos = await store.list({ cursor });
    res.push(...videos.keys);
    cursor = videos.cursor;
  }

  return res.map((k) => k.name);
}

async function fetchVideos(keys, store) {
  let reqs = [];

  for (let i = 0; i < keys.length; i += 100) {
    reqs.push(store.get(keys.slice(i, i + 100), "json"));
  }

  const resp = await Promise.allSettled(reqs);

  let res = {};
  for (const result of resp) {
    if (result.status == "rejected") {
      console.error("Couldn't fetch KV pairs. " + result.reason);
      continue;
    }

    res = { ...res, ...Object.fromEntries(result.value) };
  }

  return res;
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // Для DEV
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}
