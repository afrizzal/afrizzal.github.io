"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution built with Next.js and Stripe integration. Features include real-time inventory, advanced search, and mobile-responsive design.",
      image: "/images/works/1.jpg",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      category: "Full Stack",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Digital Marketing Dashboard",
      description: "Comprehensive analytics dashboard for tracking marketing campaigns across multiple platforms with real-time data visualization.",
      image: "/images/works/2.jpg",
      technologies: ["React", "D3.js", "Node.js", "MongoDB"],
      category: "Digital Marketing",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Cloud Infrastructure Automation",
      description: "Automated CI/CD pipeline and infrastructure as code solution for scalable cloud deployments using modern DevOps practices.",
      image: "/images/works/3.jpg",
      technologies: ["AWS", "Terraform", "Docker", "Kubernetes"],
      category: "Cloud Engineering",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 4,
      title: "Mobile App Development",
      description: "Cross-platform mobile application with offline capabilities, push notifications, and seamless user experience.",
      image: "/images/works/4.jpg",
      technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
      category: "Mobile Development",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work spanning full-stack development, digital marketing solutions, 
            and cloud infrastructure projects.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <span className="text-2xl font-bold">{project.id}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200">
                    <Github className="w-4 h-4" />
                    Code
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Link href="/projects">
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              View All Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;

