export const DEMO_USER = {
  id: '1',
  name: 'Arjun Sharma',
  email: 'arjun@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
  interests: ['Coding', 'Music', 'Travel', 'Design'],
  skills: ['React', 'Python', 'UI/UX', 'Node.js'],
  points: 1240,
  badges: ['Explorer', 'Team Player', 'Hackathon Hero'],
  joinedEvents: ['1', '3', '5'],
  completedChallenges: ['1', '2', '4'],
}

export const STUDY_EVENTS = [
  {
    id: '1', title: 'Smart India Hackathon 2025', category: 'Hackathon',
    tags: ['AI', 'Web Dev', 'Mobile'], deadline: '2025-04-15',
    location: 'Pan India', prize: '₹1,00,000', participants: 2340,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80',
    description: 'India\'s biggest hackathon for students. Build solutions for real-world problems across domains like health, education, and agriculture.',
    trending: true, type: 'online',
    organizer: 'Ministry of Education', eligibility: 'All college students', teamSize: '2-6 members',
  },
  {
    id: '2', title: 'Google DevFest 2025', category: 'Workshop',
    tags: ['Google', 'Cloud', 'Flutter'], deadline: '2025-04-20',
    location: 'Bangalore', prize: 'Swag + Certificate', participants: 890,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
    description: 'Annual developer festival by Google with workshops, talks, and networking. Learn from Google engineers and industry experts.',
    trending: true, type: 'offline',
    organizer: 'Google Developer Groups', eligibility: 'Open to all', teamSize: 'Individual',
  },
  {
    id: '3', title: 'AWS Cloud Practitioner Bootcamp', category: 'Seminar',
    tags: ['AWS', 'Cloud', 'DevOps'], deadline: '2025-04-25',
    location: 'Online', prize: 'Free Certification', participants: 1200,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
    description: 'Free bootcamp to prepare for AWS Cloud Practitioner certification. Covers core AWS services, security, and pricing.',
    trending: false, type: 'online',
    organizer: 'AWS India', eligibility: 'Beginners welcome', teamSize: 'Individual',
  },
  {
    id: '4', title: 'HackMIT 2025', category: 'Hackathon',
    tags: ['MIT', 'Innovation', 'Tech'], deadline: '2025-05-01',
    location: 'MIT, USA', prize: '$10,000', participants: 500,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80',
    description: 'One of the most prestigious student hackathons in the world. Build innovative solutions in 24 hours with top engineers as mentors.',
    trending: false, type: 'offline',
    organizer: 'MIT', eligibility: 'University students worldwide', teamSize: '1-4 members',
  },
  {
    id: '5', title: 'UI/UX Design Sprint', category: 'Workshop',
    tags: ['Design', 'Figma', 'UX'], deadline: '2025-04-18',
    location: 'Mumbai', prize: 'Certificate + Job Referral', participants: 320,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
    description: 'Intensive 2-day design sprint with industry mentors from top startups. Learn design thinking, prototyping, and user research.',
    trending: true, type: 'offline',
    organizer: 'DesignX India', eligibility: 'Design & CS students', teamSize: 'Individual',
  },
  {
    id: '6', title: 'Open Source Contribution Drive', category: 'Hackathon',
    tags: ['Open Source', 'GitHub', 'Community'], deadline: '2025-05-10',
    location: 'Online', prize: 'Swag + Recognition', participants: 4500,
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&q=80',
    description: 'Contribute to open source projects and earn exclusive swag and recognition. Great for building your GitHub profile.',
    trending: false, type: 'online',
    organizer: 'GitHub India', eligibility: 'All developers', teamSize: 'Individual',
  },
]

// All opportunities are Hyderabad-specific
export const OPPORTUNITIES = [
  // ── Hackathons ──
  { id: '1',  title: 'HydHack 2025',              type: 'hackathon',  location: 'HITEC City',      company: 'T-Hub',           stipend: '₹1,00,000',  deadline: '2025-05-10', tags: ['AI', 'Web', 'IoT'] },
  { id: '2',  title: 'FinTech Hackathon',          type: 'hackathon',  location: 'Gachibowli',      company: 'ICICI Bank',      stipend: '₹75,000',    deadline: '2025-05-18', tags: ['FinTech', 'Blockchain', 'UPI'] },
  { id: '3',  title: 'Smart City Hack',            type: 'hackathon',  location: 'Banjara Hills',   company: 'GHMC',            stipend: '₹50,000',    deadline: '2025-06-01', tags: ['IoT', 'Civic Tech'] },
  // ── Exams ──
  { id: '4',  title: 'GATE 2026 – CSE',            type: 'exam',       location: 'Kukatpally',      company: 'IIT Hyderabad',   stipend: 'PG Admission', deadline: '2026-02-01', tags: ['CSE', 'Engineering', 'PG'] },
  { id: '5',  title: 'TSPSC Group-I 2025',         type: 'exam',       location: 'Secunderabad',    company: 'TSPSC',           stipend: 'Govt Job',   deadline: '2025-07-15', tags: ['Civil Services', 'Telangana'] },
  { id: '6',  title: 'ICAI CA Final – Nov 2025',   type: 'exam',       location: 'Charminar',       company: 'ICAI',            stipend: 'CA Licence', deadline: '2025-10-31', tags: ['Finance', 'Accounting', 'CA'] },
  // ── Internships ──
  { id: '7',  title: 'SDE Intern – Microsoft',     type: 'internship', location: 'HITEC City',      company: 'Microsoft',       stipend: '₹80,000/mo', deadline: '2025-05-20', tags: ['React', 'Azure', 'TypeScript'] },
  { id: '8',  title: 'Data Science Intern – TCS',  type: 'internship', location: 'Madhapur',        company: 'TCS',             stipend: '₹25,000/mo', deadline: '2025-05-30', tags: ['Python', 'ML', 'SQL'] },
  { id: '9',  title: 'UI/UX Intern – Wipro',       type: 'internship', location: 'Gachibowli',      company: 'Wipro',           stipend: '₹20,000/mo', deadline: '2025-06-10', tags: ['Figma', 'Design', 'UX'] },
  // ── Jobs ──
  { id: '10', title: 'SDE-2 – Amazon',             type: 'job',        location: 'Nanakramguda',    company: 'Amazon',          stipend: '₹28 LPA',    deadline: '2025-05-25', tags: ['Java', 'AWS', 'DSA'] },
  { id: '11', title: 'Backend Engineer – Juspay',  type: 'job',        location: 'Banjara Hills',   company: 'Juspay',          stipend: '₹22 LPA',    deadline: '2025-06-05', tags: ['Haskell', 'Node.js', 'Payments'] },
  { id: '12', title: 'ML Engineer – Infoedge',     type: 'job',        location: 'Secunderabad',    company: 'Infoedge',        stipend: '₹18 LPA',    deadline: '2025-06-15', tags: ['Python', 'TensorFlow', 'NLP'] },
]

export const TEAMS = [
  {
    id: '1', name: 'CodeCraft', project: 'AI-powered Study Assistant',
    event: 'Smart India Hackathon 2025', members: 3, maxMembers: 5,
    roles: ['ML Engineer', 'Frontend Dev'], skills: ['Python', 'React', 'TensorFlow'],
    leader: { name: 'Priya Nair', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
    match: 92, open: true,
  },
  {
    id: '2', name: 'PixelPirates', project: 'AR Navigation App',
    event: 'HackMIT 2025', members: 2, maxMembers: 4,
    roles: ['AR Developer', 'UI Designer', 'Backend Dev'], skills: ['Unity', 'Figma', 'Node.js'],
    leader: { name: 'Rahul Verma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul' },
    match: 78, open: true,
  },
  {
    id: '3', name: 'GreenTech', project: 'Carbon Footprint Tracker',
    event: 'Google DevFest 2025', members: 4, maxMembers: 5,
    roles: ['Data Analyst'], skills: ['Python', 'Data Science', 'Flutter'],
    leader: { name: 'Sneha Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha' },
    match: 65, open: true,
  },
  {
    id: '4', name: 'FinFlow', project: 'Blockchain Payment Gateway',
    event: 'HackCBS 7.0', members: 3, maxMembers: 4,
    roles: ['Blockchain Dev'], skills: ['Solidity', 'Web3.js', 'React'],
    leader: { name: 'Karan Mehta', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan' },
    match: 55, open: true,
  },
]

// Each badge requires completing ALL tasks in its group
export const BADGE_CHALLENGES = [
  {
    badgeId: 'explorer',
    badge: 'Explorer',
    emoji: '🗺️',
    description: 'Discover the platform and explore opportunities',
    category: 'study',
    tasks: [
      { id: 'b1t1', title: 'Join your first event', points: 50, completed: true, progress: 100 },
      { id: 'b1t2', title: 'Explore 3 pins on Opportunity Map', points: 75, completed: true, progress: 100 },
      { id: 'b1t3', title: 'Save an opportunity', points: 30, completed: false, progress: 0 },
    ],
  },
  {
    badgeId: 'team_player',
    badge: 'Team Player',
    emoji: '🤝',
    description: 'Collaborate and build connections with others',
    category: 'study',
    tasks: [
      { id: 'b2t1', title: 'Join or create a team', points: 100, completed: true, progress: 100 },
      { id: 'b2t2', title: 'Send 2 team join requests', points: 80, completed: true, progress: 100 },
      { id: 'b2t3', title: 'Get accepted into a team', points: 120, completed: false, progress: 50 },
    ],
  },
  {
    badgeId: 'hackathon_hero',
    badge: 'Hackathon Hero',
    emoji: '💻',
    description: 'Prove your skills in competitive coding events',
    category: 'study',
    tasks: [
      { id: 'b3t1', title: 'Register for a hackathon', points: 60, completed: false, progress: 0 },
      { id: 'b3t2', title: 'Submit a project', points: 200, completed: false, progress: 0 },
      { id: 'b3t3', title: 'Win or get top 10', points: 500, completed: false, progress: 0 },
    ],
  },
  {
    badgeId: 'opportunity_hunter',
    badge: 'Opportunity Hunter',
    emoji: '🎯',
    description: 'Actively seek and apply to career opportunities',
    category: 'study',
    tasks: [
      { id: 'b4t1', title: 'Apply to 1 job/internship', points: 80, completed: true, progress: 100 },
      { id: 'b4t2', title: 'Apply to 3 opportunities total', points: 150, completed: false, progress: 66 },
      { id: 'b4t3', title: 'Get a callback or interview', points: 300, completed: false, progress: 0 },
    ],
  },
  {
    badgeId: 'social_butterfly',
    badge: 'Social Butterfly',
    emoji: '🦋',
    description: 'Build your social circle through fun activities',
    category: 'fun',
    tasks: [
      { id: 'b5t1', title: 'Join 1 social group', points: 50, completed: false, progress: 0 },
      { id: 'b5t2', title: 'Join 2 social groups', points: 80, completed: false, progress: 50 },
      { id: 'b5t3', title: 'Be active in a group for 7 days', points: 120, completed: false, progress: 0 },
    ],
  },
  {
    badgeId: 'vibe_traveler',
    badge: 'Vibe Traveler',
    emoji: '✈️',
    description: 'Explore the world through immersive Vibe Mode',
    category: 'fun',
    tasks: [
      { id: 'b6t1', title: 'Visit 1 country in Vibe Mode', points: 40, completed: false, progress: 33 },
      { id: 'b6t2', title: 'Explore 3 different countries', points: 120, completed: false, progress: 33 },
      { id: 'b6t3', title: 'Try all 3 moods (Relax/Focus/Explore)', points: 150, completed: false, progress: 0 },
    ],
  },
  {
    badgeId: 'hobby_enthusiast',
    badge: 'Hobby Enthusiast',
    emoji: '🎨',
    description: 'Dive into creative hobbies and experiences',
    category: 'fun',
    tasks: [
      { id: 'b7t1', title: 'Register for a hobby event', points: 60, completed: false, progress: 0 },
      { id: 'b7t2', title: 'Attend 2 different hobby categories', points: 100, completed: false, progress: 0 },
      { id: 'b7t3', title: 'Like 5 hobby events', points: 40, completed: false, progress: 0 },
    ],
  },
]

// Flat challenges list (kept for dashboard progress widget)
export const CHALLENGES = [
  { id: '1', title: 'First Step', description: 'Join your first event', icon: '🚀', points: 50, completed: true, progress: 100, category: 'study' },
  { id: '2', title: 'Team Player', description: 'Join or create a team', icon: '🤝', points: 100, completed: true, progress: 100, category: 'study' },
  { id: '3', title: 'Opportunity Hunter', description: 'Apply to 3 opportunities', icon: '🎯', points: 150, completed: false, progress: 66, category: 'study' },
  { id: '4', title: 'Map Explorer', description: 'Explore 5 pins on the Opportunity Map', icon: '🗺️', points: 75, completed: true, progress: 100, category: 'study' },
  { id: '5', title: 'Social Butterfly', description: 'Join 2 social groups', icon: '🦋', points: 80, completed: false, progress: 50, category: 'fun' },
  { id: '6', title: 'Vibe Traveler', description: 'Explore 3 countries in Vibe Mode', icon: '✈️', points: 120, completed: false, progress: 33, category: 'fun' },
  { id: '7', title: 'Hobby Enthusiast', description: 'Register for a hobby event', icon: '🎨', points: 60, completed: false, progress: 0, category: 'fun' },
  { id: '8', title: 'Hackathon Hero', description: 'Participate in a hackathon', icon: '💻', points: 200, completed: false, progress: 0, category: 'study' },
]

export const FUN_EVENTS = [
  {
    id: '1', title: 'Pottery & Clay Workshop', category: 'Art & Craft',
    tags: ['Pottery', 'Handmade', 'Relaxing'], date: '2025-04-20',
    location: 'Bangalore', price: '₹800', spots: 12, spotsLeft: 4,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80',
    trending: true, emoji: '🏺',
    description: 'Learn the ancient art of pottery with expert instructors. Create your own clay masterpiece to take home.',
    duration: '3 hours', level: 'Beginner friendly',
  },
  {
    id: '2', title: 'Resin Art Masterclass', category: 'Art & Craft',
    tags: ['Resin', 'DIY', 'Creative'], date: '2025-04-22',
    location: 'Mumbai', price: '₹1,200', spots: 8, spotsLeft: 2,
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&q=80',
    trending: true, emoji: '🎨',
    description: 'Create stunning resin art pieces with professional guidance. All materials provided.',
    duration: '4 hours', level: 'All levels',
  },
  {
    id: '3', title: 'Indie Music Jam Session', category: 'Music',
    tags: ['Music', 'Indie', 'Live'], date: '2025-04-25',
    location: 'Hyderabad', price: 'Free', spots: 50, spotsLeft: 23,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    trending: false, emoji: '🎸',
    description: 'Open jam session for indie music lovers. Bring your instrument or just come to enjoy.',
    duration: '2 hours', level: 'All musicians',
  },
  {
    id: '4', title: 'Backpacking Goa Trip', category: 'Travel',
    tags: ['Travel', 'Beach', 'Adventure'], date: '2025-05-01',
    location: 'Goa', price: '₹3,500', spots: 20, spotsLeft: 7,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80',
    trending: true, emoji: '🏖️',
    description: '3-day backpacking trip to Goa. Includes accommodation, guided tours, and beach activities.',
    duration: '3 days', level: 'Adventure seekers',
  },
  {
    id: '5', title: 'Yoga & Mindfulness Retreat', category: 'Wellness',
    tags: ['Yoga', 'Meditation', 'Peace'], date: '2025-04-28',
    location: 'Rishikesh', price: '₹2,000', spots: 15, spotsLeft: 9,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
    trending: false, emoji: '🧘',
    description: 'Weekend yoga and mindfulness retreat in the foothills of the Himalayas.',
    duration: '2 days', level: 'All levels',
  },
  {
    id: '6', title: 'Photography Walk – Old Delhi', category: 'Photography',
    tags: ['Photography', 'Street', 'Culture'], date: '2025-04-19',
    location: 'Delhi', price: '₹500', spots: 25, spotsLeft: 11,
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80',
    trending: true, emoji: '📸',
    description: 'Guided photography walk through the lanes of Old Delhi. Capture culture, food, and architecture.',
    duration: '3 hours', level: 'Any camera welcome',
  },
]

export const SOCIAL_GROUPS = [
  { id: '1', name: 'Indie Hackers India', category: 'Tech', members: 1240, active: true, emoji: '💡', description: 'Build and launch side projects together', joined: false, pending: false },
  { id: '2', name: 'Travel Buddies', category: 'Travel', members: 890, active: true, emoji: '✈️', description: 'Find travel companions for your next adventure', joined: true, pending: false },
  { id: '3', name: 'Art & Soul', category: 'Art', members: 456, active: false, emoji: '🎨', description: 'Share your art, get inspired, grow together', joined: false, pending: true },
  { id: '4', name: 'Music Makers', category: 'Music', members: 678, active: true, emoji: '🎵', description: 'Collaborate on music projects and jam sessions', joined: false, pending: false },
  { id: '5', name: 'Bookworms Club', category: 'Reading', members: 320, active: true, emoji: '📚', description: 'Monthly book discussions and reading challenges', joined: false, pending: false },
  { id: '6', name: 'Fitness Freaks', category: 'Fitness', members: 1100, active: true, emoji: '💪', description: 'Workout challenges, tips, and accountability', joined: false, pending: false },
]

export const MUSIC_CATEGORIES = [
  { id: 'lofi', label: 'Lo-Fi Beats', emoji: '🎵', color: '#8B5CF6' },
  { id: 'jazz', label: 'Jazz Café', emoji: '🎷', color: '#F97316' },
  { id: 'nature', label: 'Nature Sounds', emoji: '🌿', color: '#10B981' },
  { id: 'classical', label: 'Classical', emoji: '🎻', color: '#3B82F6' },
  { id: 'ambient', label: 'Ambient', emoji: '🌌', color: '#EC4899' },
  { id: 'ocean', label: 'Ocean Waves', emoji: '🌊', color: '#06B6D4' },
  { id: 'rain', label: 'Rain & Thunder', emoji: '🌧️', color: '#64748B' },
  { id: 'city', label: 'City Sounds', emoji: '🏙️', color: '#EAB308' },
]

export const MUSIC_TRACKS = [
  { id: 'm1', title: 'Chill Lo-Fi Study', artist: 'Lo-Fi Girl', category: 'lofi', youtubeId: 'jfKfPfyJRdk', duration: 'Live' },
  { id: 'm2', title: 'Jazz Café Ambience', artist: 'Café Jazz', category: 'jazz', youtubeId: 'Dx5qFachd3A', duration: 'Live' },
  { id: 'm3', title: 'Forest Rain Sounds', artist: 'Nature Sounds', category: 'nature', youtubeId: 'xNN7iTA57jM', duration: '3h' },
  { id: 'm4', title: 'Deep Focus Classical', artist: 'Mozart', category: 'classical', youtubeId: 'jgpJVI3tDbY', duration: '2h' },
  { id: 'm5', title: 'Space Ambient', artist: 'Ambient Works', category: 'ambient', youtubeId: 'S_MOd40zlYU', duration: '4h' },
  { id: 'm6', title: 'Ocean Waves & Seagulls', artist: 'Ocean Sounds', category: 'ocean', youtubeId: 'bn9F19Hi1Lk', duration: '8h' },
  { id: 'm7', title: 'Heavy Rain on Window', artist: 'Rain Sounds', category: 'rain', youtubeId: 'mPZkdNFkNps', duration: '10h' },
  { id: 'm8', title: 'NYC Street Ambience', artist: 'City Sounds', category: 'city', youtubeId: 'r0NNEMqFxwU', duration: '1h' },
  { id: 'm9', title: 'Tokyo Night Lo-Fi', artist: 'Tokyo Beats', category: 'lofi', youtubeId: '5qap5aO4i9A', duration: 'Live' },
  { id: 'm10', title: 'Bali Temple Sounds', artist: 'Bali Ambience', category: 'nature', youtubeId: 'V1bFr2SWP1I', duration: '2h' },
]

export const VIBE_SCENES = [
  {
    id: 'mountain',
    label: 'Mountains',
    emoji: '⛰️',
    color: '#06B6D4',
    defaultMusic: 'm3',
    videos: [
      { id: 'mv1', title: 'Swiss Alps – 4K Drone', location: 'Switzerland', youtubeId: 'NA2RFAiDqAo', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=60' },
      { id: 'mv2', title: 'Himalayan Peaks', location: 'India', youtubeId: 'hHW1oY26kxQ', thumb: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=60' },
      { id: 'mv3', title: 'Rocky Mountains', location: 'Canada', youtubeId: 'aqz-KE-bpKQ', thumb: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&q=60' },
      { id: 'mv4', title: 'Norwegian Fjords', location: 'Norway', youtubeId: 'M7lc1UVf-VE', thumb: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=60' },
    ],
  },
  {
    id: 'snow',
    label: 'Snow',
    emoji: '❄️',
    color: '#93C5FD',
    defaultMusic: 'm4',
    videos: [
      { id: 'sv1', title: 'Snowfall in Forest', location: 'Finland', youtubeId: 'bCPMOSHBtIw', thumb: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=400&q=60' },
      { id: 'sv2', title: 'Snowy Village', location: 'Austria', youtubeId: 'q76bMs-NwRk', thumb: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=400&q=60' },
      { id: 'sv3', title: 'Winter Blizzard', location: 'Iceland', youtubeId: 'nDq6TstdEi8', thumb: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=400&q=60' },
      { id: 'sv4', title: 'Snowstorm Drive', location: 'Canada', youtubeId: 'EkKqqCiRbDk', thumb: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=400&q=60' },
    ],
  },
  {
    id: 'rain',
    label: 'Rain',
    emoji: '🌧️',
    color: '#64748B',
    defaultMusic: 'm7',
    videos: [
      { id: 'rv1', title: 'Rain on Window', location: 'UK', youtubeId: 'mPZkdNFkNps', thumb: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&q=60' },
      { id: 'rv2', title: 'Thunderstorm', location: 'USA', youtubeId: 'yIQd2Ya0Ziw', thumb: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=60' },
      { id: 'rv3', title: 'Monsoon Forest', location: 'India', youtubeId: 'V1bFr2SWP1I', thumb: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=60' },
      { id: 'rv4', title: 'Rainy Night City', location: 'Japan', youtubeId: 'Dx5qFachd3A', thumb: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=60' },
    ],
  },
  {
    id: 'nature',
    label: 'Nature',
    emoji: '🌿',
    color: '#10B981',
    defaultMusic: 'm3',
    videos: [
      { id: 'nv1', title: 'Forest Stream', location: 'New Zealand', youtubeId: 'xNN7iTA57jM', thumb: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=60' },
      { id: 'nv2', title: 'Green Valley', location: 'Ireland', youtubeId: 'eKFTSSKCzWA', thumb: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&q=60' },
      { id: 'nv3', title: 'Cherry Blossoms', location: 'Japan', youtubeId: 'Ph-CA_tu5KA', thumb: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&q=60' },
      { id: 'nv4', title: 'Bali Rice Terraces', location: 'Indonesia', youtubeId: 'ZOZOLd0MGZE', thumb: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=60' },
    ],
  },
  {
    id: 'beach',
    label: 'Beach',
    emoji: '🏖️',
    color: '#F97316',
    defaultMusic: 'm6',
    videos: [
      { id: 'bv1', title: 'Ocean Waves', location: 'Maldives', youtubeId: 'bn9F19Hi1Lk', thumb: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=60' },
      { id: 'bv2', title: 'Santorini Sunset', location: 'Greece', youtubeId: 'kAbej_QFpzI', thumb: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=60' },
      { id: 'bv3', title: 'Tropical Beach', location: 'Bali', youtubeId: 'l7u6xxPMkgQ', thumb: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=60' },
      { id: 'bv4', title: 'Goa Beach', location: 'India', youtubeId: 'NA2RFAiDqAo', thumb: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=60' },
    ],
  },
  {
    id: 'city',
    label: 'City',
    emoji: '🏙️',
    color: '#EAB308',
    defaultMusic: 'm8',
    videos: [
      { id: 'cv1', title: 'Tokyo Shibuya', location: 'Japan', youtubeId: 'gXfMKrrDyXg', thumb: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=60' },
      { id: 'cv2', title: 'NYC Times Square', location: 'USA', youtubeId: 'r0NNEMqFxwU', thumb: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=60' },
      { id: 'cv3', title: 'Paris Night Drive', location: 'France', youtubeId: 'hHW1oY26kxQ', thumb: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=60' },
      { id: 'cv4', title: 'Mumbai Marine Drive', location: 'India', youtubeId: 'aqz-KE-bpKQ', thumb: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&q=60' },
    ],
  },
  {
    id: 'forest',
    label: 'Forest',
    emoji: '🌲',
    color: '#16A34A',
    defaultMusic: 'm3',
    videos: [
      { id: 'fv1', title: 'Deep Forest', location: 'Germany', youtubeId: 'eKFTSSKCzWA', thumb: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=60' },
      { id: 'fv2', title: 'Redwood Forest', location: 'USA', youtubeId: 'xNN7iTA57jM', thumb: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&q=60' },
      { id: 'fv3', title: 'Bamboo Forest', location: 'Japan', youtubeId: 'M7lc1UVf-VE', thumb: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=60' },
      { id: 'fv4', title: 'Scottish Highlands', location: 'Scotland', youtubeId: 'nDq6TstdEi8', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=60' },
    ],
  },
  {
    id: 'desert',
    label: 'Desert',
    emoji: '🏜️',
    color: '#D97706',
    defaultMusic: 'm5',
    videos: [
      { id: 'dv1', title: 'Sahara Dunes', location: 'Morocco', youtubeId: 'S_MOd40zlYU', thumb: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=60' },
      { id: 'dv2', title: 'Rajasthan Dunes', location: 'India', youtubeId: 'EkKqqCiRbDk', thumb: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=60' },
      { id: 'dv3', title: 'Arizona Desert', location: 'USA', youtubeId: 'q76bMs-NwRk', thumb: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=60' },
      { id: 'dv4', title: 'Dubai Desert', location: 'UAE', youtubeId: 'bCPMOSHBtIw', thumb: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=400&q=60' },
    ],
  },
  {
    id: 'night',
    label: 'Night Sky',
    emoji: '🌌',
    color: '#7C3AED',
    defaultMusic: 'm5',
    videos: [
      { id: 'nkv1', title: 'Northern Lights', location: 'Iceland', youtubeId: 'jgpJVI3tDbY', thumb: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=60' },
      { id: 'nkv2', title: 'Milky Way', location: 'New Zealand', youtubeId: 'yIQd2Ya0Ziw', thumb: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&q=60' },
      { id: 'nkv3', title: 'Starry Sky Ladakh', location: 'India', youtubeId: 'Ph-CA_tu5KA', thumb: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=60' },
      { id: 'nkv4', title: 'Tokyo Neon Night', location: 'Japan', youtubeId: 'gXfMKrrDyXg', thumb: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=60' },
    ],
  },
]

// Keep VIBE_LOCATIONS for dashboard preview
export const VIBE_LOCATIONS = VIBE_SCENES.flatMap(s => s.videos.slice(0, 1).map(v => ({
  id: s.id, name: v.title, country: v.location, emoji: s.emoji,
  mood: s.id === 'mountain' || s.id === 'snow' || s.id === 'forest' ? 'Focus' : s.id === 'beach' || s.id === 'rain' || s.id === 'nature' ? 'Relax' : 'Explore',
  youtubeId: v.youtubeId, color: s.color, description: v.title, ambience: s.label, defaultMusic: s.defaultMusic, tags: [s.label],
})))

