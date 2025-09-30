import React, { forwardRef } from 'react';

const TerminalInput = forwardRef(function TerminalInput(
  { input, setInput, nl2br, onKeyDown: handleKeyDown, caretLeft, showSnake },
  hiddenInputRef
) {
  return (
    <div id="terminal" onClick={() => { if (!showSnake && hiddenInputRef.current) hiddenInputRef.current.focus(); }}>
      <textarea
        id="setter"
        value={input}
        onChange={(e) => setInput(nl2br(e.target.value))}
        onKeyDown={(e) => { if (!showSnake) handleKeyDown(e); }}
        autoFocus
        ref={hiddenInputRef}
        style={{ left: '-1000px', position: 'absolute' }}
      />
      <div id="getter">
        <span id="writer">{input}</span>
        <b className="cursor" id="cursor" style={{ left: caretLeft }}></b>
      </div>
    </div>
  );
});

export default TerminalInput;
