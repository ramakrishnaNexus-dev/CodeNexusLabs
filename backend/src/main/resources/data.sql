-- Categories (Dynamic - can be managed from Admin Panel)
INSERT INTO categories (name, icon_url, description) VALUES
('Java', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', 'Java Programming Language'),
('Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', 'Python Programming Language'),
('React', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', 'React JavaScript Framework'),
('Spring Boot', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg', 'Spring Boot Framework'),
('Selenium', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg', 'Selenium Testing Tool'),
('JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', 'JavaScript Language'),
('Postman', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', 'API Testing Tool'),
('Git', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', 'Version Control'),
('SQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', 'Database Query Language'),
('Docker', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', 'Container Platform');

-- Courses
INSERT INTO courses (title, description, category, difficulty, duration, instructor, students_count, rating, active, created_at) VALUES
('Complete Java Masterclass', 'Master Java from fundamentals to advanced concepts with OOP, Collections & Multithreading.', 'Java', 'Beginner', '12 weeks', 'Arun Kumar', 2450, 4.8, true, NOW()),
('Spring Boot Microservices', 'Build production-ready microservices with Spring Boot, Cloud & Docker.', 'Spring Boot', 'Intermediate', '10 weeks', 'Priya Sharma', 1890, 4.7, true, NOW()),
('Python for Data Science', 'Python for Data Science, ML & AI with NumPy, Pandas & Scikit-learn.', 'Python', 'Beginner', '8 weeks', 'Rahul Verma', 3200, 4.9, true, NOW()),
('React.js Complete Guide', 'Master React with Hooks, Redux, Next.js & real-world projects.', 'React', 'Intermediate', '10 weeks', 'Ananya Patel', 2800, 4.8, true, NOW()),
('Advanced JavaScript', 'Deep dive into closures, prototypes, async/await & ES6+.', 'JavaScript', 'Advanced', '8 weeks', 'Karan Joshi', 1560, 4.6, true, NOW()),
('Selenium Test Automation', 'Comprehensive test automation with Selenium WebDriver & TestNG.', 'Selenium', 'Intermediate', '6 weeks', 'Vikram Singh', 980, 4.5, true, NOW());

-- Quiz
INSERT INTO quizzes (title, description, course_id, time_limit, passing_score, active, created_at) 
VALUES ('Java Fundamentals Quiz', 'Test your Java basics knowledge', 1, 10, 60, true, NOW());

INSERT INTO questions (question_text, optiona, optionb, optionc, optiond, correct_answer, explanation, quiz_id) VALUES
('What does JVM stand for?', 'Java Virtual Machine', 'Java Visual Manager', 'Java Variable Method', 'Java Version Manager', 'A', 'JVM executes Java bytecode.', 1),
('Which keyword creates a class in Java?', 'struct', 'class', 'Class', 'define', 'B', 'class keyword declares a class.', 1),
('Default value of boolean in Java?', 'true', 'false', 'null', '0', 'B', 'Default boolean is false.', 1),
('Which collection does NOT allow duplicates?', 'ArrayList', 'LinkedList', 'HashSet', 'Vector', 'C', 'HashSet blocks duplicates.', 1),
('What does OOP stand for?', 'Object Oriented Programming', 'Object Oriented Protocol', 'Ordered Object Programming', 'Open Object Platform', 'A', 'OOP = Object Oriented Programming.', 1);