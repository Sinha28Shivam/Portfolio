import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Code, Globe, Database, Terminal } from 'lucide-react';
import Scene from './components/Scene';
import Projects from './components/Projects';


function App() {
  /* this will not working as of now because of the CORS policy

  import fetchCommitCount from './utils/fetchCommitCount';
import { useEffect, useState } from 'react';
  const [commitCount, setCommitCount] = useState(0);

  useEffect(() => {
    const username = 'Sinha28Shivam'; // Replace with your GitHub username
    const token = "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"; // Optional: Use a GitHub personal access token if needed

    fetchCommitCount(username, token)
      .then((count) => setCommitCount(count))
      .catch((error) => console.error('Error fetching commit count:', error));
  }, []);
  */


  const scrollToNextSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Adjust this value to control scroll position
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const services = [
    { icon: <Code className="w-8 h-8 mb-4" />, title: "Web Development", description: "Building responsive and dynamic web applications" },
    { icon: <Globe className="w-8 h-8 mb-4" />, title: "UI/UX Design", description: "Creating intuitive and beautiful user interfaces" },
    { icon: <Database className="w-8 h-8 mb-4" />, title: "Backend Development", description: "Developing robust server-side solutions" },
    { icon: <Terminal className="w-8 h-8 mb-4" />, title: "DevOps", description: "Implementing CI/CD pipelines and cloud solutions" }
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen relative">
        <div className="absolute inset-0">
          <Canvas>
            <Scene />
          </Canvas>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold mb-4"
          >
            Shivam Sinha
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Full Stack Developer & Automation Tester
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex space-x-4 mb-16"
          >
            <a href="https://github.com/Sinha28Shivam" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/shivam-sinha-057066250/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:sinha28.shivam@gmail.com" className="hover:text-blue-400 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
          <motion.button
            onClick={() => scrollToNextSection('about')}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce"
            whileHover={{ scale: 1.1 }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>


        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen relative">
        <div className="absolute inset-0 opacity-20">
          <Canvas>
            <Scene />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto py-20 px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-12 text-center"
          >
            About Me
          </motion.h2>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-12 mb-20"
          >
            <div className="md:w-1/3">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQEln8BouSwUSw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728314083956?e=1741824000&v=beta&t=-OsMQsOkpHNpaYj0NsHsg59jPURGZYlic4a9Vi8j0fM"
                alt="Profile"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-4">Who am I?</h3>
              <p className="text-lg text-gray-300 mb-6">
                I'm a passionate developer with expertise in building modern web applications.
                With a strong foundation in both front-end and back-end development,
                I create seamless user experiences that bring ideas to life.
              </p>
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p><strong>Name:</strong> Shivam Sinha</p>
                  <p><strong>Age:</strong> 22</p>
                </div>
                <div>
                  <p><strong>Location:</strong> Lucknow, Uttar Prades, India</p>
                  <p><strong>Experience:</strong> 2+ years</p>
                  {/* <p><strong>GitHub Commits:</strong> {commitCount}</p> Display commit count */}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">What I Do</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-gray-800/50 transition-colors border border-gray-800"
                >
                  {service.icon}
                  <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                "JavaScript", "React", "Node.js", "TypeScript",
                "Python", "AWS", "Docker", "Git"
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl text-center backdrop-blur-sm border border-gray-800"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.button
            onClick={() => scrollToNextSection('projects')}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </div>


      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen">
        <Projects />
       
      </section>
    </div>
  );
}

export default App;