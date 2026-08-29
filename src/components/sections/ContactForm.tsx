const ENDPOINT = "https://api" + ".web3forms.com/submit";
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "YOUR_ACCESS_KEY";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export function ContactForm({
  labels,
  productOptions,
  redirectPath,
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
}) {
  const redirect = SITE_URL ? `${SITE_URL}${redirectPath}?success=1` : "";

  return (
    <form action={ENDPOINT} method="POST" className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="hidden" name="subject" value="New inquiry — Jingfeng Instruments" />
      <input type="hidden" name="from_name" value="Jingfeng Instruments Website" />
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
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
        <label className="mb-1.5 block text-sm font-medium text-ink">
          {labels.product}
        </label>
        <select
          name="product"
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
        <label className="mb-1.5 block text-sm font-medium text-ink">
          {labels.message}
        </label>
        <textarea
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
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-accent-red"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
    </div>
  );
}
