import defaultPosts from '../blog/posts.js';

export default function BlogWindow({ posts = defaultPosts, activeSlug, onClose, onOpenPost }) {
  // Sort newest first without mutating the source array.
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const post = activeSlug ? posts.find(p => p.slug === activeSlug) : null;

  return (
    <div className="blogOverlay" role="dialog" aria-modal="true">
      <div className="blogContainer">
        <div className="blogHeader">
          <div>
            {!post && <strong>my thoughts on things</strong>}
          </div>
          <div className="blogActions">
            {post ? (
              <button className="blogBtn" onClick={() => onOpenPost(null)} title="Back to posts">Back</button>
            ) : null}
            <button className="blogBtn" onClick={onClose} title="Close">Close</button>
          </div>
        </div>

        <div className="blogBody">
          {!post && (
            <div className="blogList">
              {sortedPosts.map(p => (
                <div key={p.slug} className="blogItem" onClick={() => onOpenPost(p.slug)} role="button" tabIndex={0}
                     onKeyDown={(e) => { if (e.key === 'Enter') onOpenPost(p.slug); }}>
                  <div className="blogItemTitle">{p.title}</div>
                  <div className="blogItemMeta">{p.date} • {p.tags?.join(', ')}</div>
                  <div className="blogItemSummary">{p.summary}</div>
                </div>
              ))}
            </div>
          )}

          {post && (
            <article className="blogPost">
              {post.cover ? (
                <img className="blogCover" src={post.cover} alt={post.title} />
              ) : null}
              <h2>{post.title}</h2>
              <div className="blogItemMeta">{post.date} • {post.tags?.join(', ')}</div>
              {post.links?.length ? (
                <div className="blogLinks">
                  {post.links.map((l, i) => (
                    <a key={i} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                  ))}
                </div>
              ) : null}
              <div className="blogContent">
                {post.content?.map((block, idx) => {
                  if (typeof block === 'string') return <p key={idx}>{block}</p>;
                  switch (block.type) {
                    case 'p': return <p key={idx}>{block.text}</p>;
                    case 'h3': return <h3 key={idx}>{block.text}</h3>;
                    case 'ul': return (
                      <ul key={idx} className="blogListUL">
                        {(block.items||[]).map((it, j) => <li key={j}>{it}</li>)}
                      </ul>
                    );
                    case 'img': return <img key={idx} src={block.src} alt={block.alt||''} className="blogImg" />;
                    case 'a': return <p key={idx}><a href={block.href} target="_blank" rel="noopener noreferrer">{block.text||block.href}</a></p>;
                    case 'code': return <pre key={idx} className="blogCode"><code>{block.text}</code></pre>;
                    default: return <p key={idx}>{block.text||''}</p>;
                  }
                })}
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
