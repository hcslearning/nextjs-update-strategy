// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const path = req.query?.path?.toString()??'/'
    console.log(`revalidando ${path}...`)
    await res.revalidate(path)
    res.status(200).end()
  } catch(err) {
    res.status(500).end() 
  }  
}
