-- File: 001_initial.up.sql
-- Create the "user" table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    dob TIMESTAMPTZ,
    gender VARCHAR(10),
    parent_guardian_name VARCHAR(255),
    parent_guardian_email VARCHAR(255),
    parent_guardian_phone VARCHAR(20),
    grade_level VARCHAR(255),
    current_school VARCHAR(255),
    device VARCHAR(255),
    internet_connection VARCHAR(255),
    special_needs TEXT,
    accomodations TEXT,
    present_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample data into the "user" table
INSERT INTO
    users (
        email,
        password,
        name,
        dob,
        gender,
        parent_guardian_name,
        parent_guardian_email,
        parent_guardian_phone,
        grade_level,
        current_school,
        device,
        internet_connection,
        special_needs,
        accomodations,
        present_address
    )
VALUES
    (
        'vacaramin86@gmail.com',
        '$2a$10$RoehRLxjbt1jHUT2j9Gihu6QYeRRa3xuycKs0GGDxpEb3dJFzo6ga',
        'Waqar Amin',
        '1990-01-01',
        'Male',
        'John Doe',
        'johndoe@example.com',
        '1234567890',
        '10th Grade',
        'ABC High School',
        'Laptop',
        'High-speed',
        'None',
        'None',
        '123 Main St'
    ),
    -- Add more sample data here
;

-- Create the "Tutor" table
CREATE TABLE IF NOT EXISTS tutors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    department VARCHAR(255),
    designation VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample data into the "tutor" table
INSERT INTO
    tutors (user_id, department, designation)
VALUES
    (3, 'Mathematics', 'Senior tutor'),
    (4, 'Science', 'Assistant Professor');

-- Create the "course" table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    tutor_id INTEGER NOT NULL REFERENCES tutors(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample data into the "course" table
INSERT INTO
    courses (name, description, tutor_id)
VALUES
    (
        'Mathematics 101',
        'Introductory course on mathematics',
        1
    ),
    (
        'Chemistry 201',
        'Advanced course on chemistry',
        2
    );

-- Create the "class" table
CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    tutor_id INTEGER NOT NULL REFERENCES tutors(id),
    subject VARCHAR(255),
    schedule TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the "class_participants" table
CREATE TABLE IF NOT EXISTS class_participants (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    class_id INTEGER NOT NULL REFERENCES classes(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the "messages" table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id),
    class_id INTEGER NOT NULL REFERENCES classes(id),
    content TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the "files" table
CREATE TABLE IF NOT EXISTS files (
    id SERIAL PRIMARY KEY,
    uploader_id INTEGER NOT NULL REFERENCES users(id),
    class_id INTEGER NOT NULL REFERENCES classes(id),
    filename VARCHAR(255),
    filepath VARCHAR(255),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);