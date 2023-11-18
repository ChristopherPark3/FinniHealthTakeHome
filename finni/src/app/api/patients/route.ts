import {NextRequest, NextResponse} from 'next/server'
import Patient from '~/app/(models)/patient'

export async function POST(req: NextRequest): Promise<NextResponse<unknown>> {
  try {
    const body: unknown = await req.json();
    console.log(body)
    return NextResponse.json({message: "success"})
  } catch (error) {
    return NextResponse.json({message: "Error", error })
  }
}
