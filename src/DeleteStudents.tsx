import { useEffect, useState } from 'react';
import { StudentClass } from './types/Student';
import Student from './Student';
import { useNavigate } from 'react-router-dom';

type StudentPropsType = {
    students: StudentClass[];
    saveFn: (updatedStudents: StudentClass[]) => void;
};

export default function DeleteStudents({ students, saveFn }: StudentPropsType): React.ReactElement {
    const [localStudents, setLocalStudents] = useState<StudentClass[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLocalStudents([...students]);
    }, [students]);

    const removeStudent = (id: number): void => {
        setLocalStudents(prev => prev.filter(s => s.Index_nr !== id));
    };

    const commitChanges = (): void => {
        saveFn(localStudents);
        navigate('/');
    };

    const goBack = (): void => {
        navigate('/');
    };

    return (
        <div className="student-list-container">
            {localStudents.map((student) => (
                <li key={student.Index_nr} className="student-list-item">
                    <Student student={student} />
                    <button className="btn-delete" onClick={() => removeStudent(student.Index_nr)}>Usuń</button>
                </li>
            ))}
            <div className="action-buttons">
                <button className="btn-save" onClick={commitChanges}>Zapisz</button>
                <button className="btn-cancel" onClick={goBack}>Anuluj</button>
            </div>
        </div>
    );
}
