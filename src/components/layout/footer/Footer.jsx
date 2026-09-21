import { FaPhone } from "react-icons/fa";
import BrandColumn from "./BrandColumn";
import FooterColumn from "./FooterColumn";
import FooterMeta from "./FooterMeta";

export default function Footer() { return <footer className="site-footer"><BrandColumn /><FooterColumn title="Hospitality Hours"><p>Tuesday - Sunday: 11:30 AM - 11:00 PM</p><p>Monday: Reserved for Private Banquets</p><strong>Jebena Buna & Fresh Roasting All Evening</strong></FooterColumn><FooterColumn title="Dietary Traditions"><p>Vegan Fasting (Beyaynetu / Tsom)</p><p>Traditional Prime Meat Feasts</p><p>House Tej (Pure Honey Wine)</p></FooterColumn><FooterColumn title="Addis Location"><p>Bole Medhanialem, Addis Ababa & express delivery across town.</p><a className="phone" href="tel:+251911234567"><FaPhone /> +251 911 234 567</a></FooterColumn><FooterMeta /></footer>; }
