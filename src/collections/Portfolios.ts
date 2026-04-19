import type { CollectionConfig } from 'payload'

export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'isActive', 'order'],
    description: 'Kelola item portfolio proyek yang telah dikerjakan.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Proyek',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        position: 'sidebar',
        description: 'Digunakan untuk URL. Contoh: auto-bintan-taxi',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Kategori',
      options: [
        { label: 'Company Profile', value: 'company' },
        { label: 'Custom App', value: 'custom' },
        { label: 'E-Commerce', value: 'ecommerce' },
        { label: 'Landing Page', value: 'landing' },
      ],
      defaultValue: 'company',
    },
    {
      name: 'categoryLabel',
      type: 'text',
      required: true,
      label: 'Label Kategori (Tampilan)',
      admin: {
        description: 'Teks yang ditampilkan di badge. Contoh: Company Profile',
      },
    },
    {
      name: 'image',
      type: 'text',
      required: true,
      label: 'Path Gambar',
      admin: {
        description: 'Path gambar relatif dari /public. Contoh: /Portfolio/autobintantaxi.jpg',
      },
    },
    {
      name: 'link',
      type: 'text',
      label: 'URL Website Live',
      admin: {
        description: 'Link ke website yang sudah online. Kosongkan jika belum ada.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Deskripsi Proyek',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tech Stack / Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'color',
      type: 'text',
      label: 'Gradient Color Classes',
      defaultValue: 'from-blue-600 to-indigo-700',
      admin: {
        description: 'Tailwind gradient classes. Contoh: from-amber-500 to-orange-600',
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Tampilkan di Beranda',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Urutan Tampil',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Aktifkan Portfolio',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
