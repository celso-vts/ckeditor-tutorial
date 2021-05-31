import React from "react";

export const Blocks = ({ blocks, onAdd, onRemove }) => {
  return (
    <aside className="container flex-1 prose m-4">
      <h3>Blocks</h3>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-2 w-12"
        onClick={onAdd}
      >
        +
      </button>
      {Object.keys(blocks).map((key) => (
        <section className="grid grid-cols-3 gap-4 my-2">
          <span>{key}</span>
          <span className="truncate">{blocks[key]}</span>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mx-2 w-12"
            onClick={() => onRemove(key)}
          >
            -
          </button>
        </section>
      ))}

      {/* <pre>{JSON.stringify(blocks, null, 2)}</pre>÷ */}
    </aside>
  );
};
