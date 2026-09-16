import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Check,
  Clock,
  Heart,
  MapPin,
  Play,
  X,
} from "lucide-react";
import "./App.css";

function App() {
  const [intro, setIntro] = useState(true);
  const [opening, setOpening] = useState(false);
  const [showRsvp, setShowRsvp] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [professorName, setProfessorName] = useState("");
  const [showTop, setShowTop] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  /* =========================
     SCROLL BUTTON
  ========================= */

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================
     CINEMATIC INTRO
  ========================= */

  const startMovie = () => {
    setOpening(true);

    setTimeout(() => {
      setIntro(false);
    }, 1600);
  };

  /* =========================
     RSVP
  ========================= */

  const openRsvp = () => {
    setConfirmed(false);
    setError("");
    setShowRsvp(true);
  };

  const closeRsvp = () => {
    if (submitting) {
      return;
    }

    setShowRsvp(false);
    setConfirmed(false);
    setError("");
  };

  /* =========================
     CONFETTI
  ========================= */

  const celebrate = () => {
    const pieces = Array.from({ length: 60 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2 + Math.random() * 2,
      symbol:
        index % 3 === 0
          ? "✦"
          : index % 3 === 1
            ? "★"
            : "✧",
    }));

    setConfetti(pieces);

    setTimeout(() => {
      setConfetti([]);
    }, 5000);
  };

  /* =========================
     SUBMIT RSVP TO MONGODB
  ========================= */

  const confirmRsvp = async () => {
    const name = professorName.trim();

    if (!name) {
      setError("Please enter your name before confirming.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/rsvp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            department: "BCA",
            attendance: "Yes",
            guests: 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit RSVP."
        );
      }

      localStorage.setItem("freshers-rsvp", name);

      setConfirmed(true);
      celebrate();
    } catch (err) {
      console.error("RSVP submission error:", err);

      setError(
        "Unable to save your RSVP. Please make sure the server is running."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================
     WEBSITE
  ========================= */

  return (
    <div className="app">

      {/* =========================
          CONFETTI
      ========================= */}

      <div className="confetti">
        {confetti.map((piece) => (
          <span
            key={piece.id}
            style={{
              left: `${piece.left}%`,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
            }}
          >
            {piece.symbol}
          </span>
        ))}
      </div>

      {/* =========================
          CINEMATIC INTRO
      ========================= */}

      {intro && (
        <div
          className={`cinema-intro ${
            opening ? "cinema-started" : ""
          }`}
        >
          <div className="film-grain"></div>

          <div className="intro-content">

            <p className="production">
              BCA DEPARTMENT PRESENTS
            </p>

            <div className="intro-stars">
              ✦ &nbsp; ✧ &nbsp; ✦
            </div>

            <h1>
              A SPECIAL
              <span>PRODUCTION</span>
            </h1>

            <p className="intro-subtitle">
              Freshers' 2026
            </p>

            {/* CLAPPERBOARD */}

            <div className="clapper-wrapper">
              <div className="clapper">

                <div className="clapper-top">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>

                <div className="clapper-body">

                  <div className="clapper-title">
                    FRESHERS' 2026
                  </div>

                  <div className="clapper-lines">
                    <span>SCENE</span>
                    <span>01</span>
                    <span>TAKE</span>
                    <span>01</span>
                  </div>

                  <div className="clapper-action">
                    {opening ? "ACTION!" : "READY?"}
                  </div>

                </div>
              </div>
            </div>

            {/* START BUTTON */}

            {!opening && (
              <button
                className="action-button"
                onClick={startMovie}
                type="button"
              >
                <Play size={15} fill="currentColor" />
                <span>Start The Celebration</span>
              </button>
            )}

            {opening && (
              <div className="opening-text">
                <span>🎬</span>
                ROLLING...
              </div>
            )}

          </div>
        </div>
      )}

      {/* =========================
          MAIN WEBSITE
      ========================= */}

      {!intro && (
        <>

          {/* =========================
              NAVBAR
          ========================= */}

          <nav className="navbar">

            <a
              href="#home"
              className="brand"
            >
              <span className="brand-camera">
                ✦
              </span>

              <span>
                FRESHERS' 2026
              </span>
            </a>

            <div className="nav-links">

              <a href="#home">
                Home
              </a>

              <a href="#invitation">
                Invitation
              </a>

              <a href="#details">
                Cast &amp; Crew
              </a>

              <button
                className="nav-rsvp"
                onClick={openRsvp}
                type="button"
              >
                RSVP
              </button>

            </div>
          </nav>

          {/* =========================
              HERO
          ========================= */}

          <section
            className="hero"
            id="home"
          >

            <div className="film-strip film-strip-left">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>

            <div className="film-strip film-strip-right">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>

            <div className="hero-content">

              <p className="hero-kicker">
                BCA DEPARTMENT
              </p>

              <div className="hero-camera">
                ✦
              </div>

              <h1>
                FRESHERS'
                <span>2026</span>
              </h1>

              <div className="movie-line">
                <span></span>
                <b>★</b>
                <span></span>
              </div>

              <p className="hero-tagline">
                Lights. Camera. New Beginnings.
              </p>

              <p className="hero-description">
                Get ready for an evening where memories
                take centre stage and a brand-new chapter
                begins.
              </p>

              <a
                href="#invitation"
                className="hero-button"
              >
                <span>
                  Roll the Story
                </span>

                <ArrowDown size={15} />
              </a>

            </div>
          </section>

          {/* =========================
              INVITATION
          ========================= */}

          <section
            className="invitation-section"
            id="invitation"
          >

            <div className="movie-frame">

              <div className="frame-corner top-left"></div>
              <div className="frame-corner top-right"></div>
              <div className="frame-corner bottom-left"></div>
              <div className="frame-corner bottom-right"></div>

              <div className="invitation-content">

                <div className="invitation-clapper">
                  🎬
                </div>

                <p className="section-kicker">
                  THE INVITATION
                </p>

                <h2>
                  Dear Respected
                  <span>
                    Professors,
                  </span>
                </h2>

                <div className="gold-line"></div>

                <div className="invitation-text">

                  <p>
                    Your guidance has been the light that
                    helped us take our first steps into the
                    world of possibilities.
                  </p>

                  <p>
                    As we welcome a new batch of BCA students,
                    we would be honoured to have your presence
                    as we celebrate this beautiful beginning
                    together.
                  </p>

                </div>

                <div className="signature">

                  <span>
                    With love &amp; gratitude,
                  </span>

                  <strong>
                    The BCA Family
                  </strong>

                </div>

                <div className="director-credit">

                  <span>
                    DIRECTED BY
                  </span>

                  <strong>
                    THE BCA FAMILY
                  </strong>

                </div>

              </div>
            </div>
          </section>

          {/* =========================
              EVENT DETAILS
          ========================= */}

          <section
            className="details-section"
            id="details"
          >

            <div className="section-heading">

              <p className="section-kicker">
                THE SHOW DETAILS
              </p>

              <h2>
                Mark Your
                <span>
                  Calendar
                </span>
              </h2>

              <p>
                Every great story needs the perfect setting.
              </p>

            </div>

            <div className="details-grid">

              {/* DATE */}

              <div className="movie-card">

                <div className="card-top">
                  <span>
                    SCENE 01
                  </span>

                  <span>
                    ★
                  </span>
                </div>

                <div className="card-icon">
                  <CalendarDays size={25} />
                </div>

                <p>
                  DATE
                </p>

                <h3>
                  19th September, 2026
                </h3>

                <small>
                  The premiere awaits
                </small>

              </div>

              {/* TIME */}

              <div className="movie-card">

                <div className="card-top">
                  <span>
                    SCENE 02
                  </span>

                  <span>
                    ★
                  </span>
                </div>

                <div className="card-icon">
                  <Clock size={25} />
                </div>

                <p>
                  TIME
                </p>

                <h3>
                  12pm
                </h3>

                <small>
                  Lights up at showtime
                </small>

              </div>

              {/* VENUE */}

              <div className="movie-card">

                <div className="card-top">
                  <span>
                    SCENE 03
                  </span>

                  <span>
                    ★
                  </span>
                </div>

                <div className="card-icon">
                  <MapPin size={25} />
                </div>

                <p>
                  VENUE
                </p>

                <h3>
                  A308
                </h3>

                <small>
                  Your next destination
                </small>

              </div>

            </div>
          </section>

          {/* =========================
              RSVP SECTION
          ========================= */}

          <section
            className="rsvp-section"
            id="rsvp"
          >

            <div className="ticket">

              <div className="ticket-left">

                <span className="ticket-label">
                  ADMIT ONE
                </span>

                <h2>
                  Will You
                  <span>
                    Join Us?
                  </span>
                </h2>

                <p>
                  Your presence deserves a front-row seat
                  in our celebration.
                </p>

                <button
                  className="ticket-button"
                  onClick={openRsvp}
                  type="button"
                >
                  <Heart size={16} />

                  Confirm Your Presence
                </button>

              </div>

              <div className="ticket-right">

                <div className="ticket-star">
                  ★
                </div>

                <strong>
                  BCA
                </strong>

                <span>
                  FRESHERS'
                </span>

                <b>
                  2026
                </b>

              </div>

            </div>
          </section>

          {/* =========================
              FOOTER
          ========================= */}

          <footer className="footer">

            <div className="footer-film">
              ★ &nbsp; ★ &nbsp; ★ &nbsp; ★ &nbsp; ★
            </div>

            <p>
              The End? Not Quite.
            </p>

            <span>
              BCA DEPARTMENT · FRESHERS' 2026
            </span>

          </footer>

          {/* =========================
              RSVP MODAL
          ========================= */}

          {showRsvp && (
            <div
              className="modal-overlay"
              onClick={closeRsvp}
            >

              <div
                className="rsvp-modal"
                onClick={(event) =>
                  event.stopPropagation()
                }
              >

                {/* CLOSE */}

                <button
                  className="modal-close"
                  onClick={closeRsvp}
                  disabled={submitting}
                  type="button"
                  aria-label="Close RSVP"
                >
                  <X size={18} />
                </button>

                {/* =====================
                    RSVP FORM
                ===================== */}

                {!confirmed ? (
                  <>

                    <div className="modal-clapper">
                      🎬
                    </div>

                    <p className="modal-kicker">
                      SCENE: RSVP
                    </p>

                    <h2>
                      You're Invited
                      <span>
                        To The Premiere!
                      </span>
                    </h2>

                    <p className="modal-description">
                      Tell us who's taking a front-row seat
                      for this special celebration.
                    </p>

                    <label htmlFor="professor-name">
                      PROFESSOR'S NAME
                    </label>

                    <input
                      id="professor-name"
                      type="text"
                      placeholder="Enter your name"
                      value={professorName}
                      onChange={(event) => {
                        setProfessorName(
                          event.target.value
                        );
                        setError("");
                      }}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" &&
                          !submitting
                        ) {
                          confirmRsvp();
                        }
                      }}
                      disabled={submitting}
                    />

                    {/* ERROR */}

                    {error && (
                      <p className="rsvp-error">
                        {error}
                      </p>
                    )}

                    {/* CONFIRM */}

                    <button
                      className="modal-confirm"
                      onClick={confirmRsvp}
                      disabled={submitting}
                      type="button"
                    >

                      <Check size={17} />

                      {submitting
                        ? "Saving Your Seat..."
                        : "Action! I'll Be There"}

                    </button>

                    {/* LATER */}

                    <button
                      className="modal-later"
                      onClick={closeRsvp}
                      disabled={submitting}
                      type="button"
                    >
                      Maybe Later
                    </button>

                  </>
                ) : (

                  /* =====================
                     SUCCESS SCREEN
                  ===================== */

                  <div className="success">

                    <div className="success-icon">
                      <Check size={32} />
                    </div>

                    <p className="modal-kicker">
                      SCENE COMPLETE
                    </p>

                    <h2>
                      Cut!
                      <span>
                        Thank You
                      </span>
                    </h2>

                    <p>
                      {professorName.trim()
                        ? `Prof. ${professorName.trim()}, your seat is reserved!`
                        : "Your seat is reserved!"}
                    </p>

                    <div className="success-stars">
                      ★ &nbsp; ✦ &nbsp; ★
                    </div>

                    <button
                      className="modal-confirm"
                      onClick={closeRsvp}
                      type="button"
                    >
                      Continue the Story
                    </button>

                  </div>
                )}

              </div>
            </div>
          )}

          {/* =========================
              BACK TO TOP
          ========================= */}

          {showTop && (
            <button
              className="back-top"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              type="button"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          )}

        </>
      )}

    </div>
  );
}

export default App;