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
  },
  {
    slug: 'seeing',
    title: 'Seeing with my eyes closed',
    date: 'Dec 09, 2025',
    tags: ['thoughts'],
    summary: 'My journey through self-reflection and understanding the importance of it',
    links: [],
    content: [
      { type: 'p', text: 'The title of this blog was inspired by a quote by James Joyce in Ulysses: "Shut your eyes and see".' },
      { type: 'p', text: 'Though the literal meaning of the line is about Stephen closing his eyes to listen to his boots crunching on the shells and seaweed. He was trying to see the world without using his sight.' },
      { type: 'p', text: 'I thought of it as a self-reflection exercise, to close my eyes and see inside. This involved answering questions like "What is the point of life?" and "What is my objective for this world and this being?"' },
      { type: 'p', text: 'Obviously, these questions are loaded and, honestly, I do not have answers for them. Growing up I always thought about the net positive I want to make and I do not know how yet either.' },
      { type: 'p', text: 'Right now, it may seem like I have not self-reflected at all. But I have made progress on what I do not want from life. Today, I feel slightly better knowing what I do not want.' },
      { type: 'p', text: 'I started my journey of self-reflection and attempting to answer these questions earlier this year through journaling.' },
      { type: 'p', text: 'The idea and method was simple:'},
      { type: 'ul', items: [
        'Every day I write one thought that stuck with me (a feeling, a worry, a moment of joy).',
        'I ask "why?" at least three times until I uncover a reason, look for a lesson or a learning that makes me uncomfortable or proud.',
        'Once a week I re-read the entries with my eyes closed first, recall how I felt, then open them to see if the words match the feeling.',
      ]},
      { type: 'p', text: 'Closing my eyes before writing slows me down just enough to hear my own voice instead of the noise of the day.' },
      { type: 'p', text: 'At first the entries were random: deadlines, an annoying co-worker, a nice espresso shot. After a few weeks, patterns showed up. I realized I fear letting people down more than failing quietly. I also noticed I am happiest when I am cooking for friends or teaching someone something (mostly comp sci related).' },
      { type: 'p', text: 'Seeing those patterns helped me define a few boundaries. I do not want a life where my calendar decides who I am. I do not want to move so fast that I forget the feeling of a good dinner with people I care about.' },
      { type: 'p', text: 'Journaling did not hand me the answers to the big questions, but it gave me a way to approach them. The practice is the point; it keeps me honest about what I notice and what I ignore.' },
      { type: 'p', text: 'And for now, and who I am today, that is enough. I will keep closing my eyes to understand who I am and why I am.' },
    ],
  }
];
export default posts;
