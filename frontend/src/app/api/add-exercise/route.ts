export async function POST(request: Request) {
  const body = await request.json()
  const url = `${process.env.ACTIVITY_TRACKING_SERVICE_PATH}/exercises/add`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.TYK_API_KEY,
    },
    body: JSON.stringify(body),
  })

  return res
}
