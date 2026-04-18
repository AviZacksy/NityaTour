import { promises as fs } from "fs";
import path from "path";
import type {
  Company,
  FleetConfig,
  ForenArrangeIcon,
  SiteContent,
  WhyStrengthIcon,
} from "@/lib/companyTypes";

const COMPANY_FILE = path.join(process.cwd(), "public", "data", "data.json");

const WHY_ICONS: WhyStrengthIcon[] = ["shield", "rupee", "globe", "headset"];
const FOREN_ARRANGE_ICONS: ForenArrangeIcon[] = ["car", "users", "globe"];

export async function readCompany(): Promise<Company> {
  const raw = await fs.readFile(COMPANY_FILE, "utf8");
  return JSON.parse(raw) as Company;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function sanitizeSite(input: unknown): SiteContent | undefined {
  if (input === undefined || input === null) return undefined;
  if (!isRecord(input)) throw new Error("site must be an object");

  const s = input as Record<string, unknown>;
  const out: SiteContent = {};

  if (typeof s.navbar_brand === "string") out.navbar_brand = s.navbar_brand;

  if (s.hero_cards !== undefined) {
    if (!isRecord(s.hero_cards)) throw new Error("site.hero_cards invalid");
    const h = s.hero_cards as Record<string, unknown>;
    const hc: NonNullable<SiteContent["hero_cards"]> = {};
    if (typeof h.at_a_glance_title === "string") hc.at_a_glance_title = h.at_a_glance_title;
    if (typeof h.contact_card_title === "string") hc.contact_card_title = h.contact_card_title;
    if (typeof h.how_we_work_title === "string") hc.how_we_work_title = h.how_we_work_title;
    if (typeof h.how_we_work_intro === "string") hc.how_we_work_intro = h.how_we_work_intro;
    if (Array.isArray(h.at_a_glance_lines)) {
      hc.at_a_glance_lines = h.at_a_glance_lines
        .filter((x) => typeof x === "string")
        .slice(0, 8) as string[];
    }
    if (Array.isArray(h.pillars)) {
      hc.pillars = h.pillars
        .filter(isRecord)
        .map((p) => ({
          title: typeof p.title === "string" ? p.title : "",
          body: typeof p.body === "string" ? p.body : "",
        }))
        .filter((p) => p.title.length > 0)
        .slice(0, 12);
    }
    if (Object.keys(hc).length > 0) out.hero_cards = hc;
  }

  if (s.fleet_section !== undefined) {
    if (!isRecord(s.fleet_section)) throw new Error("site.fleet_section invalid");
    const f = s.fleet_section as Record<string, unknown>;
    const fs_: NonNullable<SiteContent["fleet_section"]> = {};
    if (typeof f.heading === "string") fs_.heading = f.heading;
    if (typeof f.lead === "string") fs_.lead = f.lead;
    if (Object.keys(fs_).length > 0) out.fleet_section = fs_;
  }

  if (s.hotel_section !== undefined) {
    if (!isRecord(s.hotel_section)) throw new Error("site.hotel_section invalid");
    const h = s.hotel_section as Record<string, unknown>;
    const hs: NonNullable<SiteContent["hotel_section"]> = {};
    if (typeof h.heading === "string") hs.heading = h.heading;
    if (typeof h.subtitle === "string") hs.subtitle = h.subtitle;
    if (typeof h.show_photos === "string") hs.show_photos = h.show_photos;
    if (typeof h.hide_photos === "string") hs.hide_photos = h.hide_photos;
    if (Object.keys(hs).length > 0) out.hotel_section = hs;
  }

  if (s.why_choose !== undefined) {
    if (!isRecord(s.why_choose)) throw new Error("site.why_choose invalid");
    const w = s.why_choose as Record<string, unknown>;
    const wc: NonNullable<SiteContent["why_choose"]> = {};
    if (typeof w.heading === "string") wc.heading = w.heading;
    if (typeof w.lead === "string") wc.lead = w.lead;
    if (typeof w.strengths_title === "string") wc.strengths_title = w.strengths_title;
    if (typeof w.snapshot_title === "string") wc.snapshot_title = w.snapshot_title;
    if (typeof w.checklist_title === "string") wc.checklist_title = w.checklist_title;
    if (Array.isArray(w.strengths)) {
      wc.strengths = w.strengths
        .filter(isRecord)
        .map((st) => {
          const iconRaw = st.icon;
          const icon =
            typeof iconRaw === "string" && (WHY_ICONS as string[]).includes(iconRaw)
              ? (iconRaw as WhyStrengthIcon)
              : undefined;
          return {
            title: typeof st.title === "string" ? st.title : "",
            body: typeof st.body === "string" ? st.body : "",
            icon,
          };
        })
        .filter((st) => st.title.length > 0)
        .slice(0, 12);
    }
    if (Array.isArray(w.snapshot)) {
      wc.snapshot = w.snapshot
        .filter(isRecord)
        .map((sn) => ({
          label: typeof sn.label === "string" ? sn.label : "",
          value: typeof sn.value === "string" ? sn.value : "",
        }))
        .filter((sn) => sn.label.length > 0)
        .slice(0, 8);
    }
    if (Array.isArray(w.checklist)) {
      wc.checklist = w.checklist.filter((x) => typeof x === "string").slice(0, 20) as string[];
    }
    if (Object.keys(wc).length > 0) out.why_choose = wc;
  }

  if (s.footer !== undefined) {
    if (!isRecord(s.footer)) throw new Error("site.footer invalid");
    const f = s.footer as Record<string, unknown>;
    const ft: NonNullable<SiteContent["footer"]> = {};
    if (typeof f.kicker === "string") ft.kicker = f.kicker;
    if (typeof f.body === "string") ft.body = f.body;
    if (Object.keys(ft).length > 0) out.footer = ft;
  }

  if (s.foren_trip !== undefined) {
    if (!isRecord(s.foren_trip)) throw new Error("site.foren_trip invalid");
    const ft = s.foren_trip as Record<string, unknown>;
    const fr: NonNullable<SiteContent["foren_trip"]> = {};
    if (typeof ft.header_kicker === "string") fr.header_kicker = ft.header_kicker;
    if (typeof ft.header_title === "string") fr.header_title = ft.header_title;
    if (typeof ft.header_lead === "string") fr.header_lead = ft.header_lead;
    if (typeof ft.arrange_heading === "string") fr.arrange_heading = ft.arrange_heading;
    if (typeof ft.domestic_heading === "string") fr.domestic_heading = ft.domestic_heading;
    if (typeof ft.international_heading === "string") fr.international_heading = ft.international_heading;
    if (Array.isArray(ft.domestic_places)) {
      fr.domestic_places = ft.domestic_places
        .filter((x) => typeof x === "string")
        .map((x) => x.trim())
        .filter(Boolean)
        .slice(0, 40) as string[];
    }
    if (Array.isArray(ft.international_places)) {
      fr.international_places = ft.international_places
        .filter((x) => typeof x === "string")
        .map((x) => x.trim())
        .filter(Boolean)
        .slice(0, 40) as string[];
    }
    if (Array.isArray(ft.arrange_cards)) {
      fr.arrange_cards = ft.arrange_cards
        .filter(isRecord)
        .map((row) => {
          const iconRaw = row.icon;
          const icon =
            typeof iconRaw === "string" && (FOREN_ARRANGE_ICONS as string[]).includes(iconRaw)
              ? (iconRaw as ForenArrangeIcon)
              : undefined;
          return {
            title: typeof row.title === "string" ? row.title : "",
            body: typeof row.body === "string" ? row.body : "",
            icon,
          };
        })
        .filter((row) => row.title.length > 0)
        .slice(0, 6);
    }
    if (Object.keys(fr).length > 0) out.foren_trip = fr;
  }

  return Object.keys(out).length > 0 ? out : undefined;
}

function sanitizeFleet(input: unknown): FleetConfig | undefined {
  if (input === undefined || input === null) return undefined;
  if (!isRecord(input)) throw new Error("fleet must be an object");
  const f = input as Record<string, unknown>;
  const out: FleetConfig = {};
  if (Array.isArray(f.folders)) {
    out.folders = f.folders
      .filter((x) => typeof x === "string" && x.trim().length > 0 && !x.includes(".."))
      .slice(0, 40);
  }
  return out.folders && out.folders.length > 0 ? out : undefined;
}

function sanitizeCompany(input: unknown): Company {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid payload");
  }

  const c = input as Partial<Company>;
  if (!c.company_name || typeof c.company_name !== "string") throw new Error("company_name required");
  if (!c.location || typeof c.location !== "string") throw new Error("location required");
  if (!c.service_area || typeof c.service_area !== "string") throw new Error("service_area required");

  if (!c.contact || typeof c.contact !== "object") throw new Error("contact required");
  const contact = c.contact as Company["contact"];
  if (!contact.phone || typeof contact.phone !== "string") throw new Error("contact.phone required");
  if (!contact.whatsapp || typeof contact.whatsapp !== "string") throw new Error("contact.whatsapp required");
  if (!contact.email || typeof contact.email !== "string") throw new Error("contact.email required");

  const site = c.site !== undefined ? sanitizeSite(c.site) : undefined;
  const fleet = c.fleet !== undefined ? sanitizeFleet(c.fleet) : undefined;

  return {
    company_name: c.company_name,
    hero: c.hero ?? undefined,
    location: c.location,
    service_area: c.service_area,
    contact: {
      phone: contact.phone,
      whatsapp: contact.whatsapp,
      email: contact.email,
      phone_alt: contact.phone_alt,
      whatsapp_alt: contact.whatsapp_alt,
    },
    social_media: c.social_media ?? undefined,
    site,
    fleet,
  };
}

export async function writeCompany(input: unknown): Promise<Company> {
  const next = sanitizeCompany(input);
  const json = JSON.stringify(next, null, 2) + "\n";
  await fs.writeFile(COMPANY_FILE, json, "utf8");
  return next;
}
