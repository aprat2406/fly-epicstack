#!/usr/bin/env node

import { execSync } from 'child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Running database migrations...')
    
    // Run Prisma migrations
    execSync('npx prisma migrate deploy', { stdio: 'inherit' })
    
    // Generate Prisma client
    execSync('npx prisma generate', { stdio: 'inherit' })
    
    console.log('Database migrations completed successfully!')
  } catch (error) {
    console.error('Error running migrations:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main() 