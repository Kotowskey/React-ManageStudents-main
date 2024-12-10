import { useState } from 'react';
import { StudentClass } from './types/Student';

type EditStudentProps = {
  student: StudentClass;
  updateFn: (updatedStudent: StudentClass) => void;
  cancelFn: () => void;
};

export default function EditStudent({ student, updateFn, cancelFn }: EditStudentProps): React.ReactElement {
  const [editStudent, setEditStudent] = useState(new StudentClass(student.Name, student.Surname, student.Index_nr, student.dataUrodzenia));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    const updatedStudent = new StudentClass(
      name === 'name' ? value : editStudent.Name,
      name === 'surname' ? value : editStudent.Surname,
      name === 'index_nr' ? Number(value) : editStudent.Index_nr,
      name === 'dataUrodzenia' ? new Date(value) : editStudent.dataUrodzenia
    );

    setEditStudent(updatedStudent);
  };

  const handleSave = (): void => {
    updateFn(editStudent);
  };

  return (
    <>
      <div>
        <h3>Edit Student</h3>
        <div>
          Name: <input type="text" name="name" value={editStudent.Name} onChange={handleInputChange} />
        </div>
        <div>
          Surname: <input type="text" name="surname" value={editStudent.Surname} onChange={handleInputChange} />
        </div>
        <div>
          Index: <input type="number" name="index_nr" value={editStudent.Index_nr} onChange={handleInputChange} />
        </div>
        <div>
          Date of Birth: <input type="date" name="dataUrodzenia" value={editStudent.dataUrodzenia.toISOString().slice(0, 10)} onChange={handleInputChange} />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={cancelFn}>Cancel</button>
      </div>
    </>
  );
}
