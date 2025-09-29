import React, { useEffect, useMemo, useRef, useState } from 'react'

const BANNER = [
  "___  ___        _      _  _",
  "|  \\/  |       | |    (_)| |",
  "| .  . |  ___  | |__   _ | |",
  "| |\\/| | / _ \\ | '_ \\ | || __|",
  "| |  | || (_) || | | || || |",
  "\\_|  |_/ \\___/ |_| |_| |_| \\__|",
];

const HELPS = [
  "about    <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;learn more about me</span>",
  "projects <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;check them out on <a href='https://www.github.com/bhmohit' target='_blank'>github</a></span>",
  "dark     <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;change to dark mode</span>",
  "light    <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;change to light mode</span>",
  "[color]  <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enter any color name(words, hex, or rgb) to change the text color</span>",
];

const PROJECTS = [
  "<a href='https://nbaviz.bhmohit.dev/' target='_blank'>NBAViz</a>                      <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An app which showcases NBA player stats and predictions using graphical visuals.</span>",
  "<a href='https://devpost.com/software/gropay' target='_blank'>GroPay</a>                      <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A solution for users to effectively liquidate crypto for Interac e-transfers</span>",
  "<a href='https://github.com/bhmohit/SecureVault' target='_blank'>Password Manager</a>     <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A password manager using Java with a UI and a SQL database to store and retrieve information.</span>",
  "<a href='https://github.com/bhmohit/brick-breaker' target='_blank'>Brick Breaker</a>          <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A brick breaker game using Processing, Java and OOP Concepts</span>",
  "<a href='https://github.com/bhmohit/bhmohit.github.io' target='_blank'>this</a>               <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;What you are currently looking at</span>",
];

function nl2br(txt) {
  return txt.replace(/\n/g, "");
}

export default function App() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [caretLeftPx, setCaretLeftPx] = useState(0);
  const rootRef = useRef(null);
  const writerRef = useRef(null);
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
    const fg = isDark ? "#39ff14" : "#252525";
    const bg = isDark ? "#252525" : "#D8D8D8";
    const all = document.getElementsByTagName("*");
    for (const el of all) {
      if (el.className === "cursor") break;
      el.style.color = fg;
      el.style.backgroundColor = bg;
    }
  }, [isDark]);

  useEffect(() => {
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
    setLines(prev => [...prev, { id: nextId(), text, html, className }]);
  }

  function printPrompt(cmd) {
    print(`guest@mohit.dev:~$ ${cmd}`);
  }

  function insertHtml(htmlStr) {
    print(htmlStr, { html: true, className: "resultText" });
    window.scrollTo(0, document.body.offsetHeight);
  }

  function addLine(text, time) {
    const withNbsp = (() => {
      let t = "";
      for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) === " " && text.charAt(i + 1) === " ") {
          t += "&nbsp;&nbsp;";
          i++;
        } else {
          t += text.charAt(i);
        }
      }
      return t;
    })();

    setTimeout(() => {
      print(withNbsp, { html: true, className: "xx" });
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
    switch (cmd) {
      case "about": {
        const txt = "👋 Hi, my name is Mohit\r\n🏫 I’m a sophomore at UBC\r\n👀 I’m interested in Web Development & Data Science\r\n🌱 I’m currently learning Three.js which utilizes the WebGL framework for 3-D web rendering\r\n💞️ I’m looking to collaborate on anything that needs me :)";
        insertHtml(`<span class="resultText" style="white-space:pre">${txt}</span>`);
        break;
      }
      case "projects": {
        PROJECTS.forEach((item) => insertHtml(`<span class="resultText">${item}</span>`));
        break;
      }
      case "help": {
        HELPS.forEach((item) => insertHtml(`<span class="resultText">${item}</span>`));
        break;
      }
      case "banner": {
        printBanner(0, 80);
        break;
      }
      case "light": {
        if (isDark) setIsDark(false);
        else insertHtml(`<span class="resultText">You are already in light mode!</span>`);
        break;
      }
      case "dark": {
        if (!isDark) setIsDark(true);
        else insertHtml(`<span class="resultText">You are already in dark mode!</span>`);
        break;
      }
      case "clear": {
        setLines([]);
        setInput("");
        setIsDark(true);
        setTimeout(async () => {
          await printBanner(0);
          setTimeout(() => handleCommand("help"), 710);
        }, 0);
        break;
      }
      default: {
        const color = cmd.replace(/\s+/g, "");
        try { document.body.style.color = color; } catch {}
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

  useEffect(() => {
    window.scrollTo(0, document.body.offsetHeight);
  }, [lines]);

  useEffect(() => {
    const min = -Math.max(0, (input.length - 1) * 10);
    setCaretLeftPx((v) => Math.max(min, Math.min(0, v)));
  }, [input.length]);

  const caretLeft = useMemo(() => `${caretLeftPx}px`, [caretLeftPx]);

  return (
    <div ref={rootRef} className="body">
      <div className="text">
        <div>
          {lines.map((l) => (
            <p
              key={l.id}
              className={l.className || (l.html ? "resultText" : undefined)}
              dangerouslySetInnerHTML={l.html ? { __html: l.text } : undefined}
            >
              {!l.html ? l.text : null}
            </p>
          ))}
        </div>
      </div>

      <div id="terminal" onClick={() => { if (hiddenInputRef.current) hiddenInputRef.current.focus(); }}>
        <textarea
          id="setter"
          value={input}
          onChange={(e) => setInput(nl2br(e.target.value))}
          onKeyDown={onKeyDown}
          autoFocus
          ref={hiddenInputRef}
          style={{ left: "-1000px", position: "absolute" }}
        />
        <div id="getter">
          <span
            id="writer"
            ref={writerRef}
            dangerouslySetInnerHTML={{ __html: input }}
          />
          <b className="cursor" id="cursor" style={{ left: caretLeft }}></b>
        </div>
      </div>
    </div>
  );
}
