
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider, useTheme } from 'next-themes'
import { MoonIcon, SunIcon, HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons'
import aboutme from './assets/images/webdeveloper.svg'
import experience from './assets/images/webbuilder.svg'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import notesify from './assets/images/notesify.png'
import scaleinfinite from './assets/images/scaleinfinite.png'
import nayara from './assets/images/nayara.png'
import sportzbid from './assets/images/sportzbid.png'
import myhealthrocks from './assets/images/myhealthrocks.png'
import evisechat from './assets/images/evisechat.png'
import { Button } from './components/ui/button'
import Meteors from './components/magicui/meteors'
import Particles from './components/magicui/particles'

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

function NavLink({ href, children, onClick, active }) {
    return (
        <a
            href={href}
            onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
                onClick();
            }}
            className={`transition-colors ${active ? 'text-blue-500 font-bold' : 'hover:text-blue-500'}`}
        >
            {children}
        </a>
    );
}


export default function Portfolio() {

    const [activeSection, setActiveSection] = useState('#home');


    const projectsList = [
        {
            title: 'My Health Rocks',
            image: myhealthrocks,
            technologies: ['React', 'TypeScript'],
            description: 'A health management app that syncs multiple smart devices, displaying interactive graphs for comparing health metrics. Users can generate and download health reports, as well as upload and manage health-related documents, offering a complete personal health information system.'

        },
        {
            title: 'Evise chat',
            image: evisechat,
            technologies: ['React', 'TypeScript'],
            description: 'A real-time chat application that connects users with subject matter experts (SMEs) across various fields. The platform allows users to ask questions, get expert advice through chat or audio calls, and offers a pricing structure for services. '

        },
        {
            title: 'SportzBid',
            image: sportzbid,
            technologies: ['React', 'TypeScript', 'ExpressJs', 'MongoDB', 'socket.io'],
            description: 'An auction platform with real-time bidding features. Users can register tournaments, invite players through registration forms, and conduct live player auctions. Teams participate in live bidding, while other users can view auction statistics in real time, creating an interactive and engaging experience for all participants.'

        },
        {
            title: 'Nayara fuels',
            image: nayara,
            technologies: ['React', 'TypeScript', 'ExpressJs', 'MongoDB'],
            description: "A web app for a fuel station contest. Customers buy fuel, receive coupons, and register for the contest via a QR code. Winners are chosen at random and awarded prizes. Admins can track registration, contest statistics, and employee performance, with each employee's sales monitored through unique QR codes."

        },
        {
            title: 'Notesify',
            image: notesify,
            technologies: ['React', 'Javascript'],
            description: 'A web application designed for note-taking, offering essential features similar to Google Keep. Users can create, organize, and delete notes easily. The app provides a straightforward interface for managing personal or work-related notes, making it a convenient tool for keeping track of important information.'

        },
        {
            title: 'Scale Infinite',
            image: scaleinfinite,
            technologies: ['React', 'flask'],
            description: 'A cloud platform for rapid deployment of production-ready apps. Users can quickly install over 1,000 apps from its database or Docker Hub without altering Dockerfiles or provisioning databases. It supports custom configurations and multiple security layers, and allows deployment from both public and private Docker registries.'

        }
    ]
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [year, setYear] = useState(new Date().getFullYear())
    const [projects, setProjects] = useState(projectsList)


    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const closeMenu = () => setIsMenuOpen(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let currentSection = '#home';
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = `#${section.id}`;
                }
            });
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <ThemeProvider attribute="class">
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
                <header className="sticky top-0 bg-white dark:bg-gray-950 shadow-md z-10  md:flex">
                    <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl font-bold"
                        >
                            Manjunath K
                        </motion.h1>
                        <div className="hidden md:flex items-center space-x-4">
                            <NavLink href="#home" onClick={closeMenu} active={activeSection === '#home'}>Home</NavLink>
                            <NavLink href="#about" onClick={closeMenu} active={activeSection === '#about'}>About</NavLink>
                            <NavLink href="#experience" onClick={closeMenu} active={activeSection === '#experience'}>Experience</NavLink>
                            <NavLink href="#projects" onClick={closeMenu} active={activeSection === '#projects'}>Projects</NavLink>
                            <NavLink href="#skills" onClick={closeMenu} active={activeSection === '#skills'}>Skills</NavLink>
                            <NavLink href="#contact" onClick={closeMenu} active={activeSection === '#contact'}>Contact</NavLink>
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
                                    <NavLink href="#home" onClick={closeMenu}>Home</NavLink>
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

                    <section id="home" className="py-20 text-center  dark:bg-[#1A1A29] min-h-screen flex flex-col justify-center  relative overflow-hidden">
                        <Meteors number={30} />
                        <Particles  className="absolute inset-0"
        quantity={100}
        ease={80}
        color={"#7562E0"}
        refresh />
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-center "
                        >
                            <div className='max-w-80 flex flex-col gap-3'>
                                <p className='text-3xl text-left'>Hello, I am</p>
                                <p className='text-6xl font-bold mb-4'>Manjunath</p>


                            </div>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl"
                        >
                            MERN Stack Developer
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl mt-20"
                        >
                            <a href='/files/Manjunath_resume.pdf' download='Manjunath_resume.pdf'>
                                <Button className='bg-[#7562E0] dark:bg-[#7562E0] dark:hover:bg-[#8562E0] dark:text-white animate-bounce'>Download resume</Button>
                            </a>
                        </motion.p>
                    </section>

                    <section id="about" className="py-20 bg-white dark:bg-[#1A1A29] md:min-h-[70vh]  flex justify-center items-center">
                        <div className='flex max-md:flex-col-reverse max-md:gap-10'>


                            <div className="container mx-auto flex-1 p-6 lg:pl-80">
                                <h2 className="text-3xl font-bold mb-8 text-[#7562E0] max-md:hidden">About Me</h2>
                                <p className="text-lg mb-4">
                                    I’m a React developer specializing in the MERN stack. With expertise in MongoDB, Express.js, React, and Node.js, I build dynamic, scalable web applications that deliver great user experiences. I focus on clean, efficient code and stay updated with the latest trends to ensure innovative solutions. Passionate and detail-oriented, I thrive in collaborative environments and aim to exceed client expectations.
                                </p>

                            </div>
                            <div className='flex-1 flex justify-center items-center ' >
                                <img src={aboutme} className='w-[50%]' />
                            </div>
                            <h2 className="text-3xl font-bold  text-[#7562E0] mx-5 md:hidden">About Me</h2>

                        </div>
                    </section>

                    <section id="experience" className="py-20 dark:bg-[#1A1A29] max-md:min-h-screen max-md:gap-5 flex max-md:flex-col justify-center items-center ">
                        <h2 className="text-3xl font-bold mb-8 text-[#7562E0] md:hidden self-start max-md:mx-5">Experience</h2>

                        <div className='flex-1 flex justify-center items-center'><img src={experience} className='w-[70%] max-lg:w-[90%]' /></div>
                        <div className="container mx-auto px-6 flex-1">
                            <h2 className="text-3xl font-bold mb-8 text-[#7562E0] max-md:hidden">Experience</h2>
                            <div className="space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-md:p-4"
                                >
                                    <div className='flex justify-between items-center'>
                                        <h3 className="text-xl font-semibold dark:text-purple-300">React Developer</h3>
                                        <p className="text-sm dark:text-gray-400">August 2022 - Present</p>
                                    </div>
                                    <p className='mb-2 dark:text-gray-300'>Sayone Techonolgies</p>
                                    <p className='dark:text-gray-400'>
                                        Worked on developing the frontend of a document upload and management feature. Implemented file sharing functionalities, enabling users to upload, view, update, and delete documents
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-md:p-4 max-md:gap-2"
                                >
                                    <div className='flex justify-between items-center max-md:gap-2'>
                                        <h3 className="text-xl font-semibold dark:text-purple-300 max-md:flex-2">Frontend intern</h3>
                                        <p className="text-sm dark:text-gray-400 max-md:flex-1">July 2022 - August 2022</p>
                                    </div>
                                    <p className='mb-2 dark:text-gray-300'>Scale Infinte</p>
                                    <p className='dark:text-gray-400'>
                                        Contributed to the frontend development of a containerization platform, focusing on user interfaces that manage containerized applications. Designed and implemented responsive components
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-md:p-4"
                                >
                                    <div className='flex justify-between items-center max-md:gap-3'>
                                        <h3 className="text-xl font-semibold dark:text-purple-300 max-md:flex-2">MERN intern</h3>
                                        <p className="text-sm dark:text-gray-400 max-md:flex-1">March 2022 - July 2022</p>
                                    </div>
                                    <p className='mb-2 dark:text-gray-300'>Luminar Technolabs</p>
                                    <p className='dark:text-gray-400'>
                                        Developed a product management application with basic CRUD operations. Worked on user interface elements for product creation, modification, and deletion.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    <section id="projects" className="py-20  dark:bg-[#1A1A29] ">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold mb-8 text-[#7562E0]">Projects</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {
                                    projects?.map((project) => {
                                        return <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="bg-white dark:bg-gray-800  rounded-lg shadow-lg "
                                        >

                                            <Card className="w-full overflow-hidden dark:bg-gray-800">
                                                <div className="relative">
                                                    <img
                                                        src={project?.image}
                                                        alt={`${project?.title} project thumbnail`}
                                                        className='w-full h-64 max-md:h-52'


                                                    />
                                                </div>
                                                <CardHeader>
                                                    <CardTitle className="text-2xl font-bold">{project?.title}</CardTitle>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {project?.technologies?.map((tech, index) => (
                                                            <Badge key={index} variant='default' className="px-2 py-1 ">
                                                                {tech}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <CardDescription className="text-sm text-muted-foreground">
                                                        {project?.description}
                                                    </CardDescription>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    })
                                }





                            </div>
                        </div>
                    </section>

                    <section id="skills" className="py-20 dark:bg-[#1A1A29]">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold mb-8 text-[#7562E0]">Skills</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {['React', 'TypeScript', 'JavaScript', 'Node.js', 'MongoDB', 'PostgreSql', 'HTML', 'CSS', 'Git', 'NextJs', 'Docker', 'React Native'].map((skill, index) => (
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

                    <section id="contact" className="py-20  dark:bg-[#1A1A29] ">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold mb-8 text-[#7562E0]">Contact Me</h2>
                            <form className="max-w-lg mx-auto">
                                <div className="mb-4">
                                    <label htmlFor="name" className="block mb-2">Name</label>
                                    <input type="text" id="name" className="w-full h-[62px] p-2 rounded-[8px] dark:bg-[#32323F] dark:border-gray-600" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block mb-2">Email</label>
                                    <input type="email" id="email" className="w-full h-[62px] p-2 rounded-[8px] dark:bg-[#32323F] dark:border-gray-600" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="block mb-2">Message</label>
                                    <textarea id="message" rows={4} className="w-full h-[98px] p-2 rounded-[8px] dark:bg-[#32323F] dark:border-gray-600"></textarea>
                                </div>
                                <button type="submit" className="bg-[#7562E0] text-white px-4 py-2 rounded hover:bg-[#8562E0] transition-colors">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </section>
                </main>

                <footer className="bg-gray-200 dark:bg-gray-800 py-6">
                    <div className="container mx-auto px-6 text-center">
                        <p>&copy; {year}  Manjunath K. All rights reserved.</p>
                    </div>
                </footer>

            </div>
        </ThemeProvider>
    )
}