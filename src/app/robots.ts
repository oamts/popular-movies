import { MetadataRoute } from 'next'

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'http://localhost:3000/sitemap.xml',
  }
}
