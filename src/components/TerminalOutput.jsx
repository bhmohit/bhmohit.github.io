import TerminalLine from './TerminalLine.jsx';

export default function TerminalOutput({ lines }) {
  return (
    <div>
      {lines.map((l) => (
        <TerminalLine key={l.id} line={l} />
      ))}
    </div>
  );
}
