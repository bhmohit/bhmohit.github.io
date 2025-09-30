import { useEffect, useMemo, useRef, useState } from 'react'
import SnakeGame from './components/SnakeGame.jsx'
import TerminalOutput from './components/TerminalOutput.jsx'
import TerminalInput from './components/TerminalInput.jsx'
import MacHeader from './components/MacHeader.jsx'
import BlogWindow from './components/BlogWindow.jsx'
import posts from './blog/posts.js'
import { BANNER, HELPS, PROJECTS } from './data/constants.jsx'
import useAutoScroll from './hooks/useAutoScroll.jsx'

const stripNewlines = (txt) => txt.replace(/\n/g, "");

export default function App() {
  const MAX_LINES = 300;
  const trimLines = (arr) => (arr.length > MAX_LINES ? arr.slice(arr.length - MAX_LINES) : arr);
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [caretLeftPx, setCaretLeftPx] = useState(0);
  const [showSnake, setShowSnake] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [userHost, setUserHost] = useState(() => {
    try {
      const cached = localStorage.getItem('userHost');
      return cached || 'guest';
    } catch {
      return 'guest';
    }
  });
  const [wallpaper, setWallpaper] = useState('default'); // 'default' | 'vibrant'
  const rootRef = useRef(null);
  const hiddenInputRef = useRef(null);

  useEffect(() => {
    function handleBodyClick(e) {
      if (rootRef.current && rootRef.current.contains(e.target)) {
        hiddenInputRef.current && hiddenInputRef.current.focus();
      }
    }
    document.addEventListener("click", handleBodyClick);
    return () => document.removeEventListener("click", handleBodyClick);
  }, []);

  useEffect(() => {
    const fg = isDark ? "#ffffff" : "#252525";
    const bg = isDark ? "#252525" : "#D8D8D8";
    const root = document.documentElement;
    root.style.setProperty('--fg', fg);
    root.style.setProperty('--bg', bg);
  }, [isDark]);

  // Reflect userHost in CSS so the initial prompt pseudo-element uses it
  useEffect(() => {
    try {
      document.documentElement.style.setProperty('--prompt', `"${userHost}@bhmohit.dev ~ %"`);
      localStorage.setItem('userHost', userHost);
    } catch {}
  }, [userHost]);

  // Fetch public IP for prompt label; timeout-friendly fallback to 'guest'
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 1500);
        const res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
        clearTimeout(tid);
  if (!res.ok) return;
        const data = await res.json();
        const ip = String(data?.ip || '').trim();
        if (!cancelled && ip) setUserHost(ip);
      } catch (_) {
        // ignore; keep 'guest'
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Apply wallpaper and overlay based on state
  useEffect(() => {
    const root = document.body;
    const url = wallpaper === 'vibrant' ? "url('/macos-wallpaper-vibrant.svg')" : "url('/macos-wallpaper.svg')";
    root.style.setProperty('--wallpaper-url', url);
  }, [wallpaper]);

  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    (async () => {
      await printBanner(0);
      setTimeout(() => handleCommand("help"), 710);
      hiddenInputRef.current && hiddenInputRef.current.focus();
    })();
  }, []);

  const idRef = useRef(0);
  function nextId() {
    idRef.current += 1;
    return idRef.current;
  }

  function print(text, { html = false, className } = {}) {
    setLines(prev => trimLines([...prev, { id: nextId(), text, html, className }]));
  }

  function printPrompt(cmd) {
    print(`${userHost}@bhmohit.dev ~ % ${cmd}`);
  }

  function printJSX(node, className = "resultText") {
    setLines(prev => trimLines([...prev, { id: nextId(), jsx: node, className }]));
    // Scroll the terminal text area, not the entire window
    requestAnimationFrame(() => {
      const el = document.querySelector('.text');
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  function addLine(text, time) {
    setTimeout(() => {
      print(text, { html: false, className: "xx" });
    }, time);
  }

  async function printBanner(startDelay = 0, stepMs = 100) {
    await new Promise(r => setTimeout(r, startDelay));
    BANNER.forEach((line, idx) => addLine(line, idx * stepMs));
  }

  function handleSubmit() {
    const raw = input;
    const cmd = raw.trim();
    if (cmd === "") {
      printPrompt("");
      setInput("");
      setCaretLeftPx(0);
      return;
    }

    setHistory(prev => [...prev, cmd]);
    setHistIndex(null);

    printPrompt(raw);
    runCommand(cmd.toLowerCase());
    setInput("");
    setCaretLeftPx(0);
  }

  function runCommand(cmd) {
    // Pattern commands first
    if (cmd === 'color') {
      printJSX(<span>Usage: color &lt;name|#hex|rgb(...)&gt;</span>);
      return;
    }
    if (cmd.startsWith('color ')) {
      const value = cmd.slice(6).trim();
      if (!value) {
        printJSX(<span>Usage: color &lt;name|#hex|rgb(...)&gt;</span>);
        return;
      }
      try { document.documentElement.style.setProperty('--fg', value); } catch {}
      return;
    }
    switch (cmd) {
      case "about": {
          const txt = "👋 Hi, I'm Mohit\r\n🏫 I’m a senior at UBC\r\n👀 I’m most entertained by solving problems that deal with distributed systems\r\n🌱 I’m currently learning about parallel architectures and OS development\r\n✌🏽 I’m looking to collaborate on problems regarding large-scale systems :)";
          printJSX(<span style={{ whiteSpace: 'pre' }}>{txt}</span>, 'resultText');
        break;
      }
      case "projects": {
        PROJECTS.forEach(({ label, url, desc }) => {
          printJSX(
            <span className="resultRow">
              <span className="col1">
                <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
              </span>
              <span className="col2">{desc}</span>
            </span>
          );
        });
        break;
      }
      case "help": {
        HELPS.forEach(({ cmd, desc }) => {
          printJSX(
            <span className="resultRow">
              <span className="col1">{cmd}</span>
              <span className="col2">{desc}</span>
            </span>
          );
        });
        break;
      }
      case "banner": {
        printBanner(0, 80);
        break;
      }
      case "snake": {
        setShowSnake(true);
        break;
      }
      case "thoughts": {
        setShowBlog(true);
        setActivePost(null);
        break;
      }
      case "light": {
        if (isDark) setIsDark(false);
        else printJSX(<span>You are already in light mode!</span>);
        break;
      }
      case "dark": {
        if (!isDark) setIsDark(true);
        else printJSX(<span>You are already in dark mode!</span>);
        break;
      }
      case "wallpaper": {
        printJSX(
          <span>
            Usage: wallpaper [default|vibrant|overlay:light|overlay:med|overlay:strong]
          </span>
        );
        break;
      }
      case "wallpaper default": {
        setWallpaper('default');
        printJSX(<span>Wallpaper set to default.</span>);
        break;
      }
      case "wallpaper vibrant": {
        setWallpaper('vibrant');
        printJSX(<span>Wallpaper set to vibrant.</span>);
        break;
      }
      case "wallpaper overlay:light": {
        document.body.style.setProperty('--overlay-inner', '0.08');
        document.body.style.setProperty('--overlay-outer', '0.28');
        printJSX(<span>Overlay set to light.</span>);
        break;
      }
      case "wallpaper overlay:med": {
        document.body.style.setProperty('--overlay-inner', '0.15');
        document.body.style.setProperty('--overlay-outer', '0.45');
        printJSX(<span>Overlay set to medium.</span>);
        break;
      }
      case "wallpaper overlay:strong": {
        document.body.style.setProperty('--overlay-inner', '0.22');
        document.body.style.setProperty('--overlay-outer', '0.6');
        printJSX(<span>Overlay set to strong.</span>);
        break;
      }
      case "clear": {
        setLines([]);
        setInput("");
        setIsDark(true);
        // Reprint banner+help once after clearing
        setTimeout(async () => {
          await printBanner(0);
          setTimeout(() => handleCommand("help"), 710);
        }, 0);
        break;
      }
      default: {
        // blog <slug>: open a specific post
        if (cmd.startsWith('thoughts ')) {
          const slug = cmd.slice(9).trim();
          if (slug) {
            setShowBlog(true);
            setActivePost(slug);
            break;
          }
        }
        printJSX(<span>idk what that means</span>);
        break;
      }
    }
  }

  function handleCommand(cmd) {
    printPrompt(cmd);
    runCommand(cmd);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
      return;
    }
    if (e.key === "ArrowLeft") {
      const min = -Math.max(0, (input.length - 1) * 10);
      setCaretLeftPx((v) => Math.max(min, v - 10));
      return;
    }
    if (e.key === "ArrowRight") {
      setCaretLeftPx((v) => Math.min(0, v + 10));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      setHistIndex((idx) => {
        const next = idx === null ? history.length - 1 : Math.max(0, idx - 1);
        setInput(history[next] ?? "");
        setCaretLeftPx(0);
        return next;
      });
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;
      setHistIndex((idx) => {
        if (idx === null) return null;
        const next = Math.min(history.length - 1, idx + 1);
        setInput(history[next] ?? "");
        setCaretLeftPx(0);
        return next;
      });
      return;
    }
  }

  useAutoScroll('.text', [lines]);

  useEffect(() => {
    const min = -Math.max(0, (input.length - 1) * 10);
    setCaretLeftPx((v) => Math.max(min, Math.min(0, v)));
  }, [input.length]);

  const caretLeft = useMemo(() => `${caretLeftPx}px`, [caretLeftPx]);

  return (
    <div ref={rootRef} className="body" style={{ '--prompt': `"${userHost}@bhmohit.dev ~ %"` }}>
  <MacHeader leftLabel={`You: ${userHost}`} title="Me: bhmohit.dev" />
      <div className="window">
        <div className="window-header">
          <div className="window-controls" aria-hidden>
            <span className="control close" />
            <span className="control minimize" />
            <span className="control maximize" />
          </div>
          <div className="window-title">terminal</div>
        </div>
        <div className="window-body">
          <div className="text">
            <TerminalOutput lines={lines} />
          </div>

          <TerminalInput
            ref={hiddenInputRef}
            input={input}
            setInput={setInput}
            nl2br={stripNewlines}
            onKeyDown={onKeyDown}
            caretLeft={caretLeft}
            showSnake={showSnake || showBlog}
          />

          {showSnake && (
            <SnakeGame onExit={() => setShowSnake(false)} />
          )}
          {showBlog && (
            <BlogWindow
              posts={posts}
              activeSlug={activePost}
              onOpenPost={setActivePost}
              onClose={() => { setShowBlog(false); setActivePost(null); }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
