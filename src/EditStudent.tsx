import { useEffect, useState } from 'react';
import { StudentClass } from './types/Student';
import { useNavigate } from 'react-router-dom';

type StudentPropsType = {
  editFn: (new_student: StudentClass) => void;
  studentToEdit?: StudentClass;
}

export default function EditStudent({ editFn, studentToEdit }: StudentPropsType): React.ReactElement {
  const navigate = useNavigate();

  const [newName, setNewName] = useState<string>('');
  const [newSurname, setNewSurname] = useState<string>('');
  const [newIndex, setNewIndex] = useState<number | undefined>();
  const [newBirthDate, setNewBirthDate] = useState<Date | undefined>();

  useEffect(() => {
    if (studentToEdit) {
      setNewName(studentToEdit.Name);
      setNewSurname(studentToEdit.Surname);
      setNewIndex(studentToEdit.Index_nr);
      setNewBirthDate(studentToEdit.dataUrodzenia);
    }
  }, [studentToEdit]);

  const saveChanges = (): void => {
    if (newName && newSurname && newIndex && newBirthDate) {
      const updatedStudent = new StudentClass(newName, newSurname, newIndex, newBirthDate);
      editFn(updatedStudent);
      navigate('/');
    }
  };

  return (
    <div>
      <h2>Edytuj studenta</h2>
      <div>
        <label>
          Imię:
          <input
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Nazwisko:
          <input
            type='text'
            value={newSurname}
            onChange={(e) => setNewSurname(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Index:
          <input
            type='number'
            value={newIndex?.toString() || ''}
            onChange={(e) => setNewIndex(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Data urodzin:
          <input
            type='date'
            value={newBirthDate ? newBirthDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setNewBirthDate(new Date(e.target.value))}
          />
        </label>
      </div>
      <button onClick={saveChanges}>Zapisz</button>
    </div>
  );
}
