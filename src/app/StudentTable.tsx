'use client';

import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import { Student } from './StudentForm';

interface Props {
  students: Student[];
  onSelect: (student: Student) => void;
  onDelete: (mssv: string) => void;
}

export default function StudentTable({ students, onSelect, onDelete }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>MSSV</TableCell>
          <TableCell>Họ tên</TableCell>
          <TableCell>Khoa</TableCell>
          <TableCell>Khóa</TableCell>
          <TableCell>Chương trình</TableCell>
          <TableCell>Tình trạng</TableCell>
          <TableCell>Hành động</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((s) => (
          <TableRow key={s.mssv}>
            <TableCell>{s.mssv}</TableCell>
            <TableCell>{s.name}</TableCell>
            <TableCell>{s.faculty}</TableCell>
            <TableCell>{s.course}</TableCell>
            <TableCell>{s.program}</TableCell>
            <TableCell>{s.status}</TableCell>
            <TableCell>
              <Button size="small" color="primary" onClick={() => onSelect(s)}>Chọn</Button>
              <Button size="small" color="error" onClick={() => onDelete(s.mssv)}>Xoá</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
