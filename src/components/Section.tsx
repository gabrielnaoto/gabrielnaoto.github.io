import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionProps {
  id: string;
  heading: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, heading, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-20 px-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold font-mono mb-10 text-accent">
          {heading}
        </h2>
        {children}
      </motion.div>
    </section>
  );
}
