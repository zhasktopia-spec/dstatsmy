// api/request.js
const fetch = require('node-fetch');

// Ganti dengan URL dan token dari Upstash
const UPSTASH_URL = 'https://xxxx.upstash.io';
const UPSTASH_TOKEN = 'your_token';

export default async function handler(req, res) {
  // Set CORS agar frontend bisa akses
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'POST') {
    // Increment counter di Redis
    const response = await fetch(`${UPSTASH_URL}/incr/counter`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
      },
    });
    const count = await response.text();
    res.status(200).json({ count: parseInt(count, 10) });
  } 
  else if (req.method === 'GET') {
    // Ambil nilai counter
    const response = await fetch(`${UPSTASH_URL}/get/counter`, {
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
      },
    });
    const count = await response.text();
    res.status(200).json({ count: parseInt(count, 10) });
  } 
  else {
    res.status(405).end('Method Not Allowed');
  }
}