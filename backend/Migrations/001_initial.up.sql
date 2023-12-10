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
    role VARCHAR(10), -- Add the role column
    about VARCHAR(255)
    
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
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    -- Add the deleted_at column
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

-- Create the "courses" table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(255),
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the "tutor_courses" table
CREATE TABLE IF NOT EXISTS tutor_course_links (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    tutor_id INT NOT NULL,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    session_frequency VARCHAR(255),
    max_students INT,
    current_students INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (tutor_id) REFERENCES tutors (id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
);

-- Create the "enrollments" table
CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    link_id INT NOT NULL,
    enrollment_date TIMESTAMPTZ,
    status VARCHAR(20),
    grade VARCHAR(10),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE,
    FOREIGN KEY (link_id) REFERENCES tutor_course_links (id) ON DELETE CASCADE
);

-- Create the "notifications" table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    status VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create the "chats" table
CREATE TABLE IF NOT EXISTS chats (
    id SERIAL PRIMARY KEY,
    enrollment_id INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (enrollment_id) REFERENCES enrollments (id) ON DELETE CASCADE
);

-- Create the "messages" table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    chat_id INT NOT NULL,
    time TIMESTAMPTZ,
    message TEXT,
    sender_id INT,
    recipient_id INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (chat_id) REFERENCES chats (id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE
    SET
        NULL,
        FOREIGN KEY (recipient_id) REFERENCES users (id) ON DELETE
    SET
        NULL
);

-- Create the "resources" table
CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the "resource_items" table
CREATE TABLE IF NOT EXISTS resource_items (
    id SERIAL PRIMARY KEY,
    resource_id INT NOT NULL,
    item_name VARCHAR(255),
    item_type VARCHAR(50),
    item_url VARCHAR(255),
    upload_date TIMESTAMPTZ,
    creator_id INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (resource_id) REFERENCES resources (id) ON DELETE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES users (id) ON DELETE
    SET
        NULL
);

-- Continue with any additional statements or insertions...
-- Insert sample users
INSERT INTO
    users (email, password, gender, name, dob, role)
VALUES
    (
        'vacaramin86@gmail.com',
        '$2a$10$RoehRLxjbt1jHUT2j9Gihu6QYeRRa3xuycKs0GGDxpEb3dJFzo6ga',
        'male',
        'Waqar Amin',
        '1990-01-01',
        'student'
    ),
    (
        'awaismadad@gmail.com',
        '$2a$10$RoehRLxjbt1jHUT2j9Gihu6QYeRRa3xuycKs0GGDxpEb3dJFzo6ga',
        'female',
        'Awais Madad',
        '1995-03-15',
        'tutor'
    ),
    (
        'awaismadad12@gmail.com',
        '$2a$10$RoehRLxjbt1jHUT2j9Gihu6QYeRRa3xuycKs0GGDxpEb3dJFzo6ga',
        'female',
        'Awais Madad 2',
        '1995-03-15',
        'tutor'
    ),
    (
        'awaismadad123@gmail.com',
        '$2a$10$RoehRLxjbt1jHUT2j9Gihu6QYeRRa3xuycKs0GGDxpEb3dJFzo6ga',
        'female',
        'Awais Madad 3',
        '1995-03-15',
        'tutor'
    );

-- Insert sample students
INSERT INTO
    students (
        id,
        parent_guardian_name,
        parent_guardian_email,
        parent_guardian_phone,
        grade_level
    )
VALUES
    (
        1,
        'Parent One',
        'parent1@example.com',
        '123456789',
        'Grade 5'
    );

-- Insert sample tutors
INSERT INTO
    tutors (id, subject, experience, rating)
VALUES
    (2, 'Math', '5 years', '4.5');

-- Insert values into the "courses" table
INSERT INTO
    courses (
        name,
        description,
        category,
        start_date,
        end_date
    )
VALUES
    (
        'Mathematics 101',
        'Introductory course to mathematics.',
        'Math',
        '2023-09-15',
        '2023-12-15'
    ),
    (
        'English Literature',
        'Exploring classic literature.',
        'English',
        '2023-10-01',
        '2023-12-31'
    ),
    (
        'Science Lab',
        'Hands-on experiments in various sciences.',
        'Science',
        '2023-09-20',
        '2023-12-20'
    ),
    (
        'M-CAT',
        'Some medical thing.',
        'biology',
        '2023-09-20',
        '2023-12-20'
    );

;

-- Insert values into the "tutor_courses" table
-- Insert values into the "tutor_courses" table
INSERT INTO
    tutor_course_links (
        tutor_id,
        course_id,
        start_date,
        end_date,
        session_frequency,
        max_students,
        current_students
    )
VALUES
    (
        2,
        1,
        '2023-09-15',
        '2023-12-15',
        'Weekly',
        10,
        5
    ),
    -- Updated tutor_id to 1
    (
        2,
        2,
        '2023-10-01',
        '2023-12-31',
        'Bi-Weekly',
        15,
        8
    ),
    -- Updated tutor_id to 2
    (
        2,
        3,
        '2023-09-20',
        '2023-12-20',
        'Weekly',
        12,
        6
    ),
    (
        2,
        4,
        '2023-09-20',
        '2023-12-20',
        'Weekly',
        12,
        6
    );

-- Insert values into the "enrollments" table
INSERT INTO
    enrollments (
        student_id,
        link_id,
        enrollment_date,
        status,
        grade,
        comment
    )
VALUES
    (
        1,
        1,
        '2023-09-16',
        'Enrolled',
        'A',
        'Good progress so far.'
    ),
    (
        1,
        2,
        '2023-09-16',
        'Enrolled',
        'B',
        'Needs improvement in assignments.'
    ),
    (
        1,
        3,
        '2023-09-21',
        'Enrolled',
        'A+',
        'Exemplary performance.'
    ),
    (
        1,
        4,
        '2023-09-21',
        'Enrolled',
        'A+',
        'Exemplary performance.'
    );

-- Insert values into the "chats" table
INSERT INTO
    chats (enrollment_id)
VALUES
    (1),
    (2),
    (3);

-- Insert values into the "messages" table
INSERT INTO
    messages (chat_id, time, message, sender_id, recipient_id)
VALUES
    (
        1,
        '2023-09-16 08:30:00',
        'Hi, how can I help you?',
        2,
        1
    ),
    (
        1,
        '2023-09-16 08:35:00',
        'I need help with the last assignment.',
        1,
        2
    ),
    (
        2,
        '2023-09-16 09:00:00',
        'Sure, I can assist you with that.',
        2,
        1
    );

-- Insert values into the "resources" table
INSERT INTO
    resources (description)
VALUES
    ('Mathematics reference materials'),
    ('Literature study guides'),
    ('Science experiment instructions');

-- Insert values into the "resource_items" table
INSERT INTO
    resource_items (
        resource_id,
        item_name,
        item_type,
        item_url,
        upload_date,
        creator_id
    )
VALUES
    (
        1,
        'Algebra Basics',
        'PDF',
        'https://example.com/algebra_basics.pdf',
        '2023-09-16',
        2
    ),
    (
        1,
        'Geometry Primer',
        'Video',
        'https://example.com/geometry_primer.mp4',
        '2023-09-17',
        2
    ),
    (
        2,
        'Shakespearean Sonnets',
        'Text',
        'https://example.com/sonnets.txt',
        '2023-09-18',
        2
    );

INSERT INTO
    notifications (user_id, message, status)
VALUES
    (
        2,
        'Welcome to Virtual Horizon, Thank you for signing up',
        'unread'
    ),
    (
        2,
        'Welcome Again, Thank you for signing up',
        'unread'
    );

INSERT INTO
    notifications (user_id, message, status)
VALUES
    (
        1,
        'Welcome to Virtual Horizon, Thank you for signing up',
        'unread'
    ),
    (
        1,
        'Please Join meeting for MCAT Class',
        'unread'
    );