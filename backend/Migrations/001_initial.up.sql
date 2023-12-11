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
    FOREIGN KEY (id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create the "tutors" table
CREATE TABLE IF NOT EXISTS tutors (
    id SERIAL PRIMARY KEY,
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

-- Create the "quiz" table
CREATE TABLE IF NOT EXISTS quiz (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
);

-- Create the "quiz_question" table
CREATE TABLE IF NOT EXISTS quiz_question (
    id SERIAL PRIMARY KEY,
    quiz_id INT NOT NULL,
    question VARCHAR(255) NOT NULL,
    status VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (quiz_id) REFERENCES quiz (id) ON DELETE CASCADE
);
-- Create the "quiz_question_option" table
CREATE TABLE IF NOT EXISTS quiz_question_option (
    id SERIAL PRIMARY KEY,
    quiz_question_id INT NOT NULL,
    option VARCHAR(255) NOT NULL,
    correct Boolean,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (quiz_question_id) REFERENCES quiz_question (id) ON DELETE CASCADE
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

