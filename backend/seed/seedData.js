const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const CollegeInfo = require('../models/CollegeInfo');
const Course = require('../models/Course');
const Admission = require('../models/Admission');
const Fee = require('../models/Fee');
const Facility = require('../models/Facility');
const Placement = require('../models/Placement');
const FAQ = require('../models/FAQ');

const collegeInfoData = {
  collegeName: 'Easwari Engineering College',
  description:
    'Easwari Engineering College is a prominent autonomous engineering institution affiliated to Anna University, Chennai and approved by AICTE. The college provides quality technical and management education with modern laboratories, dedicated faculty, and student-focused development.',
  address: 'Bharathi Salai, Ramapuram, Chennai - 600089, Tamil Nadu, India',
  phone: '+91 44 4392 3041 / +91 44 4392 3042',
  email: 'admissions@eec.srmrmp.edu.in',
  website: 'https://srmeaswari.ac.in',
  establishedYear: 1996,
  affiliation: 'Autonomous Institution, Affiliated to Anna University, Chennai & Approved by AICTE',
  accreditation: 'Autonomous Institution',
  campusTimings: 'Monday to Saturday: 8:30 AM to 4:30 PM (Administrative & Admissions Office: 9:00 AM to 5:00 PM)',
};

const coursesData = [
  {
    courseName: 'B.Tech in Artificial Intelligence & Data Science (AI & DS)',
    department: 'Department of Artificial Intelligence & Data Science',
    degree: 'B.Tech',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with Physics, Chemistry, and Mathematics. Admission via TNEA single window counselling or designated college quota.',
    description: 'Comprehensive curriculum covering Machine Learning, Deep Learning, Big Data Analytics, NLP, and intelligent software systems.',
    intakeSeats: 120,
  },
  {
    courseName: 'B.E. in Computer Science & Engineering (CSE)',
    department: 'Department of Computer Science & Engineering',
    degree: 'B.E.',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with Physics, Chemistry, and Mathematics with minimum eligibility percentage as prescribed by Anna University.',
    description: 'Foundations of computing, data structures, algorithms, cloud computing, cybersecurity, and full-stack software development.',
    intakeSeats: 180,
  },
  {
    courseName: 'B.E. in Electronics & Communication Engineering (ECE)',
    department: 'Department of Electronics & Communication',
    degree: 'B.E.',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with Physics, Chemistry, and Mathematics as per Anna University admission regulations.',
    description: 'VLSI design, embedded systems, signal processing, IoT, robotics, and modern wireless communication technologies.',
    intakeSeats: 120,
  },
  {
    courseName: 'B.E. in Mechanical Engineering',
    department: 'Department of Mechanical Engineering',
    degree: 'B.E.',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 with Physics, Chemistry, and Mathematics as per state norms.',
    description: 'Core mechanical engineering principles, CAD/CAM/CAE design, thermodynamics, robotics, and automation.',
    intakeSeats: 60,
  },
  {
    courseName: 'M.E. in Computer Science & Engineering',
    department: 'Department of Computer Science & Engineering',
    degree: 'M.E.',
    duration: '2 Years (4 Semesters)',
    eligibility: 'B.E./B.Tech in CSE/IT or equivalent degree. TANCET / GATE score as applicable.',
    description: 'Advanced postgraduate engineering program focusing on distributed systems, AI research, and high-performance computing.',
    intakeSeats: 18,
  },
  {
    courseName: 'Master of Business Administration (MBA)',
    department: 'Department of Management Studies',
    degree: 'MBA',
    duration: '2 Years (4 Semesters)',
    eligibility: 'Recognized Bachelor degree in any discipline with minimum 50% marks. TANCET / MAT / CAT score as applicable.',
    description: 'Specializations in Finance, Marketing, Human Resources, Systems, and Operations Management.',
    intakeSeats: 60,
  },
];

const admissionData = {
  admissionProcess: [
    'Step 1: Apply through TNEA (Tamil Nadu Engineering Admissions) single-window counselling or through the college admissions office.',
    'Step 2: Submit required academic transcripts and identity documentation for verification.',
    'Step 3: Verification of certificates and eligibility checking according to Anna University norms.',
    'Step 4: Seat allotment confirmation in the selected branch based on merit rank and choice filling.',
    'Step 5: Completion of admission formalities and payment of approved tuition and college fees.',
  ],
  eligibility: 'Undergraduate (B.E./B.Tech): Pass in 10+2 / HSC examination with Mathematics, Physics, and Chemistry. Postgraduate (M.E./MBA): Recognized Bachelor degree with required qualifying marks as per Anna University regulations.',
  requiredDocuments: [
    '10th and 12th standard mark sheets & certificates',
    'Transfer Certificate (TC) & Conduct Certificate',
    'TNEA Allotment Order / Qualifying Entrance Score Card',
    'Community Certificate (if applicable for reservation benefits)',
    'Nativity / Migration Certificate (if applicable)',
    'Government issued photo ID proof (Aadhaar Card)',
    'Passport size photographs',
  ],
  applicationMethod: 'Online through the official admissions portal (https://srmeaswari.ac.in) or directly in person at the Admissions Office, Easwari Engineering College, Ramapuram campus.',
  importantInformation: 'For the latest admission schedule, cutoff ranks, and seat availability, please contact the college admissions office or visit the official website.',
  applicationPortalUrl: 'https://srmeaswari.ac.in',
  helplinePhone: '+91 44 4392 3041 / +91 44 4392 3042',
  helplineEmail: 'admissions@eec.srmrmp.edu.in',
};

const feesData = [
  {
    courseName: 'B.Tech in Artificial Intelligence & Data Science (AI & DS)',
    tuitionFee: 'As prescribed by the state fee regulatory committee / government guidelines',
    otherFees: 'Exam, laboratory, and library fees as applicable per semester',
    notes: 'Please contact the college accounts and admission office for the detailed, current fee structure and payment schedules.',
    installmentOptions: 'Semester-wise payment options available as per college norms.',
  },
  {
    courseName: 'B.E. in Computer Science & Engineering (CSE)',
    tuitionFee: 'As prescribed by the state fee regulatory committee / government guidelines',
    otherFees: 'Exam, laboratory, and library fees as applicable per semester',
    notes: 'Please contact the college accounts office for the latest fee schedule.',
    installmentOptions: 'Semester-wise payment options available.',
  },
  {
    courseName: 'B.E. in Electronics & Communication Engineering (ECE)',
    tuitionFee: 'As prescribed by the state fee regulatory committee / government guidelines',
    otherFees: 'Exam, laboratory, and library fees as applicable per semester',
    notes: 'Please contact the college accounts office for official fee details.',
    installmentOptions: 'Semester-wise payment options available.',
  },
  {
    courseName: 'B.E. in Mechanical Engineering',
    tuitionFee: 'As prescribed by the state fee regulatory committee / government guidelines',
    otherFees: 'Exam, laboratory, and workshop fees as applicable per semester',
    notes: 'Please contact the college accounts office for official fee details.',
    installmentOptions: 'Semester-wise payment options available.',
  },
  {
    courseName: 'M.E. in Computer Science & Engineering',
    tuitionFee: 'As prescribed by state government / university fee norms',
    otherFees: 'Research laboratory and thesis evaluation fees as applicable',
    notes: 'Please contact the college office for postgraduate fee schedules.',
    installmentOptions: 'Payable per semester.',
  },
  {
    courseName: 'Master of Business Administration (MBA)',
    tuitionFee: 'As prescribed by government / university fee norms',
    otherFees: 'Academic and administrative fees as applicable',
    notes: 'Please contact the college accounts office for official MBA fee details.',
    installmentOptions: 'Payable per semester.',
  },
];

const facilitiesData = [
  {
    facilityName: 'Central Library',
    description: 'Comprehensive library equipped with thousands of academic textbooks, reference titles, national and international journals, and digital library access.',
    availability: 'Monday to Saturday: 8:00 AM to 7:00 PM',
    category: 'Academic',
  },
  {
    facilityName: 'Computer & AI Laboratories',
    description: 'Well-equipped computing laboratories with modern desktop computers, high-speed campus internet, specialized software, and development tools.',
    availability: '8:30 AM to 5:00 PM on all working days',
    category: 'Academic',
  },
  {
    facilityName: 'Student Hostels (Boys & Girls)',
    description: 'Safe and secure residential hostel facilities located on campus with furnished rooms, dining facilities, Wi-Fi access, and round-the-clock security.',
    availability: 'Resident scholars 24/7 with warden supervision',
    category: 'Hostel',
  },
  {
    facilityName: 'Sports Facilities & Gymnasium',
    description: 'Dedicated sports grounds for outdoor sports including cricket, football, basketball, and volleyball, plus indoor sports facilities and gym equipment.',
    availability: 'Morning and evening hours on working days',
    category: 'Sports',
  },
  {
    facilityName: 'Campus Cafeteria & Canteen',
    description: 'Hygienic campus cafeteria serving healthy breakfast, lunch, and refreshments for students, faculty, and campus visitors.',
    availability: 'Daily: 8:00 AM to 6:00 PM',
    category: 'Infrastructure',
  },
  {
    facilityName: 'Campus Bus Transportation',
    description: 'Extensive fleet of college buses operating along key routes across Chennai and suburban localities for student and staff commute.',
    availability: 'Morning arrival and evening departure scheduled trips',
    category: 'Transport',
  },
];

const placementData = {
  description:
    'The Department of Training & Placement at Easwari Engineering College actively engages with top IT, core engineering, and consulting companies for campus placement drives and internships.',
  companies: [
    'TCS',
    'Infosys',
    'Wipro',
    'Cognizant',
    'Accenture',
    'Zoho Corporation',
    'Amazon',
    'Cisco Systems',
    'Kaar Technologies',
    'Virtusa',
  ],
  training:
    'Pre-placement training including aptitude skills, programming bootcamps, technical problem solving, group discussions, and mock interviews.',
  placementProcess: [
    '1. Pre-Placement Talks (PPT) and job description briefing by visiting companies.',
    '2. Online Aptitude and Technical Coding Assessments.',
    '3. Group Discussions / Technical Case Interviews.',
    '4. Core Technical and HR Interviews.',
    '5. Formal Offer Letters issued to selected students.',
  ],
  highestPackage: 'Please contact the college placement cell for the latest verified placement statistics.',
  averagePackage: 'Please contact the college placement cell for the latest verified placement statistics.',
  placementRate: 'Please contact the college placement cell for the latest verified placement records.',
};

const faqsData = [
  {
    question: 'What are the campus timings and office hours?',
    answer: 'Classroom sessions and laboratory hours run from 8:30 AM to 4:30 PM, Monday through Saturday. The Administrative, Admissions, and Fee counters operate between 9:00 AM and 5:00 PM.',
    category: 'Timings',
    keywords: ['timings', 'time', 'hours', 'office hours', 'schedule', 'open', 'close', 'working hours'],
  },
  {
    question: 'Is hostel accommodation available for students?',
    answer: 'Yes, Easwari Engineering College provides separate hostel facilities for male and female students with furnished rooms, mess dining, Wi-Fi, and 24/7 security. Please contact the hostel office for room allotment and current fee details.',
    category: 'Hostel',
    keywords: ['hostel', 'accommodation', 'stay', 'room', 'hostels', 'mess', 'food', 'boarding', 'girls hostel', 'boys hostel'],
  },
  {
    question: 'What is the hostel fee structure?',
    answer: 'Hostel fees depend on room type and amenities. Please contact the college hostel warden or administrative office for the latest official hostel fee schedule.',
    category: 'Hostel',
    keywords: ['hostel fee', 'hostel cost', 'hostel rent', 'mess fee', 'room fee'],
  },
  {
    question: 'What scholarships and financial assistance are available?',
    answer: 'Students can avail government scholarships for BC/MBC/SC/ST categories, first-graduate tuition concessions, and state/national welfare schemes. Please contact the scholarship section in the administrative office for application guidance.',
    category: 'Scholarships',
    keywords: ['scholarship', 'scholarships', 'financial aid', 'fee waiver', 'concession', 'discount', 'merit', 'first graduate'],
  },
  {
    question: 'What is the minimum attendance requirement?',
    answer: 'As per autonomous and university academic regulations, students are required to maintain a minimum of 75% attendance in each subject to be eligible to appear for the semester end examinations.',
    category: 'Attendance',
    keywords: ['attendance', 'percentage', 'present', 'absent', 'shortage', 'minimum attendance', 'leave'],
  },
  {
    question: 'How does the examination and grading system work?',
    answer: 'Academic evaluation comprises Continuous Internal Assessments (CIA) and End Semester Examinations (ESE) as per autonomous university curriculum and credit regulations.',
    category: 'Examinations',
    keywords: ['exam', 'exams', 'examination', 'semester', 'grade', 'grading', 'cgpa', 'sgpa', 'results', 'marks'],
  },
  {
    question: 'What clubs, sports, and extracurricular activities are available?',
    answer: 'Easwari Engineering College hosts active student chapters and clubs including technical societies, coding clubs, NSS, YRC, Rotaract, cultural teams, and annual college symposiums and fests.',
    category: 'Clubs',
    keywords: ['club', 'clubs', 'activities', 'extracurricular', 'sports', 'fest', 'cultural', 'hackathon', 'events'],
  },
  {
    question: 'Does the college provide campus bus transportation?',
    answer: 'Yes, the college operates buses on multiple routes covering Chennai and nearby suburban localities. Please contact the college transport desk for route details and transport fees.',
    category: 'Transportation',
    keywords: ['transport', 'transportation', 'bus', 'buses', 'route', 'travel', 'commute', 'pickup'],
  },
  {
    question: 'What internship opportunities are provided to students?',
    answer: 'The Training and Placement cell guides students in securing industrial internships during semester breaks with leading software and core engineering firms.',
    category: 'Internships',
    keywords: ['internship', 'internships', 'intern', 'stipend', 'summer training', 'industry training'],
  },
  {
    question: 'What is the faculty information at the college?',
    answer: 'Easwari Engineering College has dedicated and experienced faculty members across all engineering and management departments with doctoral and master degrees.',
    category: 'Faculty',
    keywords: ['faculty', 'professors', 'teachers', 'lecturers', 'staff', 'hod'],
  },
  {
    question: 'Where is the college located and how can I reach there?',
    answer: 'Easwari Engineering College is located at Bharathi Salai, Ramapuram, Chennai - 600089, Tamil Nadu. It is easily accessible via Guindy, Porur, and Koyambedu through public and private transport.',
    category: 'Location',
    keywords: ['location', 'address', 'where', 'reach', 'directions', 'map', 'distance', 'city', 'chennai', 'ramapuram'],
  },
  {
    question: 'How can I contact the college administration or admissions office?',
    answer: 'You can contact the college by phone at +91 44 4392 3041 / 4392 3042, by email at admissions@eec.srmrmp.edu.in, or visit the campus at Bharathi Salai, Ramapuram, Chennai.',
    category: 'Contact',
    keywords: ['contact', 'phone', 'call', 'mobile', 'email', 'number', 'helpline', 'reach', 'enquiry'],
  },
  {
    question: 'What departments are available at the college?',
    answer: 'Departments include Artificial Intelligence & Data Science, Computer Science & Engineering, Electronics & Communication Engineering, Mechanical Engineering, and Management Studies (MBA).',
    category: 'Departments',
    keywords: ['department', 'departments', 'branches', 'dept'],
  },
  {
    question: 'What is the procedure for management quota or direct admission?',
    answer: 'For enquiries regarding institutional / management quota seats, please visit the college admissions office in person or reach out through the official admissions helpline.',
    category: 'Admissions',
    keywords: ['management quota', 'direct admission', 'seats', 'spot admission'],
  },
];

async function seedDatabase(exitOnComplete = true) {
  try {
    console.log('🌱 Starting MongoDB database seeding for Easwari Engineering College...');

    // Clear existing collections
    await CollegeInfo.deleteMany({});
    await Course.deleteMany({});
    await Admission.deleteMany({});
    await Fee.deleteMany({});
    await Facility.deleteMany({});
    await Placement.deleteMany({});
    await FAQ.deleteMany({});

    // Insert fresh realistic data
    await CollegeInfo.create(collegeInfoData);
    await Course.insertMany(coursesData);
    await Admission.create(admissionData);
    await Fee.insertMany(feesData);
    await Facility.insertMany(facilitiesData);
    await Placement.create(placementData);
    await FAQ.insertMany(faqsData);

    console.log('✅ Database seeded successfully with:');
    console.log(`   - 1 College Info profile (Easwari Engineering College)`);
    console.log(`   - ${coursesData.length} Courses`);
    console.log(`   - 1 Detailed Admission procedure & guidelines`);
    console.log(`   - ${feesData.length} Course Fee structures`);
    console.log(`   - ${facilitiesData.length} Campus Facilities`);
    console.log(`   - 1 Placement record overview`);
    console.log(`   - ${faqsData.length} FAQ answers`);

    if (exitOnComplete) {
      process.exit(0);
    }
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    if (exitOnComplete) {
      process.exit(1);
    }
    throw err;
  }
}

// Allow running directly via "node seed/seedData.js"
if (require.main === module) {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college_chatbot';
  mongoose
    .connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
      console.log(`Connected to MongoDB at ${uri} for seeding.`);
      return seedDatabase(true);
    })
    .catch((err) => {
      console.error(`Failed to connect to MongoDB at ${uri}:`, err.message);
      console.log('If you have MongoDB running locally, ensure the service is active or configure MONGO_URI in .env.');
      process.exit(1);
    });
}

module.exports = { seedDatabase };
