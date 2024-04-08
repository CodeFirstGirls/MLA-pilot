import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const user = searchParams.get('user')
  const start = searchParams.get('start')
  const end = searchParams.get('end')
  const url = `${process.env.ANALYTICS_SERVICE_PATH}/stats/weekly/?user=${user}&start=${start}&end=${end}`
  const response = await fetch(url, {
    headers: {
      Authorization: process.env.TYK_API_KEY,
    },
  })
  return response
}
