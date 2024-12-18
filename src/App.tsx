import { StudentClass } from './types/Student';
import { useState } from 'react';
import './App.css';
import Students from './Students';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import DeleteStudents from './DeleteStudents';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  const [students, setStudents] = useState<StudentClass[]>([
    new StudentClass('Ala', 'Makota', 123485, new Date('2000-01-21')),
    new StudentClass('Jan', 'Kowalski', 2345, new Date('1999-10-23')),
    new StudentClass('Adrian', 'Duda', 156789, new Date('2001-04-01')),
  ]);

  const [currentStudent, setCurrentStudent] = useState<StudentClass | undefined>(undefined);

  const handleAddStudent = (student: StudentClass) => setStudents([...students, student]);

  const handleEditStudent = (student: StudentClass) => {
    setStudents(students.map((s) => (s.Index_nr === currentStudent?.Index_nr ? student : s)));
    setCurrentStudent(undefined);
  };

  const handleUpdateStudents = (updatedStudents: StudentClass[]) => setStudents(updatedStudents);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Students
              studentList={students}
              changeSelectedStudent={setCurrentStudent}
            />
          }
        />
        <Route path="/add" element={<AddStudent addFn={handleAddStudent} />} />
        <Route
          path="/edit"
          element={
            <EditStudent
              studentToEdit={currentStudent}
              editFn={handleEditStudent}
            />
          }
        />
        <Route
          path="/delete"
          element={
            <DeleteStudents
              students={students}
              saveFn={handleUpdateStudents}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
