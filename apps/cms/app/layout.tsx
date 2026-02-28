import config from '@payload-config'
import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import React from 'react'

import { importMap } from './(payload)/admin/importMap.js'
import './(payload)/custom.scss'
import './globals.css'

/** Admin UI の useId hydration mismatch を軽減 */
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TDU SRC CMS',
  description: 'Content Management System for TDU SRC Website',
}

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function Layout({ children }: Args) {
  return (
    <RootLayout
      config={Promise.resolve(config)}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  )
}
