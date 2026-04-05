import { createClient } from '@supabase/supabase-js';
import { mockTutors } from '../src/data/mockData';
import { randomUUID } from 'crypto';

const supabaseUrl = 'https://awcelaszrguceeaetokc.supabase.co';
// We need the SERVICE_ROLE key or anon key (with RLS disabled / relaxed). 
// Currently we'll drop RLS briefly or use ANON key since we relaxed RLS for insert with true.
// Wait, our RLS policies said `auth.uid() = id` for INSERT!
// Let's just output SQL since it's much safer and doesn't require the admin key here.

const seedSql = () => {
    let sql = `-- Seed file generated automatically\n\n`;
    
    for(const tutor of mockTutors) {
        const id = randomUUID();
        
        // Profile insert
        sql += `INSERT INTO public.profiles (id, role, name, avatar, country_code) VALUES ('${id}', 'tutor', '${tutor.name.replace(/'/g, "''")}', '${tutor.avatar}', '${tutor.country_code}');\n`;
        
        // Tutor insert
        sql += `INSERT INTO public.tutors (
            id, price, bio, about, philosophy, experience_years, teaching_style, 
            response_time, is_online, specialties, qualifications, languages, availability, 
            education, lesson_structure, certifications, fun_facts, hourly_packages, 
            topics_taught, rating, lessons_taught, total_students, completion_rate
        ) VALUES (
            '${id}', ${tutor.price}, '${tutor.bio.replace(/'/g, "''")}', '${tutor.about.replace(/'/g, "''")}', 
            '${tutor.philosophy.replace(/'/g, "''")}', ${tutor.experience_years}, '${tutor.teaching_style.replace(/'/g, "''")}',
            '${tutor.response_time}', ${tutor.is_online},
            '${JSON.stringify(tutor.specialties).replace(/'/g, "''")}'::jsonb,
            '${JSON.stringify(tutor.qualifications).replace(/'/g, "''")}'::jsonb,
            '${JSON.stringify(tutor.languages).replace(/'/g, "''")}'::jsonb,
            '${JSON.stringify(tutor.availability).replace(/'/g, "''")}'::jsonb,
            '${JSON.stringify(tutor.education).replace(/'/g, "''")}'::jsonb,
            '${JSON.stringify(tutor.lesson_structure).replace(/'/g, "''")}'::jsonb,
            '${JSON.stringify(tutor.certifications).replace(/'/g, "''")}'::jsonb,
            '${JSON.stringify(tutor.fun_facts).replace(/'/g, "''")}'::jsonb,
            '${JSON.stringify(tutor.hourly_packages).replace(/'/g, "''")}'::jsonb,
            '${JSON.stringify(tutor.topics_taught).replace(/'/g, "''")}'::jsonb,
            ${tutor.rating}, ${tutor.lessons_taught}, ${tutor.total_students}, ${tutor.completion_rate}
        );\n`;
    }
    
    return sql;
};

import { writeFileSync } from 'fs';
writeFileSync('seed.sql', seedSql());
console.log('SQL Seed file generated: seed.sql');
