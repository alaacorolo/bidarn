const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurable Site URL for Sitemap generation
const SITE_URL = 'https://bidarn.tv'; 

// Enable gzip compression for better page loading speeds (Core Web Vitals)
app.use(compression());

// Serve static assets from public/css, public/js, public/images
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d', // Cache static resources for 1 day
  index: false  // Disable automatic serving of index.html from static middleware
}));

// Route for dynamic robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);
});

// Route for dynamic sitemap.xml (French paths)
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/abonnement</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/faq</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/tutoriel</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
`);
});

// Clean URLs Routing - French paths
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/abonnement', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'abonnement.html'));
});

app.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'faq.html'));
});

app.get('/tutoriel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tutoriel.html'));
});

// Handle 404 - Keep it premium and user-friendly in French
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running in production mode on port ${PORT}`);
});
