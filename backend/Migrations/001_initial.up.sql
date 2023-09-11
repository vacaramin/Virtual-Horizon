-- File: 001_initial.up.sql
-- Create the "users" table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(10),
    name VARCHAR(255) NOT NULL,
    dob TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    role VARCHAR(10) -- Add the role column
    );

-- Create the "students" table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    parent_guardian_name VARCHAR(255) NOT NULL,
    parent_guardian_email VARCHAR(255) NOT NULL,
    parent_guardian_phone VARCHAR(255) NOT NULL,
    grade_level VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE
    );

-- Create the "tutors" table
CREATE TABLE IF NOT EXISTS tutors (
    id SERIAL PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    experience VARCHAR(255) NOT NULL,
    rating VARCHAR(10) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE
    );

-- Insert sample users
INSERT INTO users (email, password, gender, name, dob, role)
VALUES
    ('vacaramin86@gmail.com', '$2a$10$RoehRLxjbt1jHUT2j9Gihu6QYeRRa3xuycKs0GGDxpEb3dJFzo6ga', 'male', 'Waqar Amin', '1990-01-01', 'student'),
    ('awaismadad@gmail.com', '$2a$10$RoehRLxjbt1jHUT2j9Gihu6QYeRRa3xuycKs0GGDxpEb3dJFzo6ga', 'female', 'Awais Madad', '1995-03-15', 'tutor');

-- Insert sample students
INSERT INTO students (id, parent_guardian_name, parent_guardian_email, parent_guardian_phone, grade_level)
VALUES
    (1, 'Parent One', 'parent1@example.com', '123456789', 'Grade 5');

-- Insert sample tutors
INSERT INTO tutors (id, subject, experience, rating)
VALUES
    (2, 'Math', '5 years', '4.5');