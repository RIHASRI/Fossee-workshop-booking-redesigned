// ============================================================
//  Mock Workshop Data
//  Replace with real API responses in production
// ============================================================

export const MOCK_WORKSHOPS = [
  {
    id: 'ws-001',
    title: 'Python for Scientific Computing',
    category: 'Python',
    description:
      'A hands-on workshop covering NumPy, SciPy, and Matplotlib for scientific computing tasks. Ideal for engineering and science students who want to use Python as a computation tool.',
    date: '2025-08-15',
    duration: '2 Days',
    location: 'IIT Bombay, Mumbai',
    image: null,
    seats: { total: 60, available: 12 },
    instructor: 'Prof. Anand Deshpande',
    level: 'Intermediate',
    tags: ['Python', 'NumPy', 'SciPy', 'Matplotlib'],
  },
  {
    id: 'ws-002',
    title: 'Introduction to Scilab',
    category: 'Scilab',
    description:
      'Learn Scilab from scratch — matrix operations, control flow, plotting, and solving engineering problems. No prior experience required.',
    date: '2025-09-02',
    duration: '3 Days',
    location: 'Online (Live)',
    image: null,
    seats: { total: 100, available: 45 },
    instructor: 'Dr. Kannan Moudgalya',
    level: 'Beginner',
    tags: ['Scilab', 'Simulation', 'Engineering'],
  },
  {
    id: 'ws-003',
    title: 'Django Web Development Bootcamp',
    category: 'Web Dev',
    description:
      'Build production-ready web applications using Django. Topics include models, views, templates, REST APIs, and deployment.',
    date: '2025-09-18',
    duration: '5 Days',
    location: 'IIT Madras, Chennai',
    image: null,
    seats: { total: 40, available: 0 },
    instructor: 'Ratnesh Kumar',
    level: 'Intermediate',
    tags: ['Django', 'Python', 'REST', 'Deployment'],
  },
  {
    id: 'ws-004',
    title: 'OpenFOAM for CFD Simulations',
    category: 'CFD',
    description:
      'A focused workshop on using OpenFOAM for Computational Fluid Dynamics simulations. Covers meshing, boundary conditions, solvers, and post-processing with ParaView.',
    date: '2025-10-05',
    duration: '3 Days',
    location: 'NIT Trichy',
    image: null,
    seats: { total: 30, available: 4 },
    instructor: 'Dr. Shivasubramanian Gopalakrishnan',
    level: 'Advanced',
    tags: ['OpenFOAM', 'CFD', 'Simulation'],
  },
  {
    id: 'ws-005',
    title: 'Data Analysis with Pandas & Seaborn',
    category: 'Data Science',
    description:
      'Learn to wrangle, clean, and visualize real-world datasets using Pandas and Seaborn. Build your data intuition with practical examples.',
    date: '2025-10-20',
    duration: '2 Days',
    location: 'Online (Self-paced)',
    image: null,
    seats: { total: 80, available: 33 },
    instructor: 'Aditya Bhatt',
    level: 'Beginner',
    tags: ['Pandas', 'Seaborn', 'Data Science', 'Python'],
  },
  {
    id: 'ws-006',
    title: 'QGIS for Spatial Data Analysis',
    category: 'GIS',
    description:
      'Use QGIS for geospatial data visualization, analysis, and mapping. Covers vector and raster processing, coordinate systems, and plugin usage.',
    date: '2025-11-08',
    duration: '2 Days',
    location: 'NRSC Hyderabad',
    image: null,
    seats: { total: 50, available: 19 },
    instructor: 'Dr. Venkatesh Raghavan',
    level: 'Beginner',
    tags: ['QGIS', 'GIS', 'Mapping', 'Spatial'],
  },
]


// ============================================================
//  Utility Functions
// ============================================================

/**
 * Format a date string to a readable format
 */
export function formatDate(dateStr, locale = 'en-IN') {
  if (!dateStr) return 'TBA'
  const d = new Date(dateStr)
  return d.toLocaleDateString(locale, {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

/**
 * Clamp a number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Truncate a string to a given length with ellipsis
 */
export function truncate(str, maxLength = 120) {
  if (!str || str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}

/**
 * Get initials from a full name
 */
export function getInitials(name = '') {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
