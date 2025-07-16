"use client";

import Image from "next/image";
import Link from "next/link";
import { navbars } from "~/constants/navbars";
import { routers } from "~/constants/routers";
import { images } from "~/public/images";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full border-b border-white/20 bg-black/20 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.section
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex items-center"
          >
            <Link href={routers.home} className="flex items-center gap-3">
              <Image className="text-xl h-10 w-auto  font-bold text-white" loading="lazy" src={images.logo} alt="Cardano2vn" />
            </Link>
          </motion.section>
          {/* Navigation */}
          <section className="hidden items-center space-x-8 md:flex">
            {navbars.map(function (navbar) {
              return (
                <Link href={navbar.href} key={navbar.id} className="font-medium text-gray-300 transition-colors duration-200 hover:text-white">
                  {navbar.title}
                </Link>
              );
            })}
            <Link
              target="_blank"
              href="lms.cardano2vn.io"
              className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-gray-800/50 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:border-white/50 hover:bg-gray-700/50"
            >
              <span>LMS App</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
            </Link>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
