export function SpecTable({ rows }: { rows: [string, string][] }) {
  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        {rows.map(([label, value], i) => (
          <tr
            key={label}
            className={i % 2 === 0 ? "bg-surface-muted" : "bg-white"}
          >
            <td className="w-1/2 border border-line px-4 py-3 font-medium text-ink">
              {label}
            </td>
            <td className="w-1/2 border border-line px-4 py-3 text-ink-soft">
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
