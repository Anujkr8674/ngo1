'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

export default function LayoutWrapper({
  children,
  navbar,
  footer
}: {
  children: React.ReactNode,
  navbar: React.ReactNode,
  footer: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdmin && navbar}
      <main className="flex-1 flex flex-col">{children}</main>
      {!isAdmin && footer}
    </>
  )
}
