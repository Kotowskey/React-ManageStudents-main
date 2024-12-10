

import { useState } from 'react';
import Student from './Student';
import { StudentClass } from './types/Student';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';

export default function Students() {
  const [studentList, updateList] = useState<StudentClass[]>([
    new StudentClass('Ala', 'Makota', 123485, new Date('2000-01-21')),
    new StudentClass('Jan', 'Kowlaski', 2345, new Date('1999-10-23')),
    new StudentClass('Adrian', 'Duda', 156789, new Date('2001-04-01'))
  ]);
  const [showAddForm, changeAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentClass | null>(null);

  const addNewStudent = (student: StudentClass): void => {
    changeAddForm(false);
    updateList([...studentList, student]);
  };

  const updateStudent = (updatedStudent: StudentClass): void => {
    const updatedList = studentList.map((student) =>
      student.Index_nr === updatedStudent.Index_nr ? updatedStudent : student
    );
    updateList(updatedList);
    setEditingStudent(null);
  };

  const cancelEdit = (): void => {
    setEditingStudent(null);
  };

  return (
    <>
      <h1>Students List</h1>
      {studentList.length > 0 && (
        <ul>
          {studentList.map((student) => (
            <li key={student.Index_nr}>
              <Student student={student} />
              <button onClick={() => setEditingStudent(student)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
      {studentList.length === 0 && <p>No students stored</p>}
      {!showAddForm && !editingStudent && <button onClick={() => changeAddForm(true)}>Add Student</button>}
      {showAddForm && <AddStudent addFn={addNewStudent} />}
      {editingStudent && (
        <EditStudent
          student={editingStudent}
          updateFn={updateStudent}
          cancelFn={cancelEdit}
        />
      )}
    </>
  );
}
