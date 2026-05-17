import { chromium } from 'playwright';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ma_bheshaj';

function generateSlug(name, index) {
  let slug = name.trim().replace(/[\s]+/g, '-').replace(/[^\u0980-\u09FF\u200Da-zA-Z0-9\-]/g, '').substring(0, 60);
  if (!slug || slug === '-') slug = `product-${index}`;
  return slug;
}

function isRealProduct(name) {
  const skip = ['logo','hero','banner','slider','footer','header','icon','menu','close','search','cart','profile','facebook','instagram','whatsapp','মা ভেষজ বাণিজ্যালয়','Ma Bhesoj'];
  const lower = name.toLowerCase();
  return !skip.some(w => lower.includes(w)) && name.length > 2;
}

async function scrapeProducts() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });

  const products = [];
  const seenSlugs = new Set();

  try {
    await page.goto('https://mavesoj.com/shop', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(6000);

    const extracted = await page.evaluate(() => {
      const bn = {'০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9'};
      const toE = (s) => s.split('').map(c => bn[c] || c).join('');
      const items = [];
      const seen = new Set();
      
      for (const img of document.querySelectorAll('img[alt]')) {
        const alt = img.getAttribute('alt')?.trim();
        const src = img.getAttribute('src');
        if (!alt || !src) continue;
        if (alt.includes('logo') || alt.includes('hero') || alt.includes('banner') || alt.includes('slider')) continue;
        if (src.includes('logo.svg')) continue;
        if (alt.length < 3) continue;
        if (seen.has(alt)) continue;
        seen.add(alt);
        
        let el = img;
        let txt = '';
        for (let i = 0; i < 4 && el; i++) {
          txt += ' ' + (el.textContent || '');
          el = el.parentElement;
        }
        
        // Match ৳ followed by Bengali digits
        const matches = txt.match(/৳\s*[০-৯]+/g);
        let price = 0, comparePrice;
        
        if (matches) {
          const prices = matches.map(p => {
            const n = parseInt(toE(p).replace(/[৳\s]/g, ''));
            return isNaN(n) ? 0 : n;
          }).filter(p => p > 0);
          
          if (prices.length >= 2) {
            price = Math.min(...prices);
            comparePrice = Math.max(...prices);
          } else if (prices.length === 1) {
            price = prices[0];
          }
        }
        
        items.push({ name: alt, price, comparePrice, image: src });
      }
      return items;
    });

    console.log(`Shop: ${extracted.length} products`);
    for (const data of extracted) {
      if (!isRealProduct(data.name)) continue;
      const slug = generateSlug(data.name, products.length + 1);
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);
      const imageUrl = data.image.startsWith('http') ? data.image : `https://mavesoj.com${data.image.startsWith('/') ? '' : '/'}${data.image}`;
      products.push({
        name: data.name, slug,
        description: `${data.name} — মা ভেষজ বাণিজ্যালয় থেকে ১০০% প্রাকৃতিক ও কেমিক্যাল ফ্রি ভেষজ পণ্য।`,
        price: data.price || 1000,
        comparePrice: data.comparePrice,
        images: [{ url: imageUrl }],
        category: 'ভেষজ', tags: ['ভেষজ', 'প্রাকৃতিক'],
        stock: Math.floor(Math.random() * 50) + 10,
        isFeatured: false, isActive: true,
      });
    }

    await page.goto('https://mavesoj.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(6000);

    const homeExtracted = await page.evaluate(() => {
      const bn = {'০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9'};
      const toE = (s) => s.split('').map(c => bn[c] || c).join('');
      const items = [];
      const seen = new Set();
      
      for (const img of document.querySelectorAll('img[alt]')) {
        const alt = img.getAttribute('alt')?.trim();
        const src = img.getAttribute('src');
        if (!alt || !src) continue;
        if (alt.includes('logo') || alt.includes('hero') || alt.includes('banner') || alt.includes('slider')) continue;
        if (src.includes('logo.svg')) continue;
        if (alt.length < 3) continue;
        if (seen.has(alt)) continue;
        seen.add(alt);
        
        let el = img;
        let txt = '';
        for (let i = 0; i < 4 && el; i++) {
          txt += ' ' + (el.textContent || '');
          el = el.parentElement;
        }
        
        const matches = txt.match(/৳\s*[০-৯]+/g);
        let price = 0, comparePrice;
        
        if (matches) {
          const prices = matches.map(p => {
            const n = parseInt(toE(p).replace(/[৳\s]/g, ''));
            return isNaN(n) ? 0 : n;
          }).filter(p => p > 0);
          
          if (prices.length >= 2) {
            price = Math.min(...prices);
            comparePrice = Math.max(...prices);
          } else if (prices.length === 1) {
            price = prices[0];
          }
        }
        
        items.push({ name: alt, price, comparePrice, image: src });
      }
      return items;
    });

    console.log(`Home: ${homeExtracted.length} products`);
    for (const data of homeExtracted) {
      if (!isRealProduct(data.name)) continue;
      const slug = generateSlug(data.name, products.length + 1);
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);
      const imageUrl = data.image.startsWith('http') ? data.image : `https://mavesoj.com${data.image.startsWith('/') ? '' : '/'}${data.image}`;
      products.push({
        name: data.name, slug,
        description: `${data.name} — মা ভেষজ বাণিজ্যালয় থেকে ১০০% প্রাকৃতিক ও কেমিক্যাল ফ্রি ভেষজ পণ্য।`,
        price: data.price || 1000,
        comparePrice: data.comparePrice,
        images: [{ url: imageUrl }],
        category: 'ভেষজ', tags: ['ভেষজ', 'প্রাকৃতিক'],
        stock: Math.floor(Math.random() * 50) + 10,
        isFeatured: true, isActive: true,
      });
    }

    console.log(`Total: ${products.length}`);

  } catch (error) {
    console.error('Scraping error:', error);
  } finally {
    await browser.close();
  }

  return products;
}

async function main() {
  await mongoose.connect(MONGODB_URI);
  await mongoose.connection.collection('products').deleteMany({});
  const products = await scrapeProducts();
  if (products.length > 0) {
    await mongoose.connection.collection('products').insertMany(products);
    console.log(`Inserted ${products.length} products`);
  }
  await mongoose.disconnect();
}

main().catch(console.error);
