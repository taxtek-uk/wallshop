---
description: Repository Information Overview
alwaysApply: true
---

# WallShop Information

## Summary
WallShop is a modern web application for a smart wall and home automation products e-commerce platform. It showcases various wall panels, smart devices, and home automation solutions with an interactive UI for product exploration and customization.

## Structure
- **client/**: React frontend application with TypeScript
- **server/**: Express.js backend API server
- **shared/**: Shared code between client and server
- **netlify/**: Netlify serverless functions
- **public/**: Static assets (images, videos, icons)
- **dist/**: Build output directory

## Language & Runtime
**Language**: TypeScript/JavaScript
**Version**: ES2020 target
**Build System**: Vite
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- React 18.3.1
- React Router 6.30.1
- Express 4.18.2
- Three.js 0.176.0
- Framer Motion 12.23.7
- Radix UI (various components)
- TanStack React Query 5.56.2
- Tailwind CSS 3.4.11

**Development Dependencies**:
- TypeScript 5.5.3
- Vite 7.0.6
- SWC 1.11.24
- Vitest 3.1.4

## Build & Installation
```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## Deployment
**Netlify Configuration**:
- Build command: `npm run build:client`
- Publish directory: `dist/spa`
- Functions directory: `netlify/functions`
- API routes are proxied to serverless functions

**Vercel Configuration**:
- Static build from `dist/spa`
- Client-side routing with rewrites to index.html

## Architecture
**Frontend**:
- React SPA with TypeScript
- Component-based UI architecture
- Tailwind CSS for styling
- React Router for navigation
- Three.js for 3D visualizations

**Backend**:
- Express.js API server
- Serverless functions for deployment
- RESTful API endpoints

## Testing
**Framework**: Vitest
**Run Command**:
```bash
npm test
```