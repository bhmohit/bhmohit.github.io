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
//   content: Array<string | { type: 'p'|'h3'|'ul'|'img'|'a'|'code'|'video',
//                             text?: string,
//                             items?: string[],
//                             src?: string, alt?: string,
//                             href?: string,
//                             poster?: string, caption?: string,
//                             embed?: boolean }>
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
      { type: 'p', text: 'Expect a mix of systems nerdery, scattered philosophy, and what I am cooking. Some of these will be raw notes, others will be polished, but all of them are mine.' },
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
  },
  {
    slug: 'faas',
    title: 'FaaS (Food as a Service)',
    date: 'Dec 11, 2025',
    tags: ['thoughts for food (yes, in that order)'],
    summary: 'Why does dinner feel like a subscription tier instead of a meal',
    links: [],
    content: [
      { type: 'p', text: 'What do I know about food? I do not have a culinary degree and I have never worked a line, but I am passionate enough to tell handmade pasta from the boxed factory stuff in one bite.' },
      { type: 'p', text: 'What drives me nuts is how many restaurants sell $1000 "experiences" with smoke machines and DJ sets but forget to salt the water or taste the sauce.' },
      { type: 'p', text: 'Now, how can I write this post without mentioning this guy, the one who started it all:' },
      { type: 'img', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4cDeRWe-1xyv2sud3UwGzroX03sXEReZuMPMDGXKheAtTQooGI_ZtcJsAhCxfmWnNfgz6U2GthJ1DVMXTHYJATpkV_mHvS5akrzzfML4&s=10', caption: 'The guy who started it all (imo)', alt: 'Illustrated bowl of fresh pasta' },
      { type: 'p', text: 'I dont care what people do with their money. I care that craft is being replaced by theatrics. A plate of cacio e pepe does not need a slab of marble to impress.' },
      { type: 'p', text: 'Food is supposed to taste like something, not perform like a startups elevator pitch. The best meals I have had were in rooms that smelled like garlic and butter.' },
      { type: 'video', src: 'https://www.youtube.com/embed/n6DLqK6v364', title: 'How to finish pasta like you mean it', caption: 'Watch how the sauce comes together with pasta water and cheese instead of cream from a carton.', embed: true },
      { type: 'p', text: 'The technique is what matters: starch, fat, spices, flavours and heat working together. It is the difference between noodles wearing sauce and noodles swimming in soup.' },
      { type: 'p', text: 'I want to pay for craft and story, not for a subscription tier that unlocks a chair. But what do I know? If you have a small spot doing honest cooking, please tell me (extra brownie points if theres a old grandma behind the counter).' },
    ]
  },
];
export default posts;
