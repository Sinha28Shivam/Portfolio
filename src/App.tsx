import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import Scene from './components/Scene';
import Projects from './components/Projects';

function App() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen relative">
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
            className="flex space-x-4"
          >
            <a href="https://github.com/Sinha28Shivam" target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/shivam-sinha-057066250/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:sinha28.shivam@gmail.com">
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-8 text-center"
          >
            About Me
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg text-gray-300 mb-8"
          >
            I'm a passionate developer with expertise in building modern web applications. 
            With a strong foundation in both front-end and back-end development, 
            I create seamless user experiences that bring ideas to life.
          </motion.p>

          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl font-bold mb-6 text-center"
          >
            Skills
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "JavaScript", "React", "Node.js",
              "Bootstrap", "Python", "Automation Testing"
            ].map((skill) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                className="p-6 bg-gray-900 rounded-lg text-center"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <Projects />
    </div>
  );
}

export default App;