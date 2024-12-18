import { useState } from 'react';
import { StudentClass } from './types/Student';
import { useNavigate } from 'react-router-dom';

type StudentPropsType = {
  addFn: (new_student: StudentClass) => void;
};

export default function AddStudent(props: StudentPropsType): React.ReactElement {
  const navigate = useNavigate();

  const [new_student, setNewStudent] = useState({
    name: '',
    surname: '',
    index_nr: 0,
    dataUrodzenia: new Date(),
    adres: '',
    grupa: '',
    stypendium: 0,
    marks: []
  });

  const changeValue = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setNewStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addStudent = (): void => {
    const student = new StudentClass(
      new_student.name,
      new_student.surname,
      new_student.index_nr,
      new_student.dataUrodzenia
    );
    props.addFn(student);
    navigate('/');
  };

  return (
    <div>
      <h2>Dodaj studenta:</h2>
      <label>
        Imię:
        <input type='text' name='name' onChange={changeValue} />
      </label>
      <label>
        Nazwisko:
        <input type='text' name='surname' onChange={changeValue} />
      </label>
      <label>
        Index:
        <input type='number' name='index_nr' onChange={changeValue} />
      </label>
      <label>
        Data urodzenia:
        <input type='date' name='dataUrodzenia' onChange={changeValue} />
      </label>
      <button onClick={addStudent}>Dodaj</button>
    </div>
  );
}
