import React, { useState, useEffect } from "react";
import {
  FaUtensils,
  FaCoffee,
  FaHeart,
  FaShoppingBag,
  FaStar,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaBars,
  FaTimes,
} from "react:reactIcon/fa";
import { fetchMenuData } from "../api/menu";
import { styles } from "../styles/HabeshaStyles";

export default function HabeshaRestaurant() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const loadMenu = async () => {
      setLoading(true);
      const data = await fetchMenuData();
      setMenuItems(data);
      setLoading(false);
    };

    loadMenu();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  // Safe category filtering handling backend responses
  const filteredMenu =
    activeTab === "All"
      ? menuItems
      : menuItems.filter(
          (item) =>
            (item.category || "").toLowerCase() === activeTab.toLowerCase(),
        );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.navRow}>
          <button
            style={styles.iconBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          <div style={styles.brandTitle}>
            <FaUtensils style={styles.brandIcon} />
            <span>HABESHA</span>
          </div>

          <div style={styles.cartContainer}>
            <FaShoppingBag size={20} />
            {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
          </div>
        </div>

        {isMenuOpen && (
          <nav style={styles.mobileNav}>
            <a
              href="#menu"
              style={styles.navLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </a>
            <a
              href="#about"
              style={styles.navLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Coffee Ceremony
            </a>
            <a
              href="#contact"
              style={styles.navLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Visit Us
            </a>
          </nav>
        )}
      </header>

      <main style={styles.main}>
        <section style={styles.hero}>
          <div style={styles.heroOverlay}>
            <span style={styles.heroTag}>Authentic Ethiopian Experience</span>
            <h1 style={styles.heroTitle}>Taste the Heart of Habesha Culture</h1>
            <p style={styles.heroSubtitle}>
              Traditional recipes made with authentic spices, fresh injera, and
              genuine hospitality.
            </p>
            <button
              style={styles.primaryBtn}
              onClick={() => setCartCount(cartCount + 1)}
            >
              Order Online <FaChevronRight style={{ marginLeft: 8 }} />
            </button>
          </div>
        </section>

        <section style={styles.infoBar}>
          <div style={styles.infoItem}>
            <FaClock style={styles.infoIcon} />
            <div>
              <strong style={styles.infoTextTop}>Open Daily</strong>
              <span style={styles.infoTextSub}>8:00 AM - 10:00 PM</span>
            </div>
          </div>
          <div style={styles.infoItem}>
            <FaMapMarkerAlt style={styles.infoIcon} />
            <div>
              <strong style={styles.infoTextTop}>Location</strong>
              <span style={styles.infoTextSub}>Bole, Addis Ababa</span>
            </div>
          </div>
        </section>

        <section id="menu" style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Menu</h2>

          <div style={styles.tabsContainer}>
            {["All", "Main", "Vegetarian", "Drinks"].map((category) => (
              <button
                key={category}
                style={{
                  ...styles.tabBtn,
                  ...(activeTab === category ? styles.activeTabBtn : {}),
                }}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={styles.loadingContainer}>Loading menu items...</div>
          ) : (
            <div style={styles.menuGrid}>
              {filteredMenu.map((item, index) => {
                const itemId = item.id || item._id || index;
                return (
                  <div key={itemId} style={styles.card}>
                    <div style={styles.cardImageContainer}>
                      <img
                        src={
                          item.image ||
                          "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600"
                        }
                        alt={item.name || "Menu Item"}
                        style={styles.cardImg}
                      />
                      <button
                        style={styles.favBtn}
                        onClick={() => toggleFavorite(itemId)}
                      >
                        <FaHeart
                          color={
                            favorites.includes(itemId) ? "#e63946" : "#cbd5e1"
                          }
                        />
                      </button>
                      {item.isPopular && (
                        <span style={styles.popularBadge}>Popular</span>
                      )}
                    </div>

                    <div style={styles.cardContent}>
                      <div style={styles.cardHeader}>
                        <h3 style={styles.cardTitle}>
                          {item.name || item.title}
                        </h3>
                        <div style={styles.rating}>
                          <FaStar color="#f59e0b" size={14} />
                          <span style={styles.ratingValue}>
                            {item.rating || "4.8"}
                          </span>
                        </div>
                      </div>

                      <p style={styles.cardDescription}>{item.description}</p>

                      <div style={styles.cardFooter}>
                        <span style={styles.price}>
                          {typeof item.price === "number"
                            ? `${item.price} ETB`
                            : item.price}
                        </span>
                        <button
                          style={styles.addCartBtn}
                          onClick={() => setCartCount(cartCount + 1)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section id="about" style={styles.coffeeSection}>
          <FaCoffee size={36} color="#d97706" />
          <h2 style={styles.coffeeTitle}>Traditional Coffee Ceremony</h2>
          <p style={styles.coffeeDesc}>
            Experience the rich tradition of fresh coffee roasting, pan-brewing
            in a traditional Jebena, and enjoying coffee alongside incense and
            popcorn.
          </p>
        </section>
      </main>

      <footer id="contact" style={styles.footer}>
        <h3 style={styles.footerTitle}>Habesha Restaurant</h3>
        <p style={styles.footerText}>
          <FaPhone style={{ marginRight: 6 }} /> +251 911 000 000
        </p>
        <p style={styles.footerText}>
          <FaMapMarkerAlt style={{ marginRight: 6 }} /> Bole Road, Addis Ababa,
          Ethiopia
        </p>
        <p style={styles.copyright}>
          © 2026 Habesha Restaurant. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
