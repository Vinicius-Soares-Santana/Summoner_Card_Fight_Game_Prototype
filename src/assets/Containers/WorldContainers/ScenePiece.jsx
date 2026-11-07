export default function ScenePiece({ at, cols = 1, rows = 1, children }) {
    const col = at[0];
    const row = at.slice(1);
  
    return (
      <div
        className="scene-piece"
        style={{
          gridColumn: `${col} / span ${cols}`,
          gridRow: `${row} / span ${rows}`,
        }}
      >
        {children}
      </div>
    );
  }