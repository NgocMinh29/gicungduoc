'use client';

import React, { useState } from 'react';
import { Box, Paper, TextField, MenuItem, Stack } from '@mui/material';
import StudentForm from './StudentForm';
import StudentTable from './StudentTable';
import { Student } from './types';

const statusOptions = ['Tất cả', 'Đang học', 'Đã tốt nghiệp', 'Đã thôi học', 'Tạm dừng học'];

export default function StudentManagerPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [filterProgram, setFilterProgram] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  const [form, setForm] = useState<Student>({
    mssv: '', name: '', dob: '', gender: '', faculty: '', program: '',
    course: '', address: '', email: '', phone: '', status: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const addStudent = () => {
    if (!form.mssv) return;
    if (!isValid()) {
      alert('Thông tin không hợp lệ.');
      return;
    }
    setStudents([...students, form]);
    resetForm();
  };

  const updateStudent = () => {
    if (!isValid()) {
      alert('Thông tin không hợp lệ.');
      return;
    }
    setStudents(
      students.map((s) => (s.mssv === form.mssv ? form : s))
    );
    resetForm();
  };

  const deleteStudent = (mssv: string) => {
    setStudents(students.filter((s) => s.mssv !== mssv));
    resetForm();
  };

  const selectStudent = (student: Student) => {
    setForm(student);
    setIsEditing(true);
  };

  const resetForm = () => {
    setForm({
      mssv: '', name: '', dob: '', gender: '', faculty: '', program: '',
      course: '', address: '', email: '', phone: '', status: ''
    });
    setIsEditing(false);
  };

  const isValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0[0-9]{9}$/;
    
    return (
      emailRegex.test(form.email) &&
      phoneRegex.test(form.phone) 
    );
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.mssv.includes(search);
    const matchesStatus = filterStatus === 'Tất cả' || s.status === filterStatus;
    const matchesProgram = filterProgram === '' || s.program.toLowerCase().includes(filterProgram.toLowerCase());
    const matchesCourse = filterCourse === '' || s.course.toLowerCase().includes(filterCourse.toLowerCase());
    return matchesSearch && matchesStatus && matchesProgram && matchesCourse;
  });

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ flexWrap: 'wrap', alignItems: 'center', mb: 2 }}
        >
          <TextField
            label="Tìm kiếm MSSV hoặc họ tên"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 240 }}
          />
          <TextField
            select
            label="Tình trạng"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="small"
            sx={{ width: 180 }}
          >
            {statusOptions.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Chương trình học"
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            size="small"
            sx={{ width: 180 }}
          />
          <TextField
            label="Khóa"
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            size="small"
            sx={{ width: 140 }}
          />
        </Stack>


        <StudentTable students={filteredStudents} onSelect={selectStudent} onDelete={deleteStudent} />
      </Paper>
      <StudentForm
        form={form}
        onChange={setForm}
        onAdd={addStudent}
        onUpdate={updateStudent}
        onCancel={resetForm}
        isEditing={isEditing}
      />
    </Box>
  );
}