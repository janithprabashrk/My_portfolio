import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      text: "janithprabash944ugc@gmail.com",
      href: "mailto:janithprabash944ugc@gmail.com",
    },
    {
      icon: <Phone size={24} />,
      text: "0711235174",
      href: "tel:+94711235174",
    },
    {
      icon: <MapPin size={24} />,
      text: "Matara District, Sri Lanka",
      href: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      href: "https://github.com/janithprabashrk",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={24} />,
      href: "https://www.linkedin.com/in/janithrk",
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={24} />,
      href: "https://www.hackerrank.com/profile/janithprabash941",
      label: "HackerRank",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-[#0D0D0D]/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Get In <span className="text-[#FF007F]">Touch</span>
          </h2>
          <p className="text-[#C0C0C0] max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#1A1A1A] rounded-xl p-6 border border-[#1A1A1A] shadow-lg"
          >
            {isSubmitted ? (
              <div className="text-center py-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#C0C0C0]">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#C0C0C0] mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-[#1A1A1A] 
                               border-2 border-[#FF007F]/90  
                               rounded-md text-[#F5F5F5]
                               transition-all duration-300 ease-in-out
                               hover:shadow-md hover:shadow-[#00FFFF]/10
                               focus:outline-none focus:ring-2 focus:ring-[#FF007F]
                               focus:shadow-[0_0_8px_2px_#FF007F]"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#C0C0C0] mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-[#1A1A1A] 
                               border-2 border-[#FF007F]/90 
                               rounded-md text-[#F5F5F5]
                               transition-all duration-300 ease-in-out
                               hover:shadow-md hover:shadow-[#00FFFF]/10
                               focus:outline-none focus:ring-2 focus:ring-[#a42766]
                               focus:shadow-[0_0_8px_2px_#FF007F]"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#C0C0C0] mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-[#1A1A1A] 
                               border-2 border-[#FF007F]/90  
                               rounded-md text-[#F5F5F5]
                               transition-all duration-300 ease-in-out
                               hover:shadow-md hover:shadow-[#FF007F]/10
                               focus:outline-none focus:ring-2 focus:ring-[#a42766]
                               focus:shadow-[0_0_8px_2px_#FF007F]"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#FF007F] to-[#A020F0]
                             text-[#F5F5F5] font-medium rounded-md hover:shadow-lg
                             hover:shadow-[#FF007F]/30 transition-all
                             disabled:opacity-70 disabled:cursor-not-allowed
                             border border-transparent hover:border-[#FF007F]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#1A1A1A] shadow-lg mb-6">
              <h3 className="text-xl font-semibold text-[#F5F5F5] mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 rounded-lg bg-[#1A1A1A]
                               hover:bg-[#1A1A1A]/80 transition-colors
                               border border-transparent hover:border-[#00FFFF]"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#0D0D0D] flex items-center justify-center mr-4 text-[#00FFFF]">
                      {item.icon}
                    </div>
                    <span className="text-[#F5F5F5]">{item.text}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#1A1A1A] shadow-lg">
              <h3 className="text-xl font-semibold text-[#F5F5F5] mb-6">
                Connect With Me
              </h3>

              <div className="flex justify-around">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                    whileHover={{ y: -5 }}
                    aria-label={link.label}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#1A1A1A]
                                 flex items-center justify-center mb-2 text-[#00FFFF]
                                 hover:bg-[#1A1A1A]/80
                                 transition-colors border border-transparent hover:border-[#FF007F]"
                    >
                      {link.icon}
                    </div>
                    <span className="text-sm text-[#C0C0C0]">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
