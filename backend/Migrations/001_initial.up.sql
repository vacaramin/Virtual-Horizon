-- File: 001_initial.up.sql

-- Create the "user" table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  additional_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample data into the "user" table
INSERT INTO users (email, password, name) VALUES
  ('vacaramin86@gmail.com', '$2a$10$RoehRLxjbt1jHUT2j9Gihu6QYeRRa3xuycKs0GGDxpEb3dJFzo6ga', 'Waqar Amin'),
  ('awais@gmail.com', '$2a$10$MZrOh6z8apy2cY5xHY0jQe1cabL/XjFWqHMYx3Yk3FhE1r.6PM1J2', 'Awais Madad'),
  ('aqib@gmail.com', '$2a$10$RoehRLxjbt1jHUT2j9Gihu6QYeRRa3xuycKs0GGDxpEb3dJFzo6ga', 'Aqib'),
  ('waqar@example.com', '$2a$10$RoehRLxjbt1jHUT2j9Gihu6QYeRRa3xuycKs0GGDxpEb3dJFzo6ga', 'Waqar Amin');

-- Create the "teacher" table
CREATE TABLE IF NOT EXISTS teachers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  department VARCHAR(255),
  designation VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample data into the "teacher" table
INSERT INTO teachers (user_id, department, designation) VALUES
  (3, 'Mathematics', 'Senior Teacher'),
  (4, 'Science', 'Assistant Professor');

-- Create the "student" table
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  grade_level VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample data into the "student" table
INSERT INTO students (user_id, grade_level) VALUES
  (1, '10th Grade'),
  (2, '11th Grade');

-- Create the "course" table
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  teacher_id INTEGER NOT NULL REFERENCES teachers(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample data into the "course" table
INSERT INTO courses (name, description, teacher_id) VALUES
  ('Mathematics 101', 'Introductory course on mathematics', 1),
  ('Chemistry 201', 'Advanced course on chemistry', 2);

-- Create the "enrollment" table to represent the relationship between users and courses
CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  course_id INTEGER NOT NULL REFERENCES courses(id),
  enrollment_date TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample data into the "enrollment" table
INSERT INTO enrollments (user_id, course_id) VALUES
  (1, 1),
  (2, 2);

-- Create the "assignment" table
CREATE TABLE IF NOT EXISTS assignments (
  id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL REFERENCES courses(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample data into the "assignment" table
INSERT INTO assignments (course_id, title, description, due_date) VALUES
  (1, 'Math Assignment 1', 'Complete the exercises from Chapter 1', '2023-06-15 23:59:59'),
  (2, 'Chemistry Lab Report', 'Write a report on the chemical reaction experiment', '2023-06-20 23:59:59');

-- Create the "submission" table to represent the submissions of assignments by users
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  assignment_id INTEGER NOT NULL REFERENCES assignments(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  submission_date TIMESTAMPTZ DEFAULT NOW(),
  grade DECIMAL(5, 2),
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample data into the "submission" table
INSERT INTO submissions (assignment_id, user_id, submission_date, grade, feedback) VALUES
  (1, 1, '2023-06-15 10:00:00', 95.0, 'Good work!'),
  (1, 2, '2023-06-15 09:30:00', 90.5, 'Excellent effort!'),
  (2, 2, '2023-06-20 12:00:00', NULL, NULL);

-- Add any additional tables and relationships as per your virtual school's requirements

ALTER TABLE users
ADD COLUMN dob TIMESTAMPTZ,
ADD COLUMN gender VARCHAR(10),
ADD COLUMN parent_guardian_name VARCHAR(255),
ADD COLUMN parent_guardian_email VARCHAR(255),
ADD COLUMN parent_guardian_phone VARCHAR(20),
ADD COLUMN grade_level VARCHAR(255),
ADD COLUMN current_school VARCHAR(255),
ADD COLUMN device VARCHAR(255),
ADD COLUMN internet_connection VARCHAR(255),
ADD COLUMN special_needs TEXT,
ADD COLUMN accomodations TEXT,
ADD COLUMN present_address TEXT;
