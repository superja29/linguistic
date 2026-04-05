-- Seed file generated automatically

INSERT INTO public.profiles (id, role, name, avatar, country_code) VALUES ('68e6a9c4-4e23-42d1-acdf-eb7cdb4e0fa9', 'tutor', 'Sarah Jenkins', 'https://api.dicebear.com/9.x/notionists/svg?seed=sarah', 'gb');
INSERT INTO public.tutors (
            id, price, bio, about, philosophy, experience_years, teaching_style, 
            response_time, is_online, specialties, qualifications, languages, availability, 
            education, lesson_structure, certifications, fun_facts, hourly_packages, 
            topics_taught, rating, lessons_taught, total_students, completion_rate
        ) VALUES (
            '68e6a9c4-4e23-42d1-acdf-eb7cdb4e0fa9', 25, 'Certified CELTA teacher specializing in IELTS preparation and formal Business English.', 'Hello! I am Sarah from London. I have been teaching English for over 8 years, focusing on helping professionals and students achieve their goals...', 
            'I believe in practical, immersive learning where mistakes are celebrated as part of the journey.', 8, 'Structured but adaptable, heavily driven by student goals.',
            'Within 2 hours', true,
            '["IELTS","Business English","Conversation"]'::jsonb,
            '["CELTA (Cambridge)","BA in English Literature"]'::jsonb,
            '["English (Native)","Spanish (B2)"]'::jsonb,
            '{"Monday":["09:00","10:00","14:00","15:00"],"Wednesday":["10:00","11:00","16:00"],"Friday":["09:00","14:00","15:00","17:00"]}'::jsonb,
            '[{"degree":"BA English Literature","institution":"University of Edinburgh","year":"2015"}]'::jsonb,
            '["Warm up (5m)","Review (10m)","Core material & speaking (35m)","Feedback (10m)"]'::jsonb,
            '[{"name":"CELTA","issuer":"Cambridge Assessment English","year":"2016"}]'::jsonb,
            '["I''ve lived in 4 different countries.","I perform stand-up comedy.","I can solve a Rubik''s cube in 2 minutes."]'::jsonb,
            '[{"name":"Trial","hours":0.5,"price":10,"description":"30-min intro session"},{"name":"Standard","hours":1,"price":25,"description":"Full 1 hour lesson"},{"name":"Pack of 5","hours":5,"price":115,"description":"5 hours","savings":"Save $10"}]'::jsonb,
            '["IELTS Speaking","Interview Prep","Business Idioms"]'::jsonb,
            4.9, 1205, 450, 98
        );
INSERT INTO public.profiles (id, role, name, avatar, country_code) VALUES ('c7490500-dd56-483c-ad78-11fd38871d2f', 'tutor', 'James Miller', 'https://api.dicebear.com/9.x/notionists/svg?seed=james', 'us');
INSERT INTO public.tutors (
            id, price, bio, about, philosophy, experience_years, teaching_style, 
            response_time, is_online, specialties, qualifications, languages, availability, 
            education, lesson_structure, certifications, fun_facts, hourly_packages, 
            topics_taught, rating, lessons_taught, total_students, completion_rate
        ) VALUES (
            'c7490500-dd56-483c-ad78-11fd38871d2f', 18, 'Fun and engaging lessons for children and adults looking to improve their speaking confidence.', 'Hi! I''m James, born and raised in California. I specialize in making English learning fun, especially for kids...', 
            'Learning should never be boring!', 4, 'Interactive, game-based learning.',
            'Within 1 hour', false,
            '["Kids","Conversation","Pronunciation"]'::jsonb,
            '["TEFL Certificate"]'::jsonb,
            '["English (Native)","Japanese (A2)"]'::jsonb,
            '{"Tuesday":["08:00","09:00","10:00"],"Thursday":["08:00","09:00","10:00"],"Saturday":["10:00","11:00","14:00"]}'::jsonb,
            '[{"degree":"BSc Psychology","institution":"UCLA","year":"2018"}]'::jsonb,
            '["Icebreaker games","Vocabulary building","Roleplay","Review"]'::jsonb,
            '[{"name":"120-Hour TEFL","issuer":"TEFL Org","year":"2019"}]'::jsonb,
            '["I have a pet iguana.","I love surfing.","I know how to juggle."]'::jsonb,
            '[{"name":"Trial","hours":0.5,"price":10,"description":"30-min intro session"},{"name":"Standard","hours":1,"price":18,"description":"Full 1 hour lesson"}]'::jsonb,
            '["Phonics","Everyday Conversation","American Slang"]'::jsonb,
            4.7, 850, 310, 94
        );
INSERT INTO public.profiles (id, role, name, avatar, country_code) VALUES ('8baac16c-0242-40b1-b040-b7047ebd3f53', 'tutor', 'Elena Rossi', 'https://api.dicebear.com/9.x/notionists/svg?seed=elena', 'ca');
INSERT INTO public.tutors (
            id, price, bio, about, philosophy, experience_years, teaching_style, 
            response_time, is_online, specialties, qualifications, languages, availability, 
            education, lesson_structure, certifications, fun_facts, hourly_packages, 
            topics_taught, rating, lessons_taught, total_students, completion_rate
        ) VALUES (
            '8baac16c-0242-40b1-b040-b7047ebd3f53', 35, 'Ex-university professor helping students with university applications and academic writing.', 'I''m a former university lecturer with 15 years of experience in academic English.', 
            'Precision and deep understanding of language structure lead to fluency.', 15, 'Rigorous, feedback-focused.',
            'Within 6 hours', true,
            '["TOEFL","Academic Writing"]'::jsonb,
            '["MA Applied Linguistics"]'::jsonb,
            '["English (Native)","French (C1)","Italian (C1)"]'::jsonb,
            '{"Monday":["17:00","18:00","19:00"],"Wednesday":["17:00","18:00","19:00"]}'::jsonb,
            '[{"degree":"MA Applied Linguistics","institution":"University of Toronto","year":"2008"}]'::jsonb,
            '["Review assigned writing","Grammar deep dive","New assignments"]'::jsonb,
            '[]'::jsonb,
            '["I have published a book.","I love knitting.","I used to sing opera."]'::jsonb,
            '[{"name":"Standard","hours":1,"price":35,"description":"Full 1 hour lesson"},{"name":"Pack of 10","hours":10,"price":310,"description":"10 hours","savings":"Save $40"}]'::jsonb,
            '["TOEFL Prep","Essay Writing","Research Papers"]'::jsonb,
            5, 2200, 800, 99
        );
INSERT INTO public.profiles (id, role, name, avatar, country_code) VALUES ('01fe388d-c68f-40ca-9e0f-4ae466dc3ba0', 'tutor', 'David Osei', 'https://api.dicebear.com/9.x/notionists/svg?seed=david', 'za');
INSERT INTO public.tutors (
            id, price, bio, about, philosophy, experience_years, teaching_style, 
            response_time, is_online, specialties, qualifications, languages, availability, 
            education, lesson_structure, certifications, fun_facts, hourly_packages, 
            topics_taught, rating, lessons_taught, total_students, completion_rate
        ) VALUES (
            '01fe388d-c68f-40ca-9e0f-4ae466dc3ba0', 20, 'Tech enthusiast teaching English tailored for software engineers and IT professionals.', 'Combining my background in IT and teaching to help you ace your global tech interviews.', 
            'Context is king. We learn best through the vocabulary we use every day.', 3, 'Highly specialized and practical.',
            'Within 3 hours', false,
            '["IT Professionals","Job Interviews"]'::jsonb,
            '["TEFL","CompTIA A+"]'::jsonb,
            '["English (Native)"]'::jsonb,
            '{"Sunday":["10:00","11:00","12:00"],"Tuesday":["15:00","16:00"]}'::jsonb,
            '[{"degree":"BSc Computer Science","institution":"University of Cape Town","year":"2020"}]'::jsonb,
            '["Mock tech interviews","Code review shadowing","Pronunciation"]'::jsonb,
            '[]'::jsonb,
            '["I build custom keyboards.","I play bass guitar.","I travel full-time."]'::jsonb,
            '[{"name":"Trial","hours":0.5,"price":10,"description":"30-min intro"},{"name":"Standard","hours":1,"price":20,"description":"Full 1 hour lesson"}]'::jsonb,
            '["Tech Interviews","Agile Stand-up English","Resume Writing"]'::jsonb,
            4.8, 450, 120, 96
        );
