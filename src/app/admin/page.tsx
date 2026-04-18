import Link from "next/link";
import AdminAuthGate from "./_components/AdminAuthGate";

export default function AdminHome() {
  return (
    <AdminAuthGate>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
          Yahan se poori website control ho sakti hai: company details, hero, fleet cars, hotel gallery,
          aur baaki saare sections jo homepage par dikhte hain.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Card
            title="Company & hero"
            body="Naam, location, contact, WhatsApp, hero text, logo path, CTAs, Instagram."
            href="/admin/company"
            cta="Open"
          />
          <Card
            title="Pages & text"
            body="Fleet section heading, hotel copy, Why us, footer text, navbar brand, hero ke neeche wale cards."
            href="/admin/content"
            cta="Open"
          />
          <Card
            title="Fleet (cars)"
            body="Har gaadi ka model, rates, fuel, seats, photo filenames—order bhi change kar sakte ho."
            href="/admin/fleet"
            cta="Open"
          />
          <Card
            title="Hotels"
            body="Hotel gallery: naam aur image file add / delete / edit."
            href="/admin/hotels"
            cta="Open"
          />
          <Card
            title="Foreign trip page"
            body="/foren-trip — header, arrange cards, domestic & international lists."
            href="/admin/foren-trip"
            cta="Open"
          />
        </div>
      </div>
    </AdminAuthGate>
  );
}

function Card({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-5">
      <p className="text-base font-semibold text-stone-900">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">{body}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-teal-800 px-4 py-2 text-sm font-medium text-white hover:bg-teal-900"
      >
        {cta}
      </Link>
    </div>
  );
}
