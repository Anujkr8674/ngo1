import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params

    // Resolve base path dynamically (e.g. /var/www/uploads on VPS)
    const uploadsBase = process.env.UPLOAD_DIR_PATH || path.join(process.cwd(), 'uploads')
    const resolvedPath = path.join(uploadsBase, ...pathSegments)

    // Prevent directory traversal attacks
    if (!resolvedPath.startsWith(uploadsBase)) {
      return new NextResponse('Access Denied', { status: 403 })
    }

    if (!fs.existsSync(resolvedPath)) {
      return new NextResponse('File Not Found', { status: 404 })
    }

    const stat = fs.statSync(resolvedPath)
    if (!stat.isFile()) {
      return new NextResponse('Not a file', { status: 400 })
    }

    const fileBuffer = fs.readFileSync(resolvedPath)
    const ext = path.extname(resolvedPath).toLowerCase()
    
    let contentType = 'application/octet-stream'
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'
    else if (ext === '.png') contentType = 'image/png'
    else if (ext === '.gif') contentType = 'image/gif'
    else if (ext === '.webp') contentType = 'image/webp'
    else if (ext === '.svg') contentType = 'image/svg+xml'
    else if (ext === '.pdf') contentType = 'application/pdf'
    else if (ext === '.mp4') contentType = 'video/mp4'
    else if (ext === '.webm') contentType = 'video/webm'
    else if (ext === '.mov') contentType = 'video/quicktime'

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': stat.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error: any) {
    console.error('Error serving local upload:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
