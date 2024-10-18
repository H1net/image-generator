// import { log } from 'console'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { prompt } = await req.json()
  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
  }
  try {
    console.log('A')
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
    })
    console.log('B')
    console.log(response)
    const imageUrl = response.data[0].url
    return NextResponse.json({ imageUrl })
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate an image' },
      { status: 500 }
    )
  }
}
