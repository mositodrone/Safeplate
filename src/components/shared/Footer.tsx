import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-pink-200 text-neutral-900">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div className="space-y-4">
            <p className="max-w-sm text-sm">
              Join our newsletter to stay up to date on the latest news and
              updates.
            </p>

            <div className="flex w-full max-w-sm overflow-hidden rounded-full bg-white">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-sm outline-none"
              />
              <button className="bg-slate-900 px-5 py-2 text-sm font-medium text-white">
                Subscribe
              </button>
            </div>

            <p className="text-xs text-neutral-700">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from us.
            </p>

            {/* Socials */}
            <div className="flex gap-3 pt-2">
              <SocialIcon icon={<Facebook size={16} />} />
              <SocialIcon icon={<Instagram size={16} />} />
              <SocialIcon icon={<Linkedin size={16} />} />
              <SocialIcon icon={<Youtube size={16} />} />
            </div>
          </div>

          {/* Sitemap */}
          <FooterColumn
            title="Sitemap"
            links={["About Us", "Space design", "Customer Stories", "FAQ"]}
          />

          {/* Partners */}
          <FooterColumn
            title="Partners"
            links={["Architects", "Co-Working", "Real Estate"]}
          />

          {/* Services */}
          <FooterColumn
            title="Services"
            links={[
              "Furniture as Service",
              "Second-Hand Marketplace",
              "Enky Invest",
            ]}
          />
        </div>

        {/* Bottom branding */}
        <div className="mt-20 flex items-center justify-center">
          <span className="text-[8rem] font-extrabold tracking-tight text-orange-500/90">
            SAFEPLATE
          </span>
          <span className="ml-1 self-start text-xl font-semibold">®</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Helpers ---------- */

function FooterColumn({ title, links }) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm text-neutral-800">
        {links.map((link) => (
          <li key={link} className="cursor-pointer hover:underline">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <button className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 text-neutral-800 hover:bg-neutral-900 hover:text-white transition">
      {icon}
    </button>
  );
}
