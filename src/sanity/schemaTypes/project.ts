import { defineArrayMember, defineField, defineType } from 'sanity';

const projectSection = defineType({
  name: 'projectSection',
  title: '상세 섹션',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: '소제목', type: 'string', validation: rule => rule.required().max(100) }),
    defineField({
      name: 'paragraphs', title: '본문 문단', type: 'array', of: [defineArrayMember({ type: 'text' })],
      validation: rule => rule.min(1),
    }),
  ],
  preview: { select: { title: 'heading', subtitle: 'paragraphs.0' } },
});

const projectMedia = defineType({
  name: 'projectMedia',
  title: '프로젝트 이미지',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: '이미지', type: 'image', options: { hotspot: true }, validation: rule => rule.required() }),
    defineField({ name: 'alt', title: '이미지 설명 (대체 텍스트)', type: 'string', validation: rule => rule.required().max(160) }),
  ],
  preview: { select: { title: 'alt', media: 'image' } },
});

export const project = defineType({
  name: 'portfolioProject',
  title: '포트폴리오 프로젝트',
  type: 'document',
  orderings: [{ title: '사이트 노출 순서', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  groups: [
    { name: 'listing', title: '목록 · 기본 정보', default: true },
    { name: 'detail', title: '상세 페이지' },
    { name: 'search', title: '검색 노출' },
  ],
  fields: [
    defineField({ name: 'title', title: '프로젝트명', type: 'string', group: 'listing', validation: rule => rule.required().max(80) }),
    defineField({
      name: 'slug', title: '페이지 주소', type: 'slug', group: 'listing',
      description: '영문 소문자와 하이픈을 권장합니다. 주소를 바꾸면 이전 링크가 달라집니다.',
      options: { source: 'title', slugify: value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project' },
      validation: rule => rule.required().custom(async (slug, context) => {
        if (!slug?.current || !context.document?._id) return true;
        const client = context.getClient({ apiVersion: '2025-01-01' });
        const id = context.document._id.replace(/^drafts\./, '');
        const existingId = await client.fetch<string | null>(
          '*[_type == "portfolioProject" && slug.current == $slug && !(_id in [$id, $draftId])][0]._id',
          { slug: slug.current, id, draftId: `drafts.${id}` },
        );
        return existingId ? '이미 사용 중인 주소입니다.' : true;
      }),
    }),
    defineField({ name: 'subtitle', title: '한 줄 소개', type: 'string', group: 'listing', validation: rule => rule.required().max(140) }),
    defineField({
      name: 'category', title: '분야', type: 'string', group: 'listing',
      options: { list: [{ title: 'Web', value: 'Web' }, { title: 'Character', value: 'Character' }, { title: 'Branding', value: 'Branding' }, { title: 'UI/UX', value: 'UI/UX' }, { title: 'Mobile', value: 'Mobile' }, { title: 'Other', value: 'Other' }] },
      validation: rule => rule.required(),
    }),
    defineField({ name: 'year', title: '연도', type: 'string', group: 'listing', validation: rule => rule.required().max(12) }),
    defineField({ name: 'client', title: '고객사', type: 'string', group: 'listing', validation: rule => rule.required().max(80) }),
    defineField({ name: 'period', title: '진행 시기', type: 'string', group: 'listing', description: '예: 2025.03–2025.06', validation: rule => rule.max(40) }),
    defineField({ name: 'overview', title: '프로젝트 개요', type: 'text', rows: 5, group: 'detail', validation: rule => rule.required().max(800) }),
    defineField({
      name: 'cardImage', title: '목록 대표 이미지', type: 'image', options: { hotspot: true }, group: 'listing',
      fields: [defineField({ name: 'alt', title: '이미지 설명', type: 'string', validation: rule => rule.required().max(160) })],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'heroImage', title: '상세 상단 이미지', type: 'image', options: { hotspot: true }, group: 'detail',
      fields: [defineField({ name: 'alt', title: '이미지 설명', type: 'string', validation: rule => rule.required().max(160) })],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'heroPosition', title: '상단 이미지 초점', type: 'string', group: 'detail', initialValue: 'center',
      options: { list: [{ title: '가운데', value: 'center' }, { title: '위쪽', value: 'top' }, { title: '아래쪽', value: 'bottom' }, { title: '왼쪽', value: 'left center' }, { title: '오른쪽', value: 'right center' }] },
    }),
    defineField({ name: 'sections', title: '상세 설명 섹션', type: 'array', of: [defineArrayMember({ type: 'projectSection' })], group: 'detail' }),
    defineField({ name: 'media', title: '상세 이미지 · 위에서부터 표시', type: 'array', of: [defineArrayMember({ type: 'projectMedia' })], group: 'detail' }),
    defineField({ name: 'seoTitle', title: '검색 결과 제목', type: 'string', group: 'search', description: '비워 두면 프로젝트명이 사용됩니다.', validation: rule => rule.max(70) }),
    defineField({ name: 'seoDescription', title: '검색 결과 설명', type: 'text', rows: 3, group: 'search', description: '검색 결과와 공유 미리보기에 쓰입니다. 120~160자 안에서 프로젝트의 특징을 설명해 주세요.', validation: rule => rule.max(200) }),
    defineField({ name: 'sortOrder', title: '목록 순서', type: 'number', group: 'listing', initialValue: 100, validation: rule => rule.required().integer().min(0) }),
    defineField({ name: 'visible', title: '사이트에 공개', type: 'boolean', group: 'listing', initialValue: true, description: '끄면 삭제하지 않고 Work 목록과 상세 페이지에서 숨깁니다.' }),
  ],
  preview: { select: { title: 'title', subtitle: 'client', media: 'cardImage' } },
});

export const schemaTypes = [projectSection, projectMedia, project];
