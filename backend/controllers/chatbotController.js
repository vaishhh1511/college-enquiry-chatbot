const CollegeInfo = require('../models/CollegeInfo');
const Course = require('../models/Course');
const Admission = require('../models/Admission');
const Fee = require('../models/Fee');
const Facility = require('../models/Facility');
const Placement = require('../models/Placement');
const FAQ = require('../models/FAQ');

/**
 * Clean and normalize user question string
 */
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Checks if user text matches any of the given keywords
 */
const hasAnyKeyword = (text, keywords) => {
  return keywords.some((kw) => {
    // Check for exact word or phrase boundary match
    const regex = new RegExp(`\\b${kw}\\b`, 'i');
    return regex.test(text);
  });
};

/**
 * POST /api/chat
 * Main AI Chatbot endpoint for college enquiries
 */
const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        reply: 'Please type a valid question about our college.',
        category: 'validation_error',
      });
    }

    const cleanInput = normalizeText(message);

    // ==========================================
    // 1. GREETINGS & PLEASANTRIES
    // ==========================================
    if (hasAnyKeyword(cleanInput, ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'])) {
      return res.json({
        reply:
          'Hello! 👋 Welcome to the Easwari Engineering College AI Enquiry Assistant. I can help you with admissions, courses, departments, fees, placements, facilities, hostel information, contact details and other college-related enquiries. How can I help you?',
        category: 'greeting',
        suggestions: [
          'What courses are available?',
          'How can I apply for admission?',
          'What are the eligibility requirements?',
          'What is the fee structure?',
          'What departments are available?',
          'Is hostel available?',
          'What placement information is available?',
          'How can I contact the college?',
        ],
      });
    }

    if (hasAnyKeyword(cleanInput, ['thank', 'thanks', 'thank you', 'appreciate', 'awesome', 'great', 'bye', 'goodbye'])) {
      return res.json({
        reply:
          'You are very welcome! 😊 Feel free to ask whenever you need any more information about Easwari Engineering College. Wishing you all the very best for your academic journey!',
        category: 'gratitude',
        suggestions: ['What courses are available?', 'How can I contact the college?'],
      });
    }

    // ==========================================
    // 2. COLLEGE INTRODUCTION / ABOUT
    // ==========================================
    if (
      hasAnyKeyword(cleanInput, [
        'about college',
        'college introduction',
        'who are you',
        'tell me about college',
        'about easwari',
        'easwari engineering college',
        'overview',
        'history',
        'established',
        'accreditation',
        'autonomous',
      ])
    ) {
      const college = await CollegeInfo.findOne();
      if (college) {
        return res.json({
          reply: `🏫 **${college.collegeName}** was established in ${college.establishedYear}.\n\n${college.description}\n\n• **Accreditation:** ${college.accreditation}\n• **Affiliation:** ${college.affiliation}\n• **Campus Location:** ${college.address}`,
          category: 'college_info',
          suggestions: ['What courses are available?', 'What are the placement statistics?', 'How to apply for admission?'],
        });
      }
    }

    // ==========================================
    // 3. COURSES OFFERED & DEPARTMENTS
    // ==========================================
    if (
      hasAnyKeyword(cleanInput, [
        'course',
        'courses',
        'programs',
        'program',
        'degrees',
        'degree',
        'branch',
        'branches',
        'specialization',
        'study',
        'departments',
        'department',
        'btech',
        'mtech',
        'mba',
      ])
    ) {
      const courses = await Course.find();
      if (courses && courses.length > 0) {
        const formattedCourses = courses
          .map(
            (c, idx) =>
              `**${idx + 1}. ${c.courseName}**\n   • Department: ${c.department}\n   • Degree: ${c.degree} | Duration: ${c.duration} | Seats: ${c.intakeSeats}\n   • Eligibility: ${c.eligibility}`
          )
          .join('\n\n');

        return res.json({
          reply: `🎓 Our college offers prestigious undergraduate and postgraduate programs:\n\n${formattedCourses}\n\nWould you like more details on admission criteria or fees for any specific course?`,
          category: 'courses',
          suggestions: [
            'How can I apply for admission?',
            'What is the fee structure?',
            'What are the eligibility requirements?',
          ],
        });
      }
    }

    // ==========================================
    // 4. ELIGIBILITY CRITERIA
    // ==========================================
    if (hasAnyKeyword(cleanInput, ['eligibility', 'eligible', 'criteria', 'cutoff', 'cut off', 'minimum marks', 'percentage required'])) {
      const admission = await Admission.findOne();
      const courses = await Course.find().select('courseName eligibility');
      let courseEligibility = '';
      if (courses && courses.length > 0) {
        courseEligibility = courses.map((c) => `• **${c.courseName}:** ${c.eligibility}`).join('\n');
      }

      return res.json({
        reply: `📋 **Eligibility Criteria:**\n\n${admission ? admission.eligibility : ''}\n\n**Course-specific requirements:**\n${courseEligibility}\n\nCandidates must also submit valid scores from relevant state/national entrance examinations (JEE Main / State CET / GATE / CAT).`,
        category: 'eligibility',
        suggestions: ['How can I apply for admission?', 'What documents are required for admission?', 'What is the fee structure?'],
      });
    }

    // ==========================================
    // 5. ADMISSION PROCESS & HOW TO APPLY
    // ==========================================
    if (
      hasAnyKeyword(cleanInput, [
        'admission',
        'admissions',
        'apply',
        'application',
        'admission process',
        'admission procedure',
        'counselling',
        'registration',
        'direct admission',
        'management quota',
        'how to apply',
      ])
    ) {
      const admission = await Admission.findOne();
      if (admission) {
        const steps = admission.admissionProcess.join('\n');
        const docs = admission.requiredDocuments.map((d) => `  - ${d}`).join('\n');

        return res.json({
          reply: `📝 **Admission Process & Guidelines:**\n\n${steps}\n\n📄 **Required Documents:**\n${docs}\n\n💡 **Application Method:** ${admission.applicationMethod}\n• Portal: [Online Admission Portal](${admission.applicationPortalUrl})\n• Helpline: ${admission.helplinePhone} | ${admission.helplineEmail}\n\n${admission.importantInformation}`,
          category: 'admissions',
          suggestions: ['What are the eligibility requirements?', 'What is the fee structure?', 'What scholarships are available?'],
        });
      }
    }

    // ==========================================
    // 6. FEES & PAYMENT STRUCTURE
    // ==========================================
    if (
      hasAnyKeyword(cleanInput, [
        'fee',
        'fees',
        'tuition',
        'cost',
        'charges',
        'expense',
        'expenses',
        'payment',
        'installment',
        'fee structure',
      ])
    ) {
      const fees = await Fee.find();
      if (fees && fees.length > 0) {
        const feeList = fees
          .map(
            (f) =>
              `• **${f.courseName}:**\n  - Tuition Fee: ${f.tuitionFee}\n  - Other Fees: ${f.otherFees}\n  - Notes: ${f.notes}`
          )
          .join('\n\n');

        return res.json({
          reply: `💰 **Annual Fee Structure:**\n\n${feeList}\n\n💳 **Payment Terms:** Tuition fee can be paid in semester installments or through approved educational bank loans. Merit scholarships of up to 50% are awarded to top performers.`,
          category: 'fees',
          suggestions: [
            'What scholarships are available?',
            'What is the hostel fee structure?',
            'How can I apply for admission?',
          ],
        });
      }
    }

    // ==========================================
    // 7. SCHOLARSHIPS & FINANCIAL AID
    // ==========================================
    if (
      hasAnyKeyword(cleanInput, [
        'scholarship',
        'scholarships',
        'financial aid',
        'fee waiver',
        'concession',
        'merit scholarship',
        'freeship',
        'stipend',
      ])
    ) {
      const scholarshipFaq = await FAQ.findOne({ category: 'Scholarships' });
      return res.json({
        reply: `🎓 **Scholarships & Financial Assistance:**\n\n${
          scholarshipFaq ? scholarshipFaq.answer : 'Merit-based and need-based scholarships are available.'
        }\n\n1. **Merit Scholarship:** Up to 50% tuition waiver for students ranking in top 1000 in CET / 95%+ in 10+2.\n2. **Sports Quota Scholarship:** 25% to 75% fee concession for national/state level athletes.\n3. **M.Tech GATE Stipend:** ₹12,400 per month as per AICTE norms.\n4. **Government Schemes:** Full support for State Post-Matric & National e-Kalyan scholarships.`,
        category: 'scholarships',
        suggestions: ['What is the fee structure?', 'How can I apply for admission?', 'What courses are available?'],
      });
    }

    // ==========================================
    // 8. PLACEMENTS & RECRUITERS
    // ==========================================
    if (
      hasAnyKeyword(cleanInput, [
        'placement',
        'placements',
        'job',
        'jobs',
        'package',
        'salary',
        'highest package',
        'average package',
        'recruiter',
        'recruiters',
        'company',
        'companies',
        'career',
        'campus placement',
      ])
    ) {
      const placement = await Placement.findOne();
      if (placement) {
        const topCompanies = placement.companies.slice(0, 10).join(', ');
        const processSteps = placement.placementProcess.join('\n');

        return res.json({
          reply: `💼 **Placement Highlights & Career Outcomes:**\n\n${placement.description}\n\n📊 **Placement Key Stats:**\n• **Highest Package:** ${placement.highestPackage}\n• **Average Package:** ${placement.averagePackage}\n• **Placement Success Rate:** ${placement.placementRate}\n\n🏢 **Top Recruiting Partners:**\n${topCompanies} and 100+ more.\n\n🛠️ **Pre-Placement Training:**\n${placement.training}\n\n📑 **Selection Process:**\n${processSteps}`,
          category: 'placements',
          suggestions: [
            'What internship opportunities are provided?',
            'What courses are available?',
            'What is the fee structure?',
          ],
        });
      }
    }

    // ==========================================
    // 9. HOSTEL & ACCOMMODATION
    // ==========================================
    if (
      hasAnyKeyword(cleanInput, [
        'hostel',
        'hostels',
        'accommodation',
        'stay',
        'boarding',
        'mess',
        'hostel fee',
        'room',
        'rooms',
        'dormitory',
        'curfew',
      ])
    ) {
      const hostelFacility = await Facility.findOne({ facilityName: { $regex: /hostel/i } });
      const hostelFaq = await FAQ.findOne({ keywords: 'hostel fee' });

      return res.json({
        reply: `🏠 **Hostel & Residential Accommodation:**\n\n${
          hostelFacility ? hostelFacility.description : 'Separate hostel facilities for boys and girls.'
        }\n\n• **Availability:** ${hostelFacility ? hostelFacility.availability : '24/7 with biometric security'}\n• **Fee Structure:** ${
          hostelFaq ? hostelFaq.answer : '₹75,000 to ₹95,000 per academic year including meals.'
        }\n• **Amenities:** High-speed Wi-Fi, 24/7 power backup, laundry, RO purified water, recreational lounge, indoor sports, and 24/7 warden supervision.`,
        category: 'hostel',
        suggestions: ['What is the college fee structure?', 'What are the college facilities?', 'How can I contact the college?'],
      });
    }

    // ==========================================
    // 10. CAMPUS TIMINGS & WORKING HOURS
    // ==========================================
    if (hasAnyKeyword(cleanInput, ['timing', 'timings', 'time', 'hours', 'schedule', 'working hours', 'campus timings', 'office hours', 'opening hours'])) {
      const college = await CollegeInfo.findOne();
      const timingFaq = await FAQ.findOne({ category: 'Timings' });

      return res.json({
        reply: `⏰ **Campus & Office Timings:**\n\n• **Academic Classes & Labs:** Monday to Saturday: 8:30 AM to 4:30 PM\n• **Administrative & Admissions Office:** Monday to Saturday: 9:00 AM to 5:00 PM\n• **Central Library:** 8:00 AM to 10:00 PM\n• **Campus Curfew (Hostelers):** 9:00 PM\n\n${timingFaq ? timingFaq.answer : ''}`,
        category: 'timings',
        suggestions: ['Where is the college located?', 'How can I contact the college?', 'What courses are available?'],
      });
    }

    // ==========================================
    // 11. FACILITIES, CAMPUS & INFRASTRUCTURE
    // ==========================================
    if (
      hasAnyKeyword(cleanInput, [
        'facility',
        'facilities',
        'infrastructure',
        'campus facilities',
        'amenities',
        'sports',
        'gym',
        'canteen',
        'cafeteria',
        'food court',
      ])
    ) {
      const facilities = await Facility.find();
      if (facilities && facilities.length > 0) {
        const facilityList = facilities
          .map((f) => `• **${f.facilityName}** (${f.category}):\n  ${f.description}\n  *Hours: ${f.availability}*`)
          .join('\n\n');

        return res.json({
          reply: `🏛️ **College Campus Facilities:**\n\n${facilityList}`,
          category: 'facilities',
          suggestions: ['Is hostel available?', 'Tell me about the central library', 'What are the campus timings?'],
        });
      }
    }

    // ==========================================
    // 12. LIBRARY & DIGITAL RESOURCES
    // ==========================================
    if (hasAnyKeyword(cleanInput, ['library', 'books', 'journal', 'journals', 'digital library', 'reading room'])) {
      const lib = await Facility.findOne({ facilityName: { $regex: /library/i } });
      return res.json({
        reply: `📚 **Central Digital Library:**\n\n${
          lib ? lib.description : 'Comprehensive multi-storey digital library.'
        }\n\n• **Timings:** ${lib ? lib.availability : 'Monday to Saturday: 8:00 AM - 10:00 PM'}\n• **Resources:** 65,000+ print volumes, national/international journals, subscription to IEEE Xplore, ScienceDirect, ACM, and 24/7 exam reading hall.`,
        category: 'library',
        suggestions: ['What other facilities are available?', 'What are the campus timings?'],
      });
    }

    // ==========================================
    // 13. LABORATORIES & COMPUTING
    // ==========================================
    if (hasAnyKeyword(cleanInput, ['lab', 'labs', 'laboratory', 'laboratories', 'computing', 'gpu', 'supercomputing', 'nvidia'])) {
      const lab = await Facility.findOne({ facilityName: { $regex: /laboratory|lab/i } });
      return res.json({
        reply: `🔬 **Laboratories & Computing Infrastructure:**\n\n${
          lab ? lab.description : 'State-of-the-art research laboratories.'
        }\n\n• **Equipment:** NVIDIA RTX high-performance GPUs, AI/Deep Learning cloud clusters, IoT testbeds, VLSI design tools, and CAD/CAM workstations.\n• **Hours:** ${lab ? lab.availability : '8:30 AM to 8:00 PM'}`,
        category: 'laboratories',
        suggestions: ['What courses are available?', 'What are the placement statistics?'],
      });
    }

    // ==========================================
    // 14. TRANSPORTATION & BUSES
    // ==========================================
    if (hasAnyKeyword(cleanInput, ['transport', 'transportation', 'bus', 'buses', 'route', 'routes', 'commute', 'pickup'])) {
      const transport = await Facility.findOne({ facilityName: { $regex: /transport|bus/i } });
      const busFaq = await FAQ.findOne({ category: 'Transportation' });

      return res.json({
        reply: `🚌 **Campus Transportation Services:**\n\n${
          busFaq ? busFaq.answer : transport ? transport.description : 'Fleet of GPS-enabled buses.'
        }\n\n• **Coverage:** 35+ routes connecting all metropolitan areas, suburban hubs, and major railway/metro stations.\n• **Safety:** Speed governors, CCTV cameras, female bus attendants, and mobile live tracking for parents.`,
        category: 'transportation',
        suggestions: ['Where is the college located?', 'What are the campus timings?', 'How can I contact the college?'],
      });
    }

    // ==========================================
    // 15. CONTACT INFORMATION & HELPLINES
    // ==========================================
    if (hasAnyKeyword(cleanInput, ['contact', 'phone', 'call', 'mobile', 'email', 'number', 'helpline', 'telephone', 'reach'])) {
      const college = await CollegeInfo.findOne();
      const admission = await Admission.findOne();

      return res.json({
        reply: `📞 **College Contact Information:**\n\n• **General Reception:** ${college ? college.phone : '+91 44 4392 3041 / 4392 3042'}\n• **Admissions Helpline:** ${admission ? admission.helplinePhone : '+91 44 4392 3041'}\n• **General Email:** ${college ? college.email : 'admissions@eec.srmrmp.edu.in'}\n• **Admissions Email:** ${admission ? admission.helplineEmail : 'admissions@eec.srmrmp.edu.in'}\n• **Official Website:** ${college ? college.website : 'https://srmeaswari.ac.in'}\n• **Campus Address:** ${college ? college.address : 'Bharathi Salai, Ramapuram, Chennai - 600089'}`,
        category: 'contact',
        suggestions: ['Where is the college located?', 'What are the campus timings?', 'How can I apply for admission?'],
      });
    }

    // ==========================================
    // 16. LOCATION & ADDRESS & DIRECTIONS
    // ==========================================
    if (hasAnyKeyword(cleanInput, ['location', 'address', 'where', 'reach', 'directions', 'map', 'city', 'situated'])) {
      const college = await CollegeInfo.findOne();
      const locationFaq = await FAQ.findOne({ category: 'Location' });

      return res.json({
        reply: `📍 **College Location & Directions:**\n\n• **Campus Address:** ${
          college ? college.address : 'Bharathi Salai, Ramapuram, Chennai - 600089, Tamil Nadu'
        }\n\n• **How to Reach:** ${
          locationFaq
            ? locationFaq.answer
            : 'Conveniently accessible from Guindy, Porur, and Koyambedu via bus routes, Chennai Metro, and suburban railway.'
        }\n\n• **Nearby Landmarks:** Located at Ramapuram, Chennai, easily accessible by college buses, public transport, and cabs.`,
        category: 'location',
        suggestions: ['Does the college provide campus bus transportation?', 'What are the campus timings?', 'How can I contact the college?'],
      });
    }

    // ==========================================
    // 17. CLUBS, EVENTS & ACTIVITIES
    // ==========================================
    if (hasAnyKeyword(cleanInput, ['club', 'clubs', 'event', 'events', 'fest', 'cultural', 'hackathon', 'extracurricular', 'activities', 'sports'])) {
      const clubFaq = await FAQ.findOne({ category: 'Clubs' });
      return res.json({
        reply: `🎉 **Student Clubs & Campus Life:**\n\n${
          clubFaq ? clubFaq.answer : 'Active technical clubs, cultural societies, sports teams, and social chapters.'
        }\n\n• **Technical Chapters:** Coding clubs, Robotics Club, IEEE/CSI/IETE student branches.\n• **Social & Welfare:** NSS, YRC, Rotaract Club, Literary & Debate Club.\n• **College Symposiums:** Annual departmental national symposiums, hackathons, and cultural fests.\n• **Sports:** Inter-collegiate sports tournaments, cricket, football, basketball, and athletic meets.`,
        category: 'clubs_events',
        suggestions: ['What facilities are available?', 'What courses are available?', 'What placement information is available?'],
      });
    }

    // ==========================================
    // 18. EXAMINATIONS & ATTENDANCE RULES
    // ==========================================
    if (hasAnyKeyword(cleanInput, ['exam', 'exams', 'examination', 'grading', 'cgpa', 'sgpa', 'semester', 'results', 'marks'])) {
      const examFaq = await FAQ.findOne({ category: 'Examinations' });
      return res.json({
        reply: `📝 **Examination & Grading System:**\n\n${
          examFaq
            ? examFaq.answer
            : 'Autonomous semester system with Continuous Internal Evaluation (CIE) and Semester End Examination (SEE).'
        }\n\n• **Evaluation Weightage:** 40% Continuous Internal Assessment + 60% Semester End Exams.\n• **Grading:** 10-point CGPA grading scale with transparent digital evaluation and revaluation options.`,
        category: 'examinations',
        suggestions: ['What is the minimum attendance requirement?', 'What courses are available?'],
      });
    }

    if (hasAnyKeyword(cleanInput, ['attendance', 'absent', 'shortage', 'minimum attendance', 'percentage required', 'medical leave'])) {
      const attendanceFaq = await FAQ.findOne({ category: 'Attendance' });
      return res.json({
        reply: `📊 **Attendance Requirements:**\n\n${
          attendanceFaq
            ? attendanceFaq.answer
            : 'Minimum 75% attendance is mandatory in each subject to appear for semester examinations.'
        }\n\n• Condonation of up to 10% is permissible strictly on approved medical grounds with valid hospital documentation.\n• Students below 65% are detained from the respective end-semester exam as per autonomous university regulations.`,
        category: 'attendance',
        suggestions: ['How does the examination and grading system work?', 'What are the campus timings?'],
      });
    }

    // ==========================================
    // 19. FACULTY & TEACHING STAFF
    // ==========================================
    if (hasAnyKeyword(cleanInput, ['faculty', 'professor', 'professors', 'teacher', 'teachers', 'lecturers', 'staff', 'hod'])) {
      const facultyFaq = await FAQ.findOne({ category: 'Faculty' });
      return res.json({
        reply: `👨‍🏫 **Faculty & Academic Mentors:**\n\n${
          facultyFaq
            ? facultyFaq.answer
            : 'Highly qualified faculty team with premier doctoral credentials.'
        }\n\n• Over 78% of professors hold Ph.D. degrees from prestigious IITs, NITs, and top global institutions.\n• Student-to-Faculty Ratio of 1:15 ensuring personalized academic mentoring and research supervision.\n• Over 120+ peer-reviewed patents and high-impact journal publications authored annually.`,
        category: 'faculty',
        suggestions: ['What courses are available?', 'What internship opportunities are provided?', 'What are the placement statistics?'],
      });
    }

    // ==========================================
    // 20. INTERNSHIP OPPORTUNITIES
    // ==========================================
    if (hasAnyKeyword(cleanInput, ['internship', 'internships', 'intern', 'stipend', 'summer training'])) {
      const internFaq = await FAQ.findOne({ category: 'Internships' });
      return res.json({
        reply: `💼 **Internship Opportunities:**\n\n${
          internFaq
            ? internFaq.answer
            : 'Dedicated internship support with top tech firms and research labs.'
        }\n\n• Mandatory industry summer internships after the 6th semester.\n• Final-year capstone full-semester corporate internships with monthly stipends up to ₹50,000.\n• Partnered with Intel, Bosch, TCS, Infosys, and leading high-growth startups.`,
        category: 'internships',
        suggestions: ['What are the placement statistics?', 'What courses are available?', 'How can I apply for admission?'],
      });
    }

    // ==========================================
    // 21. FALLBACK TO MONGO DB FAQ SEARCH
    // ==========================================
    // Try matching individual words from user input against FAQ keywords
    const inputWords = cleanInput.split(' ').filter((w) => w.length > 3);
    if (inputWords.length > 0) {
      const matchedFaq = await FAQ.findOne({
        keywords: { $in: inputWords },
      });

      if (matchedFaq) {
        return res.json({
          reply: `💡 **${matchedFaq.question}**\n\n${matchedFaq.answer}`,
          category: matchedFaq.category.toLowerCase(),
          suggestions: [
            'What courses are available?',
            'How can I apply for admission?',
            'What is the fee structure?',
            'What are the placement statistics?',
          ],
        });
      }
    }

    // ==========================================
    // 22. UNKNOWN QUESTION / GRACEFUL FALLBACK
    // ==========================================
    return res.json({
      reply:
        "I'm sorry, I couldn't understand your question. You can ask me about admissions, courses, fees, placements, facilities, hostel, scholarships, or contact information.",
      category: 'unknown',
      suggestions: [
        'What courses are available?',
        'How can I apply for admission?',
        'What is the fee structure?',
        'What placement opportunities are available?',
        'Is hostel available?',
        'How can I contact the college?',
      ],
    });
  } catch (error) {
    console.error('Chatbot Controller Error:', error);
    res.status(500).json({
      reply: 'Unable to connect to the chatbot database. Please check your connection and try again.',
      category: 'error',
    });
  }
};

module.exports = {
  handleChat,
};
