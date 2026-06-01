import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { navlinks } from "../data/navlinks";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("home");
      return;
    }

    const sections = navlinks
      .filter((link) => link.href.includes("#"))
      .map((link) => {
        const parts = link.href.split("#");
        const id = parts[1];
        return document.getElementById(id as string);
      })
      .filter(Boolean) as HTMLElement[];

    const updateActiveSection = () => {
      const scrollPos = window.scrollY + 150;
      let current = "home";

      for (const section of sections) {
        if (section.offsetTop <= scrollPos) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-[var(--brand)]/10 bg-[var(--paper)]/90 px-6 py-4 text-[var(--brand)] backdrop-blur md:px-16 lg:px-24 xl:px-32"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      >
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Thumblify
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          {navlinks.map((link) => {
            const isHash = link.href.includes("#");
            const sectionName = isHash ? link.href.split("#")[1] : "";
            const isActive = isHash
              ? activeSection === sectionName
              : location.pathname === link.href;
            const baseClass =
              "transition text-[var(--brand)] hover:text-[var(--brand-dark)]";
            const activeClass =
              "border-b-2 border-purple-900 text-[var(--brand-dark)]";

            return isHash ? (
              <a
                key={link.name}
                href={link.href}
                className={`${baseClass} ${isActive ? activeClass : ""}`}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className={`${baseClass} ${isActive ? activeClass : ""}`}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            to="./generate"
            className="hover:text-[var(--brand-dark)] transition"
          >
            Generate
          </Link>
          <Link
            to="/apis"
            className="hover:text-[var(--brand-dark)] transition"
          >
            APIs
          </Link>
          {isLoggedIn ? (
            <Link
              to="/my-generation"
              className="hover:text-[var(--brand-dark)] transition"
            >
              My generations
            </Link>
          ) : (
            <Link to="#" className="hover:text-[var(--brand-dark)] transition">
              About
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div className="relative group">
              <button className="size-8 rounded-full border border-[var(--brand)]/20 bg-[var(--brand)] text-[var(--paper)]">
                {user?.name.charAt(0).toUpperCase()}
              </button>
              <div
                className="absolute hidden group-hover:block top-6 right-0
              pt-4"
              >
                <button
                  onClick={() => logout()}
                  className="rounded border border-[var(--brand)]/15 bg-[var(--paper)] px-5 py-1.5 shadow-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("./login")}
              className="hidden rounded-lg bg-[var(--brand)] px-6 py-2.5 text-[var(--paper)] transition-all hover:bg-[var(--brand-dark)] active:scale-95 md:block"
            >
              Get started
            </button>
          )}
          <button onClick={() => setIsOpen(true)} className="md:hidden">
            <MenuIcon size={26} className="active:scale-90 transition" />
          </button>
        </div>
      </motion.nav>

      <div
        className={`fixed inset-0 z-100 flex flex-col items-center justify-center gap-8 bg-[var(--paper)]/95 text-lg text-[var(--brand)] backdrop-blur md:hidden transition-transform duration-400 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navlinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="transition hover:text-[var(--brand-dark)]"
          >
            {link.name}
          </a>
        ))}
        <Link to="./generate" onClick={() => setIsOpen(false)}>
          Generate
        </Link>
        <Link to="/apis" onClick={() => setIsOpen(false)}>
          APIs
        </Link>
        {isLoggedIn ? (
          <Link to="/my-generation" onClick={() => setIsOpen(false)}>
            My generations
          </Link>
        ) : (
          <Link to="#" onClick={() => setIsOpen(false)}>
            About
          </Link>
        )}

        <Link to="#" onClick={() => setIsOpen(false)}>
          Contact Us
        </Link>
        {isLoggedIn ? (
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        )}

        <button
          onClick={() => setIsOpen(false)}
          className="flex aspect-square size-10 items-center justify-center rounded-md bg-[var(--brand)] p-1 text-[var(--paper)] transition hover:bg-[var(--brand-dark)] active:ring-3 active:ring-[var(--brand)]/20"
        >
          <XIcon />
        </button>
      </div>
    </>
  );
}
