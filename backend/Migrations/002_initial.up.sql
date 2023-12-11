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
    tutors (id, experience, rating)
VALUES
    (2, '5 years', '4.5');

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
        'Introduction to Computer Science',
        'Introduction to Computer Science',
        'CS',
        '2023-09-15',
        '2023-12-15'
    ),
    (
        'Advanced Mathematics',
        'Advanced Maths',
        'Math',
        '2023-10-01',
        '2023-12-31'
    ),
    (
        'History of ARTS',
        'Hands-on experiments in various sciences.',
        'History',
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
-- INSERT INTO quiz (course_id, message)
INSERT INTO quiz (course_id, message)
VALUES
    (
        1,
        'Introduction to Computer Science'
    ),
    (
        2,
        'Advanced Mathematics'
    ),
    (
        3,
        'History of Art'
    );

-- INSERT INTO quiz_question (quiz_id, message, status)
INSERT INTO quiz_question (quiz_id, question, status)
VALUES
    (
        1,
        'What is the binary system used for in computers?',
        'active'
    ),
    (
        1,
        'Explain the concept of object-oriented programming.',
        'active'
    ),
    (
        2,
        'Solve the differential equation: dy/dx = x^2',
        'active'
    ),
    (
        3,
        'Who painted the Mona Lisa?',
        'active'
    );

-- INSERT INTO quiz_question_option (quiz_question_id, option, correct)
INSERT INTO quiz_question_option (quiz_question_id, option, correct)
VALUES
    (
        1,
        'Storing data in a compressed format',
        false
    ),
    (
        1,
        'Performing arithmetic operations',
        true
    ),
    (
        1,
        'Creating graphical user interfaces',
        false
    ),
    (
        2,
        'A programming paradigm based on real-world objects',
        true
    ),
    (
        2,
        'A way of organizing data in databases',
        false
    ),
    (
        3,
        'y = (x^3)/3 + C',
        false
    ),
    (
        3,
        'y = (x^3)/3 + x + C',
        true
    ),
    (
        4,
        'Leonardo da Vinci',
        true
    ),
    (
        4,
        'Pablo Picasso',
        false
    ),
    (
        4,
        'Vincent van Gogh',
        false
    );
