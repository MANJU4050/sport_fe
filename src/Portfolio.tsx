import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Menu, X } from "lucide-react"

export default function DeveloperPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const yOffset = -80; // Adjust this value based on your header height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setIsMenuOpen(false) // Close mobile menu after clicking
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
          const sectionTop = section.offsetTop - 100 // Adjust this value as needed
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            document.querySelector(`a[href="#${sectionId}"]`)?.classList.add('text-blue-500')
          } else {
            document.querySelector(`a[href="#${sectionId}"]`)?.classList.remove('text-blue-500')
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold">JD</a>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="hover:text-blue-500 transition-colors" onClick={() => scrollToSection('about')}>About</a>
            <a href="#skills" className="hover:text-blue-500 transition-colors" onClick={() => scrollToSection('skills')}>Skills</a>
            <a href="#projects" className="hover:text-blue-500 transition-colors" onClick={() => scrollToSection('projects')}>Projects</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors" onClick={() => scrollToSection('contact')}>Contact</a>
          </nav>
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white dark:bg-gray-800 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <a href="#about" className="hover:text-blue-500 transition-colors" onClick={() => scrollToSection('about')}>About</a>
              <a href="#skills" className="hover:text-blue-500 transition-colors" onClick={() => scrollToSection('skills')}>Skills</a>
              <a href="#projects" className="hover:text-blue-500 transition-colors" onClick={() => scrollToSection('projects')}>Projects</a>
              <a href="#contact" className="hover:text-blue-500 transition-colors" onClick={() => scrollToSection('contact')}>Contact</a>
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">Jane Doe</h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up">Full Stack Developer</p>
          <Button asChild>
            <a href="#contact" onClick={() => scrollToSection('contact')} className="animate-bounce">Get in touch</a>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <img src="/placeholder.svg?height=300&width=300" alt="Jane Doe" className="w-64 h-64 rounded-full object-cover shadow-lg" />
            <div className="max-w-md text-center md:text-left">
              <p className="mb-4">
                I'm a passionate full stack developer with 5 years of experience in creating robust and scalable web applications. I love turning complex problems into simple, beautiful, and intuitive designs.
              </p>
              <p>
                When I'm not coding, you can find me hiking in the mountains or experimenting with new recipes in the kitchen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-gray-200 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'GraphQL', 'AWS', 'Docker'].map((skill) => (
              <div key={skill} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center transform hover:scale-105 transition-transform">
                <p className="font-semibold">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'E-commerce Platform', description: 'A full-stack e-commerce solution with React and Node.js' },
              { title: 'Task Management App', description: 'A React Native mobile app for managing daily tasks' },
              { title: 'Data Visualization Dashboard', description: 'An interactive dashboard using D3.js and React' }
            ].map((project, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
                <img src={`/placeholder.svg?height=200&width=400&text=Project+${index + 1}`} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                  <Button className="mt-4" variant="outline">View Project</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-200 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
          <div className="max-w-md mx-auto">
            <form className="space-y-4">
              <Input type="text" placeholder="Name" required />
              <Input type="email" placeholder="Email" required />
              <Textarea placeholder="Message" required />
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
          <div className="mt-12 flex justify-center space-x-6">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
              <Github size={24} />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-300 dark:bg-gray-700 py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Jane Doe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}   