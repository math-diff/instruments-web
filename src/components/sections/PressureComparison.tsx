import Link from "next/link";
import { products } from "@/lib/products";

export function PressureComparison() {
  return (
    <div className="mt-6 max-w-full overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
        <caption className="border-b border-line bg-surface-muted px-5 py-4 text-start leading-6 text-ink-soft">Photographed catalogue samples. Ranges and accuracy markings are sample observations; confirm the specification and applicable accuracy standard for your order.</caption>
        <thead className="bg-brand text-white"><tr>{["Model / instrument", "Photo range", "Accuracy class", "Visible detail"].map((label) => <th key={label} scope="col" className="px-5 py-4 font-semibold">{label}</th>)}</tr></thead>
        <tbody>
          {products.filter((product) => product.category === "pressure").map((product) => (
            <tr key={product.slug} className="border-t border-line align-top odd:bg-white even:bg-surface-muted">
              <th scope="row" className="px-5 py-4"><Link href={`/en/products/${product.slug}`} className="font-bold text-link underline underline-offset-4">{product.model}</Link><span className="mt-1 block font-normal text-ink">{product.name.en}</span></th>
              <td className="px-5 py-4 text-ink">{product.specs.en[0][1]}</td>
              <td className="px-5 py-4 text-ink">{product.specs.en[1][1]}</td>
              <td className="max-w-60 px-5 py-4 text-ink-soft">{product.specs.en[3][0]}: {product.specs.en[3][1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
