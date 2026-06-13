import PredictionBadge from "./PredictionBadge";

interface Student {
  _id: string;
  studentId: string;
  name: string;
  department: string;
  level: string;
  prediction: string;
}

interface Props {
  students: Student[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function StudentTable({
  students,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Level</th>
          <th>Prediction</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => (
          <tr key={student._id}>
            <td>{student.studentId}</td>

            <td>{student.name}</td>

            <td>{student.department}</td>

            <td>{student.level}</td>

            <td>
              <PredictionBadge
                prediction={student.prediction}
              />
            </td>

            <td>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    onView(student._id)
                  }
                >
                  View
                </button>

                <button
                  onClick={() =>
                    onEdit(student._id)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    onDelete(student._id)
                  }
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}