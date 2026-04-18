export type WhyStrengthIcon = "shield" | "rupee" | "globe" | "headset";

/** Icons for `/foren-trip` “What we arrange” cards (maps to FaCar / FaUsers / FaGlobeAsia). */
export type ForenArrangeIcon = "car" | "users" | "globe";

export type SiteContent = {
  navbar_brand?: string;
  hero_cards?: {
    at_a_glance_title?: string;
    /** Three lines under “At a glance” (location / service / hours). */
    at_a_glance_lines?: string[];
    contact_card_title?: string;
    how_we_work_title?: string;
    how_we_work_intro?: string;
    pillars?: { title: string; body: string }[];
  };
  fleet_section?: {
    heading?: string;
    lead?: string;
  };
  hotel_section?: {
    heading?: string;
    subtitle?: string;
    show_photos?: string;
    hide_photos?: string;
  };
  why_choose?: {
    heading?: string;
    lead?: string;
    strengths_title?: string;
    strengths?: { title: string; body: string; icon?: WhyStrengthIcon }[];
    snapshot_title?: string;
    snapshot?: { label: string; value: string }[];
    checklist_title?: string;
    checklist?: string[];
  };
  footer?: {
    kicker?: string;
    body?: string;
  };
  /** `/foren-trip` page — tour packages (domestic + international). */
  foren_trip?: {
    header_kicker?: string;
    header_title?: string;
    header_lead?: string;
    arrange_heading?: string;
    arrange_cards?: { title: string; body: string; icon?: ForenArrangeIcon }[];
    domestic_heading?: string;
    domestic_places?: string[];
    international_heading?: string;
    international_places?: string[];
  };
};

export type FleetConfig = {
  /** Display order on the homepage; cars not listed are hidden from the grid. */
  folders?: string[];
};

export type Company = {
  company_name: string;
  hero?: {
    kicker?: string;
    headline?: string;
    lead?: string;
    description?: string;
    primary_cta?: { label?: string; href?: string };
    secondary_cta?: { label?: string; href?: string };
    logo_src?: string;
    logo_alt?: string;
    card_note?: string;
  };
  location: string;
  service_area: string;
  contact: {
    phone: string;
    whatsapp: string;
    phone_alt?: string;
    whatsapp_alt?: string;
    email: string;
  };
  social_media?: {
    instagram?: string;
  };
  site?: SiteContent;
  fleet?: FleetConfig;
};

export type HotelEntry = { name: string; image: string };

export type HotelsFile = { hotels: HotelEntry[] };
