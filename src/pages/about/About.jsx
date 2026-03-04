import { useEffect, useRef } from "react";
import { Link } from "react-router";
import Footer from "../../components/Footer/Footer";
import Transition from "../../components/Transition/Transition";
import ParallaxImage from "../../components/ParallaxImage/ParallaxImage";
import CtaButton from "../../components/Button/CtaButton";
import "./About.css";
import { ReactLenis, useLenis } from "lenis/react";
import animateTextReveal from "../../utils/animateTextReveal";
import { animateAdvancedFadeIn, animateSimpleReveal } from "../../utils/animateTextReveal";

const About = () => {
  const lenis = useLenis(({ scroll }) => {});
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const cleanups = [];

    // --- H1 headings (advanced fade-in on all h1 elements) ---
    page.querySelectorAll("h1").forEach((heading, index) => {
      const isHeroHeading = Boolean(heading.closest(".about-hero-header"));
      cleanups.push(
        animateAdvancedFadeIn(heading, {
          delay: isHeroHeading ? 0.8 : Math.min(index * 0.04, 0.24),
          duration: isHeroHeading ? 1.2 : 1.05,
          useScrollTrigger: !isHeroHeading,
          start: "top 88%",
        })
      );
    });

    // --- Hero section ---

    const heroInfo = page.querySelector(".about-hero-info p");
    cleanups.push(
      animateSimpleReveal(heroInfo, {
        delay: 1,
        useScrollTrigger: false,
      })
    );

    // --- About Us section (scroll triggered) ---
    const signUpH3 = page.querySelector(".sign-up-card-header h3");
    cleanups.push(animateTextReveal(signUpH3));

    const signUpP = page.querySelector(".sign-up-card-header p");
    cleanups.push(animateSimpleReveal(signUpP, { delay: 0.1 }));

    const aboutCol2 = page.querySelector(".about-us-col:nth-child(2)");
    if (aboutCol2) {
      const aboutH3 = aboutCol2.querySelector("h3");
      cleanups.push(animateTextReveal(aboutH3));

      const aboutParas = aboutCol2.querySelectorAll(":scope > p");
      aboutParas.forEach((p, i) => {
        cleanups.push(animateTextReveal(p, { delay: i * 0.15 }));
      });
    }

    // --- Team section ---
    const teamHeaderH3 = page.querySelector(".team-header > h3");
    cleanups.push(
      animateSimpleReveal(teamHeaderH3, { start: "top 85%" })
    );

    const joinCardH3 = page.querySelector(".join-team-card h3");
    cleanups.push(animateSimpleReveal(joinCardH3));

    const joinCardP = page.querySelector(".join-team-card > p");
    cleanups.push(animateTextReveal(joinCardP, { delay: 0.1 }));

    // Player info & descriptions
    page.querySelectorAll(".player-info h3").forEach((el) => {
      cleanups.push(animateSimpleReveal(el));
    });
    page.querySelectorAll(".player-info p").forEach((el) => {
      cleanups.push(animateSimpleReveal(el, { delay: 0.05 }));
    });
    page.querySelectorAll(".player-desc p").forEach((el) => {
      cleanups.push(animateTextReveal(el));
    });

    // --- Services section ---
    page.querySelectorAll(".service-row").forEach((row) => {
      row.querySelectorAll(".service-title h3").forEach((el) => {
        cleanups.push(animateSimpleReveal(el));
      });
      row.querySelectorAll(".service-desc p").forEach((el, i) => {
        cleanups.push(animateTextReveal(el, { delay: i * 0.1 }));
      });
    });

    // --- Contact banner ---
    const bannerH2 = page.querySelector(".contact-banner-header h2");
    cleanups.push(animateSimpleReveal(bannerH2));

    page
      .querySelectorAll(
        ".contact-banner-header p, .banner-contact p, .banner-info p"
      )
      .forEach((el) => {
        cleanups.push(animateSimpleReveal(el));
      });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="page about" ref={pageRef}>
        <section className="solutions-hero about-hero">
          <div className="solutions-hero-img">
            <ParallaxImage
              src="/about/hero-1.png"
              alt="Dibyojyoti Biswas"
              speed={0.12}
              scale={1}
              className="about-hero-image"
            />
          </div>
          <div className="solutions-hero-header about-hero-header">
            <h1>Dibbo</h1>
            {/*<div className="stickers">
              <img src="/stickers.png" alt="" />
            </div>*/}
          </div>
          <div className="about-hero-info">
            <p>Session Guitarist | Live Performer | Composer | Creator | Educator</p>
          </div>
        </section>
        <section className="about-us">
          <div className="about-us-col">
            <div className="sign-up-card">
              <div className="sign-up-img">
                <ParallaxImage src="/about/sign-up-card.jpg" alt="" />
              </div>
              <div className="sign-up-card-header">
                <h3>
                  Book a session guitarist for your studio or live stage today!
                </h3>
                <p>Every Note Counts</p>
              </div>
              <div className="sign-up-cta">
                <CtaButton to="/" fullWidth>
                  Work With Me
                </CtaButton>
              </div>
            </div>
          </div>
          <div className="about-us-col">
            <h3>Crafting music that moves souls and defines the sound of a generation.</h3>
            <p>
              Hi! I'm Dibyojyoti Biswas - known as Dibbo, a session guitarist, live performer, and composer driven by a deep love for sound and storytelling through music. Over the years, I've collaborated with artists across different genres, bringing a thoughtful ear for tone, texture, and feel to every project I'm part of.
            <br />
              From intimate acoustic moments to high-energy live performances, I aim to create guitar work that feels honest, expressive, and alive.
            </p>
            <p>
              Beyond performing, I'm passionate about sharing the craft with the next generation of musicians, mentoring guitarists and encouraging them to find their own voice. For me, music isn't just about playing notes — it's about creating moments that connect, inspire, and stay with people long after the last chord fades.
            </p>

            <div className="about-us-cta">
              <CtaButton to="/contact">Book A Session</CtaButton>
            </div>
          </div>
        </section>

        <section className="team">
          <div className="team-bg">
            <ParallaxImage src="/about/team-bg.jpg" alt="" />
          </div>
          <div className="team-header">
            <h3>The Creative</h3>
            <h1>Circle</h1>
            <div className="join-team-card">
              <h3>Play a Part in Music</h3>
              <p>
                Dibbo collaborates with producers, artists, and fellow
                musicians worldwide, bringing an adaptive, expressive approach
                to every recording session and live performance.
              </p>

              <div className="join-team-cta">
                <CtaButton to="/" variant="dark">
                  Collaborate
                </CtaButton>
              </div>
            </div>
          </div>
          <div className="team-list">
            <div className="team-list-row">
              <div className="team-player">
                <div className="player-img">
                  <ParallaxImage
                    src="/about/team1.jpg"
                    alt="Team member 1"
                    speed={0.1}
                  />
                </div>
                <div className="player-info">
                  <h3>Alex Morgan</h3>
                  <p>Drums & Rhythm Section</p>
                </div>
                <div className="player-desc">
                  <p>
                    Alex is a powerhouse drummer with over three decades of
                    live stage and studio experience across rock, jazz, and
                    world music. A driving rhythmic force, Alex brings
                    precision timing and raw energy to every performance,
                    locking in seamlessly with Dibbo&apos;s guitar work.
                  </p>
                </div>
                <div className="player-social">
                  <Link to="/">LinkedIn</Link>
                </div>
              </div>
              <div className="team-player">
                <div className="player-img">
                  <ParallaxImage
                    src="/about/team2.jpg"
                    alt="Team member 2"
                    speed={0.1}
                  />
                </div>
                <div className="player-info">
                  <h3>Jordan Lee</h3>
                  <p>Bass Guitar & Production</p>
                </div>
                <div className="player-desc">
                  <p>
                    Jordan is a bass virtuoso and music producer with a deep
                    passion for groove and tone. With a background in studio
                    production and live performance, Jordan anchors the
                    low end with unwavering depth and creative instinct.
                  </p>
                </div>
                <div className="player-social">
                  <Link to="/">LinkedIn</Link>
                </div>
              </div>
            </div>
            <div className="team-list-row">
              <div className="team-player">
                <div className="player-img">
                  <ParallaxImage
                    src="/about/team3.jpg"
                    alt="Team member 3"
                    speed={0.1}
                  />
                </div>
                <div className="player-info">
                  <h3>Samantha Grey</h3>
                  <p>Vocals & Songwriting</p>
                </div>
                <div className="player-desc">
                  <p>
                    Samantha has spent her career crafting emotionally charged
                    vocal performances and resonant original songs. With a rare
                    gift for melody and storytelling, she brings conviction and
                    soul to every stage and studio collaboration.
                  </p>
                </div>
                <div className="player-social">
                  <Link to="/">LinkedIn</Link>
                </div>
              </div>
              <div className="team-player">
                <div className="player-img">
                  <ParallaxImage
                    src="/about/team4.jpg"
                    alt="Team member 4"
                    speed={0.1}
                  />
                </div>
                <div className="player-info">
                  <h3>Riley Bennett</h3>
                  <p>Keys & Arrangements</p>
                </div>
                <div className="player-desc">
                  <p>
                    Riley specializes in weaving rich harmonic textures into
                    every musical arrangement. With a background in jazz and
                    contemporary music, Riley elevates each composition with
                    nuanced keyboard work that brings Dibbo&apos;s vision fully alive.
                  </p>
                </div>
                <div className="player-social">
                  <Link to="/">LinkedIn</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-marquee">
          <div className="marquee_container">
            <div className="marquee">
              <h1>Live Guitar</h1>
              <h1>Studio Sessions</h1>
              <h1>Original Sound</h1>
              <h1>Live Guitar</h1>
              <h1>Studio Sessions</h1>
              <h1>Original Sound</h1>
              <h1>Live Guitar</h1>
              <h1>Studio Sessions</h1>
              <h1>Original Sound</h1>
            </div>
            <div className="marquee">
              <h1>Live Guitar</h1>
              <h1>Studio Sessions</h1>
              <h1>Original Sound</h1>
              <h1>Live Guitar</h1>
              <h1>Studio Sessions</h1>
              <h1>Original Sound</h1>
              <h1>Live Guitar</h1>
              <h1>Studio Sessions</h1>
              <h1>Original Sound</h1>
            </div>
          </div>
        </section>

        <section className="services">
          <div className="service-row">
            <div className="service-title">
              <h3>01.</h3>
              <h3>Session Guitar Recording</h3>
            </div>
            <div className="service-desc">
              <p>Strings Crafted For Your Story</p>
              <p>
                Dibbo delivers studio-ready guitar tracks tailored to any genre
                — from soulful acoustic ballads to driving electric riffs —
                crafted with precision, tonal depth, and expressive character
                for every recording project.
              </p>
            </div>
          </div>
          <div className="service-row">
            <div className="service-title">
              <h3>02.</h3>
              <h3>Live Performance & Touring</h3>
            </div>
            <div className="service-desc">
              <p>The Stage is Everything</p>
              <p>
                Born for the live stage, Dibbo delivers electrifying
                performances that connect deeply with every audience. With years
                of touring experience, each show is a masterclass in presence,
                energy, and authentic guitar artistry.
              </p>
            </div>
          </div>
          <div className="service-row">
            <div className="service-title">
              <h3>03.</h3>
              <h3>Music Composition & Scoring</h3>
            </div>
            <div className="service-desc">
              <p>Melodies Born From Lived Experience</p>
              <p>
                Dibbo crafts original compositions for film, stage, and studio
                — scoring rich melodic landscapes that carry real emotional
                weight. Collaborating with directors and producers, he shapes
                sound into immersive, unforgettable musical storytelling.
              </p>
            </div>
          </div>
          <div className="service-row">
            <div className="service-title">
              <h3>04.</h3>
              <h3>Guitar Mentorship & Education</h3>
            </div>
            <div className="service-desc">
              <p>Pass On the Craft</p>
              <p>
                Dibbo is passionate about nurturing the next generation of
                guitarists and musicians, offering structured lessons,
                workshops, and masterclasses that blend technique, creativity,
                and real-world stage performance experience.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-banner">
          <div className="contact-banner-col">
            <div className="contact-banner-header">
              <h2>
                Dibyojyoti <br />
                Biswas
              </h2>
              <p className="primary">
                Kolkata, West Bengal, India
              </p>
            </div>

            <div className="banner-contact">
              <p className="primary">hello@dibbyo.com</p>
              <p>Performing Since 2010</p>
            </div>
            <div className="banner-info">
              <p>
                Dibbo offers session guitar, live performances, original
                compositions, and music education — delivered with expertise,
                artistry, and an unwavering passion for authentic,
                soul-driven sound.
              </p>
            </div>
          </div>
          <div className="contact-banner-col">
            <div className="contact-banner-img">
              <ParallaxImage
                src="/about/banner.jpg"
                alt="Balanced Pitch Banner"
              />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Transition(About);
