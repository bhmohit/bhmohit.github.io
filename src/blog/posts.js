// Central place to add/edit blog posts.
// Shape:
// {
//   slug: 'kebab-case-unique',
//   title: 'Post Title',
//   date: 'MMM DD, YYYY',
//   tags: ['tag1','tag2'],
//   summary: 'One-liner summary',
//   cover?: '/path/or/url',
//   links?: [{ label: 'GitHub', href: 'https://...' }],
//   content: Array<string | { type: 'p'|'h3'|'ul'|'img'|'a'|'code',
//                             text?: string,
//                             items?: string[],
//                             src?: string, alt?: string,
//                             href?: string }>
// }

const posts = [
  {
    slug: 'not-much-here',
    title: 'A corner for my thoughts (about philosophy, tech, and food)',
    date: 'Sep 10, 2025',
    tags: ['blog'],
    summary: 'I plan to share what I find important/cool/fascinating',
    links: [{ label: 'Source', href: 'https://github.com/bhmohit/bhmohit.github.io' }],
    content: [
      { type: 'p', text: 'As a quarterly goal, I wanted to share my thoughts to the world (or the 2 people who read this).' },      
      { type: 'p', text: 'This is mostly stuff that interests me.' },      
    ],
  }
];



export default posts;
