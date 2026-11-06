import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.hiramani.co.in';

  const routes = [
    '',
    '/about',
    '/doctors',
    '/departments',
    '/diagnostics',
    '/packages',
    '/patient-info',
    '/insurance',
    '/news',
    '/careers',
    '/contact',
    '/book',
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/doctors' || route === '/book' ? 0.9 : 0.8,
  }));
}

