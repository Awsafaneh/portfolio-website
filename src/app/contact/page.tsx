"use client";
import { useState, useEffect } from "react";
import { MdEmail, MdLocationOn, MdAccessTime } from "react-icons/md";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { toast } from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString("tr-TR", {
        timeZone: "Europe/Istanbul",
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(time);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <StarsBackground />
        <ShootingStars />
      </div>

      <Navbar />

      <div className="relative z-10 min-h-[calc(100vh-64px)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-xl backdrop-blur-sm bg-neutral-900/20 rounded-xl p-6 sm:p-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white">
            Get in Touch
          </h1>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-neutral-400 hover:text-white transition-colors">
                <MdEmail className="w-5 h-5" />
                <span>mustafa@eftekin.com</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-400 hover:text-white transition-colors">
                <MdLocationOn className="w-5 h-5" />
                <span>Istanbul, Turkey</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-400 hover:text-white transition-colors">
                <MdAccessTime className="w-5 h-5" />
                <span>Local time: {currentTime}</span>
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-neutral-900/50 border border-neutral-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neutral-600 transition-colors placeholder:text-neutral-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-neutral-900/50 border border-neutral-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neutral-600 transition-colors placeholder:text-neutral-500"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-neutral-900/50 border border-neutral-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-neutral-600 transition-colors placeholder:text-neutral-500"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-lg bg-neutral-800 text-white font-medium hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
