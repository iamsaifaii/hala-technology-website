import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Article / Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: '📝 Article Content', default: true },
    { name: 'seo', title: '🚀 SEO & Target Keywords' },
    { name: 'categorization', title: '🏷️ Services & Categories' },
    { name: 'meta', title: '👥 Author & Publishing' },
    { name: 'media', title: '🖼️ Media & Cover' },
  ],
  fields: [
    // --- CONTENT GROUP ---
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'content',
      description: 'The URL-friendly identifier for this article (e.g., seo-consulting-services). Must be all lowercase with hyphens and no spaces.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 96),
      },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return 'Slug is required';
          const current = slug.current;
          if (/\s/.test(current)) {
            return 'Slug cannot contain spaces. Use hyphens (-) instead (e.g., seo-consulting-services).';
          }
          if (current !== current.toLowerCase()) {
            return 'Slug must be in lowercase only.';
          }
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(current)) {
            return 'Slug can only contain lowercase letters, numbers, and hyphens (no consecutive hyphens or special characters).';
          }
          return true;
        }),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Summary / Excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'A brief summary shown in article previews and cards.',
    }),
    defineField({
      name: 'body',
      title: 'Full Article Body',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),

    // --- SEO GROUP ---
    defineField({
      name: 'focusKeyword',
      title: '🎯 Focus Keyword',
      type: 'string',
      group: 'seo',
      description: 'Primary target keyword or keyphrase for SEO ranking (e.g. "website development Dubai", "AI Agent automation")',
      validation: (rule) => rule.required().error('Please specify a focus keyword for SEO optimization.'),
    }),
    defineField({
      name: 'seoTitle',
      title: 'Meta Title (SEO Title)',
      type: 'string',
      group: 'seo',
      description: 'Custom search engine title tag. Defaults to article title if left empty.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'Short description for Google search results (recommended 120-160 characters).',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image (OG Image)',
      type: 'image',
      group: 'seo',
      description: 'Image displayed when sharing this article link on LinkedIn, WhatsApp, or Twitter.',
      options: { hotspot: true },
    }),

    // --- CATEGORIZATION GROUP ---
    defineField({
      name: 'serviceCategory',
      title: 'Primary Service',
      type: 'string',
      group: 'categorization',
      description: 'Select the website service this article belongs to.',
      options: {
        list: [
          { title: '🌐 Website Development', value: 'website-development' },
          { title: '🤖 AI Agent Solutions', value: 'ai-agent' },
          { title: '📈 Digital Marketing (General)', value: 'digital-marketing' },
          { title: '🔍 Search Engine Optimization (SEO)', value: 'seo' },
          { title: '🎯 Pay-Per-Click Advertising (PPC)', value: 'ppc' },
          { title: '📱 Social Media Marketing (SMM)', value: 'smm' },
          { title: '🎨 Branding & Graphic Design', value: 'branding' },
          { title: '💬 WhatsApp Automation', value: 'whatsapp-automation' },
        ],
      },
    }),
    defineField({
      name: 'categories',
      title: 'Sub-Categories / Tags',
      type: 'array',
      group: 'categorization',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),

    // --- META GROUP ---
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'meta',
      to: { type: 'author' },
      description: 'Select the article author (e.g. Hala Team, Saif Ali, Taimoor Ali Warraich, etc.)',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publishing Date',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time (minutes)',
      type: 'number',
      group: 'meta',
      initialValue: 5,
    }),

    // --- MEDIA GROUP ---
    defineField({
      name: 'mainImage',
      title: 'Featured Cover Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      service: 'serviceCategory',
      keyword: 'focusKeyword',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, author, service, keyword, media } = selection
      const subtitleStr = [
        author ? `by ${author}` : 'Hala Team',
        service ? `[${service}]` : '',
        keyword ? `🎯 ${keyword}` : '',
      ].filter(Boolean).join(' | ')

      return {
        title: title || 'Untitled Article',
        subtitle: subtitleStr,
        media,
      }
    },
  },
})
