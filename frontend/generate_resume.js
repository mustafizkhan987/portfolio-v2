const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 50, size: 'A4' });

const outputPath = path.join(__dirname, 'public', 'resume.pdf');
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Fonts and Styling
doc.font('Helvetica-Bold').fontSize(24).text('Mohammed Mustafiz Khan', { align: 'center' });
doc.moveDown(0.5);

doc.font('Helvetica').fontSize(10).text(
  'Bangalore, Karnataka, India | +91 7483283798 | mustafizkhanmohammad39@gmail.com | linkedin.com/in/mohammed-mustafiz-khan-84bb6b350 | github.com/mustafizkhan987',
  { align: 'center' }
);
doc.moveDown(1);

// Section: Summary
doc.font('Helvetica-Bold').fontSize(14).text('SUMMARY');
doc.moveTo(50, doc.y + 2).lineTo(545, doc.y + 2).stroke();
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(10).text(
  'Motivated and ambitious B.Tech Computer Science Engineering (Artificial Intelligence & Machine Learning) student at Dayananda Sagar University. Passionate about Artificial Intelligence, Machine Learning, Full-Stack Development, and Software Engineering. Skilled in Java, JavaScript, MongoDB, SQL, Linux, and Machine Learning fundamentals. Experienced in developing innovative projects involving AI-driven solutions, traffic prediction systems, and safety-focused applications. Currently focused on strengthening Data Structures & Algorithms, Web Development, and AI technologies to become industry-ready for software engineering and AIML roles.',
  { align: 'justify' }
);
doc.moveDown(1);

// Section: Education
doc.font('Helvetica-Bold').fontSize(14).text('EDUCATION');
doc.moveTo(50, doc.y + 2).lineTo(545, doc.y + 2).stroke();
doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(11).text('Dayananda Sagar University');
doc.font('Helvetica-Oblique').fontSize(10).text('Bachelor of Technology (B.Tech), Computer Science Engineering – Artificial Intelligence & Machine Learning, CGPA: 6.2 / 10', { continued: true });
doc.font('Helvetica').text('Expected Graduation: 2028', { align: 'right' });
doc.moveDown(1);

// Section: Projects
doc.font('Helvetica-Bold').fontSize(14).text('PROJECTS');
doc.moveTo(50, doc.y + 2).lineTo(545, doc.y + 2).stroke();
doc.moveDown(0.5);

doc.font('Helvetica-Bold').fontSize(11).text('Sarathi – Advanced Women Safety Transportation Platform');
doc.font('Helvetica').fontSize(10)
  .list([
    'Designed a women-focused smart transportation and cab safety solution inspired by ride-hailing platforms.',
    'Integrated safety-oriented concepts including location tracking, emergency response mechanisms, and enhanced passenger security.',
    'Focused on leveraging modern technology to improve transportation safety and trust.'
  ]);
doc.moveDown(0.5);

doc.font('Helvetica-Bold').fontSize(11).text('Smart Traffic Congestion Predictor');
doc.font('Helvetica').fontSize(10)
  .list([
    'Developed a Machine Learning-based traffic prediction system.',
    'Utilized historical traffic data and predictive analytics techniques.',
    'Aimed to forecast congestion levels and assist in efficient route planning.'
  ]);
doc.moveDown(0.5);

doc.font('Helvetica-Bold').fontSize(11).text('Payflow – Personal Finance Management Application');
doc.font('Helvetica').fontSize(10)
  .list([
    'Building a finance management application for tracking expenses, income, and savings.',
    'Designed budgeting and financial monitoring features.',
    'Focused on improving personal financial awareness and management.'
  ]);
doc.moveDown(1);

// Section: Technical Skills
doc.font('Helvetica-Bold').fontSize(14).text('TECHNICAL SKILLS');
doc.moveTo(50, doc.y + 2).lineTo(545, doc.y + 2).stroke();
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(10)
  .text('Languages: Java, Python, JavaScript, SQL, HTML, CSS')
  .text('Databases: MongoDB, MySQL')
  .text('Machine Learning: Fundamentals, Random Forest, Decision Trees, Classification, Regression')
  .text('Technologies: React (Learning), Retrieval-Augmented Generation (RAG) Concepts')
  .text('Tools: Git, GitHub, Linux, VS Code');
doc.moveDown(1);

// Section: Certifications
doc.font('Helvetica-Bold').fontSize(14).text('CERTIFICATIONS');
doc.moveTo(50, doc.y + 2).lineTo(545, doc.y + 2).stroke();
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(10)
  .list([
    'Linux for Beginners — Infosys Springboard — Completed',
    'JavaScript Programming — Course Completed',
    'MongoDB Fundamentals — Course Completed'
  ]);
doc.moveDown(1);

// Section: Relevant Coursework
doc.font('Helvetica-Bold').fontSize(14).text('RELEVANT COURSEWORK');
doc.moveTo(50, doc.y + 2).lineTo(545, doc.y + 2).stroke();
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(10)
  .text('Object-Oriented Programming; Data Structures & Algorithms; Database Management Systems; Machine Learning; Artificial Intelligence; Operating Systems; Computer Networks');
doc.moveDown(1);

// Section: Career Objective
doc.font('Helvetica-Bold').fontSize(14).text('CAREER OBJECTIVE');
doc.moveTo(50, doc.y + 2).lineTo(545, doc.y + 2).stroke();
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(10).text(
  'To secure internship and software engineering opportunities where I can apply my knowledge of Artificial Intelligence, Machine Learning, and Full-Stack Development while continuously learning and contributing to impactful real-world solutions.',
  { align: 'justify' }
);

doc.end();
console.log('PDF generated at:', outputPath);
