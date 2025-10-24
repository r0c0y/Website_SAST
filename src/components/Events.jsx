/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { motion } from "framer-motion";
import videoe1 from "../Landing_media/satellitevid.mp4";
import waterpng from "../Landing_media/waterrocket.png";
import watervid from "../Landing_media/bharatmpvid.mp4";
import bharatmppng from "../Landing_media/bharatmp.jpeg";
import bharatmpvid from "../Landing_media/bharatmpvid.mp4";
import damrupng from "../Landing_media/DamruExhibit.jpeg";
import onboard_png from "../Landing_media/Onboarding_1.jpeg";
import onboard_vid from "../Landing_media/onboardentry.mp4";
import rajkv_png from "../Landing_media/rajkumarv.jpeg";
import comet_png from "../Landing_media/Tsuchinshan.jpeg";
import comet_vid from "../Landing_media/Comentvid.mp4";
import launch_png from "../Landing_media/offlaunch.jpeg";
import launch_vid from "../Landing_media/launchvid.mp4";
import useLenis from "../utils/lenis";

const Events = () => {
  const [filterType, setFilterType] = useState("all");
  useLenis();

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const handleHover = (event, action) => {
      const video = event.currentTarget.querySelector("video");
      if (!video) return;

      if (isMobile) {
        video.paused ? video.play() : video.pause();
        video.classList.toggle("opacity-60");
      } else {
        if (action === "play") video.play();
        else {
          video.pause();
          video.currentTime = 0;
        }
      }
    };

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      if (isMobile) {
        card.addEventListener("click", (e) => handleHover(e, "toggle"));
      } else {
        card.addEventListener("mouseenter", (e) => handleHover(e, "play"));
        card.addEventListener("mouseleave", (e) => handleHover(e, "pause"));
      }
    });

    return () => {
      cards.forEach((card) => {
        if (isMobile) {
          card.removeEventListener("click", (e) => handleHover(e, "toggle"));
        } else {
          card.removeEventListener("mouseenter", (e) => handleHover(e, "play"));
          card.removeEventListener("mouseleave", (e) => handleHover(e, "pause"));
        }
      });
    };
  }, [filterType]);

  const filterEvents = (type) => setFilterType(type);

  const getFilteredEvents = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    return events.filter(({ date }) => {
      if (filterType === "all") return true;
      if (filterType === "past") return date < currentDate;
      if (filterType === "ongoing") return date === currentDate;
      if (filterType === "future") return date > currentDate;
      return true;
    });
  };

  const filterTypes = ["all", "past", "ongoing", "future"];

  const events = [
    {
      id: 1,
      title: "Water Rocket Launch",
      date: "2025-02-16",
      imgSrc: waterpng,
      videoSrc: watervid,
      description:
        "A thrilling competition where teams designed, built, and launched water-powered rockets.",
    },
    {
      id: 2,
      title: "Cubesat Showcase",
      date: "2024-12-12",
      imgSrc: bharatmppng,
      videoSrc: bharatmpvid,
      description: "Experience our latest CubeSat technology demonstration.",
    },
    {
      id: 3,
      title: "SAST Damru Exhibit",
      date: "2024-01-05",
      imgSrc: damrupng,
      videoSrc: "assets/damru.mp4",
      description: "A unique exhibit showcasing scientific wonders.",
    },
    {
      id: 4,
      title: "Club Onboarding",
      date: "2024-01-05",
      imgSrc: onboard_png,
      videoSrc: onboard_vid,
      description: "Welcoming space enthusiasts to SAST Club.",
    },
    {
      id: 5,
      title: "Guest Lecture - Dr. Rajkumar Vedam",
      date: "2025-02-13",
      imgSrc: rajkv_png,
      videoSrc: "assets/tsuchinshan.mp4",
      description: "Insights from Dr. Vedam on future space advancements.",
    },
    {
      id: 6,
      title: "Tsuchinshan Comet Spotting",
      date: "2024-01-05",
      imgSrc: comet_png,
      videoSrc: comet_vid,
      description: "Observe celestial phenomena in real-time.",
    },
    {
      id: 7,
      title: "SAST Official Launch",
      date: "2024-01-05",
      imgSrc: launch_png,
      videoSrc: launch_vid,
      description: "Inaugurating SAST's journey and vision.",
    },
  ];

  const timelineData = [...events]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(({ date, title, description }) => ({
      date: date.slice(0, 7),
      title,
      description,
    }));

  return (
    <div className="pt-44 md:pt-56 px-0">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src={videoe1} type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 bg-black/80 min-h-screen pb-40">
        <section className="eventssec flex flex-col items-center mt-28 px-2">

          {/* 🌌 Filter Navbar */}
          <div className="flex items-center justify-center w-full mt-8 relative " >
            <div className="flex items-center justify-between gap-4 mb-8 absolute left-40">
              <Link
                to="/calendar"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 text-sm text-white/90 backdrop-blur hover:bg-white/10 transition-colors duration-200"
                style={{ padding: "0.5rem 1rem" }}
              >
                <span>📅 Calendar</span>
              </Link>
            </div>

            <div className="relative flex items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-md px-3 py-2 sm:px-4 sm:py-3 overflow-x-auto no-scrollbar w-full max-w-[90vw] sm:w-[600px]">
              {filterTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => filterEvents(type)}
                  className={`relative text-sm sm:text-base px-4 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap font-medium ${
                    filterType === type
                      ? "text-blue-400 font-semibold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {type === "all" && "All Events"}
                  {type === "past" && "Past Events"}
                  {type === "ongoing" && "Ongoing Events"}
                  {type === "future" && "Future Events"}
                </button>
              ))}

              {/* Animated underline */}
              <motion.div
                className="absolute bottom-1 left-0 h-[3px] bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                layoutId="underline"
                initial={false}
                animate={{
                  left:
                    filterType === "all"
                      ? "5%"
                      : filterType === "past"
                      ? "30%"
                      : filterType === "ongoing"
                      ? "58%"
                      : "80%",
                  width:
                    filterType === "all"
                      ? "80px"
                      : filterType === "past"
                      ? "95px"
                      : filterType === "ongoing"
                      ? "120px"
                      : "110px",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            </div>
          </div>

          {/* Events Grid */}
          <div className="events grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4 w-full max-w-7xl">
            {getFilteredEvents().map((event) => (
              <div
                key={event.id}
                className="card group relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                <div className="relative w-full h-full">
                  <img
                    src={event.imgSrc}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <video
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    loop
                    muted
                  >
                    <source src={event.videoSrc} type="video/mp4" />
                  </video>
                  <div className="card-info p-4 text-white absolute bottom-0 w-full">
                    <h2 className="text-lg font-semibold">{event.title}</h2>
                    <p className="text-sm text-gray-200 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Timeline Section */}
      <section className="timeline_sast">
        <div className="w-full max-w-5xl mb-40">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-20 text-gradient-to-r from-blue-400 to-sky-500">
            SAST Events Timeline
          </h2>
          {/* Timeline code remains same */}
        </div>
      </section>
    </div>
  );
};

export default Events;
