'use client';

import { useState } from 'react';
import {
  BarChart3,
  Briefcase,
  Clock,
  DollarSign,
  Filter,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react';

const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const stats = [
    { title: 'Active Projects', value: '12', icon: Briefcase, trend: '+2.5%' },
    { title: 'Total Hours', value: '164', icon: Clock, trend: '+12.3%' },
    { title: 'Team Members', value: '8', icon: Users, trend: '+1' },
    { title: 'Revenue', value: '$32.5k', icon: DollarSign, trend: '+15.2%' },
  ];

  const projects = [
    {
      id: 1,
      name: 'Crypto Trading Platform',
      status: 'In Progress',
      progress: 75,
      team: ['/avatars/avatar1.jpg', '/avatars/avatar2.jpg', '/avatars/avatar3.jpg'],
      deadline: '2024-03-25',
      priority: 'High'
    },
    // Add more projects as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Work Dashboard</h1>
          <p className="text-gray-600">Track your projects and performance</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + New Project
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Project Management Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Projects Overview</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-50 p-6 rounded-lg border hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold">{project.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium
                  ${project.priority === 'High' ? 'bg-red-100 text-red-700' : 
                    project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-green-100 text-green-700'}`}>
                  {project.priority}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.team.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt="team member"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Due {new Date(project.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkPage;