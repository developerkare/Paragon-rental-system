import { motion } from "motion/react";
import logoImage from "figma:asset/edd1b3dc1925cb0e4b19d4e58bb921778ecca065.png";

export function BrandLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 flex flex-col items-center gap-8"
    >
      {/* Logo Image */}
      <div className="relative">
        <img
          src={logoImage}
          alt="Property Management Logo"
          className="w-64 h-64 object-contain drop-shadow-2xl"
        />
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Company Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-white text-4xl tracking-wider mb-2">The Company</h1>
        <p className="text-neutral-400 tracking-wide">Property Management System</p>
      </motion.div>
    </motion.div>
  );
}
