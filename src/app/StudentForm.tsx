'use client';

import React from 'react';
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Paper,
} from '@mui/material';

export type Student = {
  mssv: string;
  name: string;
  dob: string;
  gender: string;
  faculty: string;
  program: string;
  course: string;
  address: string;
  email: string;
  phone: string;
  status: string;
};

interface Props {
  form: Student;
  onChange: (form: Student) => void;
  onAdd: () => void;
  onUpdate: () => void;
  onCancel: () => void;
  isEditing: boolean;
}

const faculties = [
  'Khoa Luật',
  'Khoa Tiếng Anh thương mại',
  'Khoa Tiếng Nhật',
  'Khoa Tiếng Pháp',
];

const statuses = [
  'Đang học',
  'Đã tốt nghiệp',
  'Đã thôi học',
  'Tạm dừng học',
];

const genders = ['Nam', 'Nữ', 'Khác'];

export default function StudentForm({ form, onChange, onAdd, onUpdate, onCancel, isEditing }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...form, [name]: value });
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField name="mssv" value={form.mssv} onChange={handleChange} label="Mã số sinh viên" fullWidth disabled={isEditing} />
        </Grid>
        <Grid item xs={6}>
          <TextField name="name" value={form.name} onChange={handleChange} label="Họ tên" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField name="dob" value={form.dob} onChange={handleChange} label="Ngày sinh" fullWidth type="date" InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            label="Giới tính"
            fullWidth
          >
            {genders.map((g) => (
              <MenuItem key={g} value={g}>{g}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            name="faculty"
            value={form.faculty}
            onChange={handleChange}
            label="Khoa"
            fullWidth
          >
            {faculties.map((f) => (
              <MenuItem key={f} value={f}>{f}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField name="course" value={form.course} onChange={handleChange} label="Khóa" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField name="program" value={form.program} onChange={handleChange} label="Chương trình học" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            name="status"
            value={form.status}
            onChange={handleChange}
            label="Tình trạng"
            fullWidth
          >
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField name="email" value={form.email} onChange={handleChange} label="Email" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField name="phone" value={form.phone} onChange={handleChange} label="Số điện thoại" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name="address" value={form.address} onChange={handleChange} label="Địa chỉ" fullWidth />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
          {isEditing ? (
            <Button variant="contained" color="primary" onClick={onUpdate}>Cập nhật</Button>
          ) : (
            <Button variant="contained" color="primary" onClick={onAdd}>Thêm</Button>
          )}
          <Button variant="outlined" color="error" onClick={onCancel}>Huỷ</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
