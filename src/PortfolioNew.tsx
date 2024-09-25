'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider, useTheme } from 'next-themes'
import { MoonIcon, SunIcon, HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons'

import image from './assets/react.svg'

function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
    </button>
  )
}

function ProjectCard({ title, description, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <img src={image} alt={title} width={400} height={200} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  )
}

function NavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
        onClick()
      }}
      className="hover:text-blue-500 transition-colors"
    >
      {children}
    </a>
  )
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <header className="sticky top-0 bg-white dark:bg-gray-800 shadow-md z-10">
          <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold"
            >
              Jane Doe
            </motion.h1>
            <div className="hidden md:flex items-center space-x-4">
              <NavLink href="#about" onClick={closeMenu}>About</NavLink>
              <NavLink href="#experience" onClick={closeMenu}>Experience</NavLink>
              <NavLink href="#projects" onClick={closeMenu}>Projects</NavLink>
              <NavLink href="#skills" onClick={closeMenu}>Skills</NavLink>
              <NavLink href="#contact" onClick={closeMenu}>Contact</NavLink>
              <ThemeToggle />
            </div>
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <button onClick={toggleMenu} className="ml-4" aria-label="Toggle menu">
                {isMenuOpen ? <Cross1Icon className="w-6 h-6" /> : <HamburgerMenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </nav>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white dark:bg-gray-800"
              >
                <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                  <NavLink href="#about" onClick={closeMenu}>About</NavLink>
                  <NavLink href="#experience" onClick={closeMenu}>Experience</NavLink>
                  <NavLink href="#projects" onClick={closeMenu}>Projects</NavLink>
                  <NavLink href="#skills" onClick={closeMenu}>Skills</NavLink>
                  <NavLink href="#contact" onClick={closeMenu}>Contact</NavLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main>
          <section id="hero" className="py-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-4"
            >
              Welcome to My Portfolio
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl"
            >
              Full-stack Developer | UI/UX Enthusiast | Open Source Contributor
            </motion.p>
          </section>

          <section id="about" className="py-20 bg-white dark:bg-green-400">
            <div className="container mx-auto px-6 dark:bg-yellow-400">
              <h2 className="text-3xl font-bold mb-8">About Me</h2>
              <p className="text-lg mb-4">
                I'm a passionate full-stack developer with 5 years of experience in building web applications.
                I love creating elegant solutions to complex problems and am always eager to learn new technologies.
              </p>
              <p className="text-lg">
                When I'm not coding, you can find me hiking in the mountains or experimenting with new recipes in the kitchen.
              </p>
            </div>
          </section>

          <section id="experience" className="py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8">Experience</h2>
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2">Senior Developer at TechCorp</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">2020 - Present</p>
                  <p>Led a team of 5 developers in building a scalable e-commerce platform using React and Node.js.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2">Full-stack Developer at StartupX</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">2018 - 2020</p>
                  <p>Developed and maintained multiple web applications using Vue.js and Ruby on Rails.</p>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="projects" className="py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard
                  title="E-commerce Platform"
                  description="A full-featured online store built with React and Node.js"
image={image}                />
                <ProjectCard
                  title="Task Management App"
                  description="A Trello-like application built with Vue.js and Firebase"
image={image}                />
                <ProjectCard
                  title="Weather Forecast App"
                  description="A mobile-friendly weather app using React Native and OpenWeatherMap API"
image={image}                />
              </div>
            </div>
          </section>

          <section id="skills" className="py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8">Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker'].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
              <form className="max-w-lg mx-auto">
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2">Name</label>
                  <input type="text" id="name" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2">Email</label>
                  <input type="email" id="email" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block mb-2">Message</label>
                  <textarea id="message" rows={4} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </section>
        </main>

        <footer className="bg-gray-200 dark:bg-gray-800 py-6">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; 2023 Jane Doe. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}