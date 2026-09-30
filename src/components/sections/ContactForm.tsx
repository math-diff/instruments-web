import { SITE_URL } from "@/lib/site-config";

const ENDPOINT = "https://api" + ".web3forms.com/submit";
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "YOUR_ACCESS_KEY";

export function ContactForm({
  labels,
  productOptions,
  redirectPath,
  selectedProduct,
}: {
  labels: {
    name: string;
    company: string;
    email: string;
    phone: string;
    product: string;
    message: string;
    submit: string;
  };
  productOptions: string[];
  redirectPath: string;
  selectedProduct?: { slug: string; model: string; name: string; category: string; sourcePage: string };
}) {
  const redirect = `${SITE_URL}${redirectPath}?submitted=1`;

  return (
    <form action={ENDPOINT} method="POST" data-inquiry-form data-product={selectedProduct?.slug} className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="New inquiry — Jingfeng Instruments" />
      <input type="hidden" name="from_name" value="Jingfeng Instruments Website" />
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      {selectedProduct && <>
        <input type="hidden" name="product_slug" value={selectedProduct.slug} />
        <input type="hidden" name="product_model" value={selectedProduct.model} />
        <input type="hidden" name="product_name" value={selectedProduct.name} />
        <input type="hidden" name="source_page" value={selectedProduct.sourcePage} />
        <p className="rounded-lg border border-line bg-surface-muted p-4 font-medium text-brand sm:col-span-2">{selectedProduct.model} — {selectedProduct.name}</p>
      </>}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <Field label={labels.name} name="name" required />
      <Field label={labels.company} name="company" />
      <Field label={labels.email} name="email" type="email" required />
      <Field label={labels.phone} name="phone" type="tel" />
      <div className="sm:col-span-2">
        <label htmlFor="inquiry-product" className="mb-1.5 block text-sm font-medium text-ink">
          {labels.product}
        </label>
        <select
          id="inquiry-product"
          name="product"
          defaultValue={selectedProduct?.category ?? "—"}
          className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        >
          {productOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="inquiry-message" className="mb-1.5 block text-sm font-medium text-ink">
          {labels.message}
        </label>
        <textarea
          id="inquiry-message"
          name="message"
          rows={4}
          required
          className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-brand px-6 text-base font-medium text-white transition-colors hover:bg-brand-strong"
        >
          {labels.submit}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={`inquiry-${name}`} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-accent-red"> *</span>}
      </label>
      <input
        id={`inquiry-${name}`}
        type={type}
        name={name}
        required={required}
        className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
    </div>
  );
}
