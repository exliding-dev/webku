import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

/**
 * All-in-One Seed Endpoint
 *
 * POST /api/seed-all
 *   Header: x-seed-secret: <ADMIN_SECRET_KEY>
 *   → Seeds services, products, portfolios, and templates into Payload CMS
 *
 * GET /api/seed-all?key=<ADMIN_SECRET_KEY>
 *   → Status check for all collections
 *
 * ⚠️  Disable di production: set DISABLE_SEED_ENDPOINT=true di .env
 */

const SEED_ENDPOINT_DISABLED = process.env.DISABLE_SEED_ENDPOINT === 'true'

function getSecretKey(): string {
  return process.env.ADMIN_SECRET_KEY || process.env.SEED_SECRET || ''
}

function checkAuth(req: NextRequest): boolean {
  const secretKey =
    req.nextUrl.searchParams.get('key') ??
    req.headers.get('x-seed-secret') ??
    ''
  return secretKey === getSecretKey() && secretKey !== ''
}

// ─── SERVICES DATA ──────────────────────────────────────────────────────────

const SERVICES_DATA = [
  {
    slug: 'starter',
    name: 'Paket Starter',
    price: 'Rp 1.000.000',
    period: '/sekali bayar',
    tagline: 'Paket Pemula Terbaik',
    features: [
      { feature: 'Gratis Domain .com atau .net selama 1 tahun' },
      { feature: 'Hosting RAM 1 GB & Storage 2 GB' },
      { feature: 'Free SSL untuk keamanan' },
      { feature: 'Backup Harian' },
      { feature: 'Desain Premium & Responsif' },
      { feature: '2 Artikel SEO-ready' },
      { feature: 'Setup Protection' },
      { feature: '1 Halaman (utama + tambahan)' },
    ],
    renewal: 'Rp600.000',
    notes: 'Tidak termasuk cPanel',
    cta: 'Pesan Sekarang',
    popular: false,
    waText: 'Halo%20saya%20tertarik%20Paket%20Starter',
    order: 1,
    isActive: true,
    hasDiscount: false,
  },
  {
    slug: 'pro',
    name: 'Paket Pro',
    price: 'Rp 1.500.000',
    period: '/sekali bayar',
    tagline: 'Paling populer untuk UMKM & bisnis lokal',
    features: [
      { feature: 'Gratis Domain .com atau .net selama 1 tahun' },
      { feature: 'Hosting SSD RAM 3 GB & Storage 5 GB' },
      { feature: 'Free SSL untuk keamanan' },
      { feature: 'Backup Harian' },
      { feature: 'Desain Premium & Responsif' },
      { feature: '4 Artikel SEO-ready' },
      { feature: 'Setup Protection' },
      { feature: '7 Halaman fleksibel' },
      { feature: 'free 1 tahun elementor pro' },
    ],
    renewal: 'Rp850.000',
    notes: 'Tidak termasuk cPanel',
    cta: 'Pesan Sekarang',
    popular: true,
    waText: 'Halo%20saya%20tertarik%20Paket%20Pro',
    order: 2,
    isActive: true,
    hasDiscount: false,
  },
  {
    slug: 'bisnis',
    name: 'Paket Bisnis',
    price: 'Rp 3.000.000',
    period: '/sekali bayar',
    tagline: 'Untuk bisnis yang siap scale up',
    features: [
      { feature: 'Gratis Domain .com atau .net selama 1 tahun' },
      { feature: 'Hosting SSD RAM 6 GB & Unlimited Storage' },
      { feature: 'Termasuk H Panel' },
      { feature: 'Free SSL untuk keamanan' },
      { feature: 'Backup Harian' },
      { feature: 'Desain Premium & Responsif' },
      { feature: 'free 2 tahun elementor pro' },
      { feature: '10 Halaman fleksibel' },
      { feature: '6 Artikel SEO-ready' },
      { feature: 'Setup Protection' },
    ],
    renewal: 'Rp1.500.000',
    notes: null,
    cta: 'Pesan Sekarang',
    popular: false,
    waText: 'Halo%20saya%20tertarik%20Paket%20Bisnis',
    order: 3,
    isActive: true,
    hasDiscount: false,
  },
]

// ─── PRODUCTS (Monthly Packages) DATA ───────────────────────────────────────

const PRODUCTS_DATA = [
  {
    slug: 'starter',
    name: 'Paket Starter',
    price: 'Rp 149.000',
    period: '/bulan',
    tagline: 'Untuk yang baru mulai go online',
    features: [
      { feature: '1 Halaman Landing Page' },
      { feature: 'Desain Premium & Responsif' },
      { feature: 'Free Domain .web.id 1 Tahun' },
      { feature: 'Hosting SSD 1 GB' },
      { feature: 'Free SSL & Keamanan' },
      { feature: 'Backup Harian Otomatis' },
      { feature: 'Support via WhatsApp' },
      { feature: '1 Revisi / bulan' },
    ],
    cta: 'Mulai Sekarang',
    popular: false,
    waText: 'Halo%20saya%20tertarik%20Paket%20Starter%20Bulanan%20Rp149.000/bln',
    order: 1,
    isActive: true,
    hasDiscount: false,
  },
  {
    slug: 'growth',
    name: 'Paket Growth',
    price: 'Rp 299.000',
    period: '/bulan',
    tagline: 'Paling populer untuk UMKM & bisnis lokal',
    features: [
      { feature: '5 Halaman Fleksibel' },
      { feature: 'Desain Premium & Custom' },
      { feature: 'Free Domain .com 1 Tahun' },
      { feature: 'Hosting SSD 3 GB' },
      { feature: 'Free SSL & Keamanan' },
      { feature: 'Backup Harian Otomatis' },
      { feature: 'SEO On-Page Setup' },
      { feature: '3 Artikel SEO / bulan' },
      { feature: 'Google Analytics Setup' },
      { feature: 'Priority WhatsApp Support' },
      { feature: '3 Revisi / bulan' },
    ],
    cta: 'Pilih Paket Ini',
    popular: true,
    waText: 'Halo%20saya%20tertarik%20Paket%20Growth%20Bulanan%20Rp299.000/bln',
    order: 2,
    isActive: true,
    hasDiscount: false,
  },
  {
    slug: 'scale',
    name: 'Paket Scale',
    price: 'Rp 499.000',
    period: '/bulan',
    tagline: 'Untuk bisnis yang siap scale up',
    features: [
      { feature: '10 Halaman + Fitur Custom' },
      { feature: 'Desain Premium & Full Branding' },
      { feature: 'Free Domain .com/.co.id 1 Tahun' },
      { feature: 'Hosting SSD 6 GB Unlimited' },
      { feature: 'Free SSL & Advanced Security' },
      { feature: 'Backup Harian + Weekly Archive' },
      { feature: 'Full SEO Setup & Monitoring' },
      { feature: '5 Artikel SEO / bulan' },
      { feature: 'Google Analytics + Search Console' },
      { feature: 'Integrasi WhatsApp & Sosmed' },
      { feature: 'Dedicated Support 7 Hari' },
      { feature: 'Unlimited Revisi' },
    ],
    cta: 'Scale Bisnis Saya',
    popular: false,
    waText: 'Halo%20saya%20tertarik%20Paket%20Scale%20Bulanan%20Rp499.000/bln',
    order: 3,
    isActive: true,
    hasDiscount: false,
  },
]

// ─── PORTFOLIOS DATA ────────────────────────────────────────────────────────

const PORTFOLIOS_DATA = [
  {
    slug: 'sma-insan-cendekia',
    title: 'SMA Insan Cendekia',
    category: 'company',
    categoryLabel: 'Company Profile',
    link: 'https://sekolahweb.vercel.app',
    description: 'Website profil sekolah modern dengan fitur galeri kegiatan, portal PPDB online, jadwal akademik, dan kabar terkini sekolah.',
    tags: [{ tag: 'Next.js' }, { tag: 'Tailwind' }, { tag: 'Framer Motion' }],
    color: 'from-blue-600 to-indigo-700',
    featured: true,
    order: 1,
    isActive: true,
    _imagePath: 'public/Portfolio/SMA insan cendikia.png',
    _imageAlt: 'Website SMA Insan Cendekia',
  },
  {
    slug: 'auto-bintan-taxi',
    title: 'Auto Bintan Taxi',
    category: 'company',
    categoryLabel: 'Company Profile',
    link: 'https://autobintantaxi.com',
    description: 'Website rental & paket wisata transportasi di Bintan dengan fitur pencarian trip, booking via WhatsApp, dan galeri destinasi.',
    tags: [{ tag: 'React' }, { tag: 'Tailwind' }, { tag: 'Vercel' }],
    color: 'from-amber-500 to-orange-600',
    featured: true,
    order: 2,
    isActive: true,
    _imagePath: 'public/Portfolio/autobintantaxi.jpg',
    _imageAlt: 'Website Auto Bintan Taxi',
  },
  {
    slug: 'webgis-goldar-surakarta',
    title: 'WebGIS Persebaran Golongan Darah',
    category: 'custom',
    categoryLabel: 'Custom App',
    link: 'https://webgis-goldarah-surakarta.vercel.app/',
    description: 'Aplikasi peta interaktif visualisasi sebaran golongan darah per kelurahan di Kota Surakarta, lengkap dengan statistik dan filter data.',
    tags: [{ tag: 'React' }, { tag: 'Leaflet.js' }, { tag: 'Express' }],
    color: 'from-red-600 to-rose-700',
    featured: true,
    order: 3,
    isActive: true,
    _imagePath: 'public/Portfolio/webgissolo.png',
    _imageAlt: 'WebGIS Golongan Darah Surakarta',
  },
  {
    slug: 'website-puskesmas',
    title: 'Website Puskesmas',
    category: 'company',
    categoryLabel: 'Company Profile',
    link: 'https://puskesmas.halocode.web.id/',
    description: 'Website layanan kesehatan masyarakat dengan fitur pendaftaran online, informasi layanan, jadwal dokter, dan dark mode.',
    tags: [{ tag: 'Next.js' }, { tag: 'Tailwind' }, { tag: 'Prisma' }],
    color: 'from-cyan-600 to-sky-700',
    featured: true,
    order: 4,
    isActive: true,
    _imagePath: 'public/Portfolio/webpuskesmas.jpg',
    _imageAlt: 'Website Puskesmas',
  },
]

// ─── BLOG POSTS DATA ────────────────────────────────────────────────────────

const BLOG_POSTS_DATA = [
  {
    slug: 'pentingnya-seo',
    title: 'Kenapa SEO Penting untuk Bisnis Lokal di Klaten?',
    date: '2026-02-25',
    excerpt: 'SEO bukan hanya untuk perusahaan besar. Pelajari bagaimana optimasi mesin pencari bisa mendatangkan pelanggan baru untuk bisnis lokal Anda.',
    thumbnail: '/blog/seo-penting.jpg',
    tags: [{ tag: 'SEO' }, { tag: 'bisnis lokal' }, { tag: 'digital marketing' }],
    author: 'Exliding',
    content: {
      root: {
        type: 'root',
        children: [
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Apa Itu SEO?' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'SEO (Search Engine Optimization) adalah teknik untuk membuat website Anda muncul di halaman pertama Google. Ketika seseorang mengetik "jasa website Klaten" atau "toko bangunan terdekat", SEO menentukan apakah bisnis Anda yang muncul atau kompetitor.' }] },
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Fakta SEO yang Perlu Anda Tahu' }] },
          { type: 'list', listType: 'bullet', children: [
            { type: 'listitem', children: [{ type: 'text', text: '75% pengguna tidak pernah scroll melewati halaman pertama Google', format: ['bold'] }] },
            { type: 'listitem', children: [{ type: 'text', text: '46% pencarian di Google bersifat lokal', format: ['bold'] }] },
            { type: 'listitem', children: [{ type: 'text', text: 'Bisnis yang muncul di 3 teratas Google Maps mendapat 70% klik', format: ['bold'] }] },
          ]},
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Strategi SEO untuk Bisnis Lokal' }] },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'Google Business Profile' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Langkah pertama yang wajib dilakukan: Klaim profil bisnis Anda di Google, lengkapi semua informasi (alamat, jam buka, foto), dan minta pelanggan untuk memberi review.' }] },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'Kata Kunci Lokal' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Gunakan kata kunci yang relevan dengan lokasi seperti "Jasa pembuatan website Klaten", "Web developer Solo Raya", "Desain website murah Jawa Tengah".' }] },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'Konten Berkualitas' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Buat blog dan artikel yang bermanfaat: tips dan tutorial, studi kasus proyek, berita terkait industri.' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Jangan biarkan kompetitor mendahului Anda di Google. Tim Exliding siap membantu optimasi SEO website bisnis Anda. Hubungi kami untuk konsultasi gratis!' }] },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    isPublished: true,
  },
  {
    slug: 'tips-website-menjual',
    title: 'Tips Membuat Website yang Menjual untuk Bisnis Lokal',
    date: '2026-03-01',
    excerpt: 'Website bukan hanya soal tampilan. Pelajari bagaimana membuat website yang benar-benar menghasilkan pelanggan untuk bisnis Anda di Klaten dan sekitarnya.',
    thumbnail: '/blog/tips-website.jpg',
    tags: [{ tag: 'web design' }, { tag: 'tips' }, { tag: 'bisnis lokal' }],
    author: 'Exliding',
    content: {
      root: {
        type: 'root',
        children: [
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Kenapa Website Penting untuk Bisnis Lokal?' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Di era digital, 97% konsumen mencari bisnis lokal secara online sebelum mengunjungi toko fisik. Jika bisnis Anda di Klaten belum punya website, Anda kehilangan banyak peluang.' }] },
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: '5 Tips Website yang Menjual' }] },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: '1. Loading Super Cepat' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Website yang loading lebih dari 3 detik akan ditinggalkan 53% pengunjung. Pastikan website Anda menggunakan hosting yang cepat, optimasi gambar dan aset, serta implementasi lazy loading.' }] },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: '2. Mobile Responsive' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Lebih dari 60% traffic website datang dari smartphone. Website Anda harus tampil sempurna di semua ukuran layar.' }] },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: '3. Call-to-Action yang Jelas' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Setiap halaman harus punya tujuan jelas: tombol "Hubungi Kami" yang menonjol, form kontak yang mudah diisi, nomor WhatsApp yang bisa langsung diklik.' }] },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: '4. SEO-Friendly' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Agar mudah ditemukan di Google: gunakan kata kunci lokal, buat konten berkualitas secara rutin, pastikan struktur website rapi.' }] },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: '5. Testimoni dan Portfolio' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Calon pelanggan perlu bukti. Tampilkan testimoni dari klien sebelumnya, portfolio hasil kerja, rating dan review.' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Website yang menjual bukan soal desain mewah saja, tapi soal strategi yang tepat. Butuh bantuan membuat website untuk bisnis Anda? Konsultasi gratis dengan tim Exliding!' }] },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    isPublished: true,
  },
  {
    slug: 'website-vs-social-media',
    title: 'Website vs Sosial Media: Mana yang Lebih Penting untuk Bisnis?',
    date: '2026-02-20',
    excerpt: 'Banyak pemilik bisnis mengandalkan sosial media saja. Tapi apakah itu cukup? Simak perbandingan lengkapnya.',
    thumbnail: '/blog/website-vs-socmed.jpg',
    tags: [{ tag: 'web design' }, { tag: 'social media' }, { tag: 'bisnis' }],
    author: 'Exliding',
    content: {
      root: {
        type: 'root',
        children: [
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Sosial Media Saja Tidak Cukup' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Banyak pemilik bisnis di Klaten yang berpikir: "Saya sudah punya Instagram dan Facebook, buat apa website?" Ini adalah miskonsepsi yang bisa merugikan bisnis Anda.' }] },
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Perbandingan Website vs Sosial Media' }] },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'Kepemilikan Konten' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Sosial Media: Konten Anda "menumpang" di platform milik orang lain. Akun bisa di-suspend, algoritma bisa berubah. Website: 100% milik Anda. Konten aman dan terkontrol penuh.' }] },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'Kredibilitas' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Sosial Media: Siapa saja bisa buat akun. Sulit membedakan bisnis serius dan abal-abal. Website: Memberikan kesan profesional dan terpercaya. Domain sendiri menunjukkan keseriusan bisnis.' }] },
          { type: 'heading', tag: 'h3', children: [{ type: 'text', text: 'SEO & Discoverability' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Sosial Media: Terbatas pada pengguna platform tersebut. Website: Bisa ditemukan siapa saja melalui Google, kapan saja.' }] },
          { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Solusi Terbaik: Keduanya!' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Strategi optimal adalah menggunakan keduanya secara bersamaan: Website sebagai "rumah utama" bisnis Anda, Sosial Media sebagai saluran promosi yang mengarahkan ke website, Blog di website untuk konten mendalam yang mendukung SEO.' }] },
          { type: 'paragraph', children: [{ type: 'text', text: 'Jangan tunda lagi! Tim Exliding siap membantu Anda membuat website profesional dengan harga terjangkau. Mulai dari Rp 1 juta saja!' }] },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    isPublished: true,
  },
]

// ─── TEMPLATES DATA ─────────────────────────────────────────────────────────

function loadTemplatesFromJSON(): any[] {
  const dir = path.join(/*turbopackIgnore: true*/ process.cwd(), 'content/templates')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'))
  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
    const data = JSON.parse(raw)
    // Convert to Payload format
    const slug = filename.replace('.json', '')
    return {
      slug,
      name: data.name,
      category: data.category,
      price: data.price,
      oldPrice: data.oldPrice || 0,
      buyers: data.buyers || 0,
      pages: data.pages || 1,
      tags: data.tags ? data.tags.map((t: string) => ({ tag: t })) : [],
      previewGradient: data.preview || 'from-blue-600 to-indigo-700',
      accentColor: data.accentColor || '#3b82f6',
      badge: data.badge || null,
      features: data.features ? data.features.map((f: string) => ({ feature: f })) : [],
      waText: data.waText || '',
      order: data.order || 0,
      isActive: true,
    }
  })
}

// ─── HELPERS ────────────────────────────────────────────────────────────────

async function upsertCollection(
  payload: any,
  collection: string,
  slugField: string,
  items: any[],
): Promise<{ slug: string; action: string }[]> {
  const results: { slug: string; action: string }[] = []

  for (const item of items) {
    const slug = item[slugField]
    // Remove internal fields prefixed with _
    const data = { ...item }
    Object.keys(data).forEach((k) => {
      if (k.startsWith('_')) delete data[k]
    })

    try {
      const existing = await payload.find({
        collection,
        where: { [slugField]: { equals: slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        const id = existing.docs[0].id
        await payload.update({ collection, id, data })
        results.push({ slug, action: 'updated' })
      } else {
        await payload.create({ collection, data })
        results.push({ slug, action: 'created' })
      }
    } catch (error: any) {
      results.push({ slug, action: `error: ${error.message}` })
    }
  }

  return results
}

async function uploadPortfolioImage(
  payload: any,
  imagePath: string,
  alt: string,
): Promise<number | null> {
  const fullPath = path.join(/*turbopackIgnore: true*/ process.cwd(), imagePath)
  if (!fs.existsSync(fullPath)) {
    console.warn(`Image not found: ${fullPath}`)
    return null
  }

  // Check if media with this alt already exists
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    return existing.docs[0].id
  }

  // Read file and upload
  const fileBuffer = fs.readFileSync(fullPath)
  const fileName = path.basename(fullPath)
  const ext = path.extname(fileName).toLowerCase()
  const mimeMap: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  }

  try {
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: fileBuffer,
        name: fileName,
        mimetype: mimeMap[ext] || 'image/jpeg',
        size: fileBuffer.length,
      },
    })
    return doc.id
  } catch (error: any) {
    console.error(`Failed to upload ${fileName}:`, error.message)
    return null
  }
}

// ─── GET: Status check ──────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  if (SEED_ENDPOINT_DISABLED) {
    return NextResponse.json({ error: 'Seed endpoint disabled.' }, { status: 403 })
  }
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized — Secret key tidak valid.' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const [services, products, portfolios, templates, blogPosts] = await Promise.all([
      payload.find({ collection: 'services', limit: 1 }),
      payload.find({ collection: 'products', limit: 1 }),
      payload.find({ collection: 'portfolios', limit: 1 }),
      payload.find({ collection: 'templates', limit: 1 }),
      payload.find({ collection: 'blog-posts', limit: 1 }),
    ])

    return NextResponse.json({
      status: 'ok',
      collections: {
        services: services.totalDocs,
        products: products.totalDocs,
        portfolios: portfolios.totalDocs,
        templates: templates.totalDocs,
        blogPosts: blogPosts.totalDocs,
      },
      hint: 'POST ke endpoint ini untuk seed semua data.',
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}

// ─── POST: Seed all collections ─────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (SEED_ENDPOINT_DISABLED) {
    return NextResponse.json({ error: 'Seed endpoint disabled.' }, { status: 403 })
  }
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized — Secret key tidak valid.' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const allResults: Record<string, any[]> = {}

    // 1. Seed Services
    console.log('[seed-all] Seeding services...')
    allResults.services = await upsertCollection(payload, 'services', 'slug', SERVICES_DATA)

    // 2. Seed Products (Monthly Packages)
    console.log('[seed-all] Seeding products...')
    allResults.products = await upsertCollection(payload, 'products', 'slug', PRODUCTS_DATA)

    // 3. Seed Portfolios (with image uploads)
    console.log('[seed-all] Seeding portfolios...')
    const portfolioResults: { slug: string; action: string }[] = []

    for (const portfolio of PORTFOLIOS_DATA) {
      const slug = portfolio.slug
      try {
        // Upload image first
        let imageId: number | null = null
        if (portfolio._imagePath) {
          imageId = await uploadPortfolioImage(payload, portfolio._imagePath, portfolio._imageAlt)
        }

        // Prepare data without internal fields
        const data: any = { ...portfolio }
        delete data._imagePath
        delete data._imageAlt
        if (imageId) {
          data.image = imageId
        }

        const existing = await payload.find({
          collection: 'portfolios',
          where: { slug: { equals: slug } },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          const id = existing.docs[0].id
          await payload.update({ collection: 'portfolios', id, data })
          portfolioResults.push({ slug, action: 'updated' })
        } else {
          await payload.create({ collection: 'portfolios', data })
          portfolioResults.push({ slug, action: 'created' })
        }
      } catch (error: any) {
        portfolioResults.push({ slug, action: `error: ${error.message}` })
      }
    }
    allResults.portfolios = portfolioResults

    // 4. Seed Templates (from JSON files)
    console.log('[seed-all] Seeding templates...')
    const templatesData = loadTemplatesFromJSON()
    allResults.templates = await upsertCollection(payload, 'templates', 'slug', templatesData)

    // 5. Seed Blog Posts
    console.log('[seed-all] Seeding blog posts...')
    allResults.blogPosts = await upsertCollection(payload, 'blog-posts', 'slug', BLOG_POSTS_DATA)

    // Summary
    const totalSeeded = Object.values(allResults).reduce((acc, arr) => acc + arr.length, 0)

    return NextResponse.json({
      success: true,
      message: `✅ ${totalSeeded} item berhasil diseed ke Payload CMS!`,
      results: allResults,
    })
  } catch (error: any) {
    console.error('[seed-all] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error saat seed.' },
      { status: 500 },
    )
  }
}
