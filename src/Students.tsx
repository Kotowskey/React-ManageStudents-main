import { NavLink } from 'react-router-dom';
import Student from './Student';
import { StudentClass } from './types/Student';

type StudentPropsType = {
  studentList: StudentClass[];
  changeSelectedStudent: (student: StudentClass) => void;
};

export default function Students({ studentList, changeSelectedStudent }: StudentPropsType) {
  const listTitle = 'Lista studentów';

  return (
    <>
      {listTitle}
      {studentList.length > 0 ? (
        <ul>
          {studentList.map((student) => (
            <li key={student.Index_nr}>
              <div onClick={() => changeSelectedStudent(student)}>
                <Student student={student} />
                <button>
                  <NavLink to="/edit">Edytuj studenta</NavLink>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak studentów</p>
      )}
      <button>
        <NavLink to="/add">Dodaj studenta</NavLink>
      </button>
      <button>
        <NavLink to="/delete">Usuń studenta</NavLink>
      </button>
    </>
  );
}
