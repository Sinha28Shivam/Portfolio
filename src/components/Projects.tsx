import { motion } from 'framer-motion';

const projects = [
  {
    title: "URL Shortner",
    description: "A normal project created using NodeJS and ExpressJS for backend and HTML5 and CSS3 for frontend using EJS as templating engine",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    tech: ["HTML5", "CSS3"],
    link: "https://github.com/Sinha28Shivam/Url_shortner.git"
  },
  {
    title: "NodeJS Backend",
    description: "A NodeJS backend server created using MongoDB and ExpressJS",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80",
    tech: ["MongoDB", "NodeJS", "ExpressJS"],
    link: "https://github.com/Sinha28Shivam/NODEJS_practice.git"
  },
  {
    title: "Leave Management System",
    description: "Leave Mangaement System created using JavaScript framework SAPUI5 and OData services",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    tech: ["SAPUI5", "OData Services", "JavaScript"],
    link: "https://github.com/Sinha28Shivam/LeaveMangementSystem.git"
  },
  {
    title: "To-Do List",
    description: "Create a To-Do List using ReactJS and supabase",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    tech: ["Supabase Database", "React", "NextJS"],
    link: "https://incomparable-licorice-f2ddd8.netlify.app/"
  }
];

function Projects() {
  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              className="bg-gray-900 rounded-lg overflow-hidden"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-blue-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link}
                  className="text-blue-400 hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;