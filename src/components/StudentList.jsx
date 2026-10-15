import StudentItem from "./StudentItem";

const StudentList = ({ students, onDelete }) => (
  <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th>ID</th>
        <th>Họ tên</th>
        <th>Điểm</th>
        <th>Lớp</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody>
      {students.length === 0 ? (
        <tr><td colSpan="5">Không có sinh viên nào</td></tr>
      ) : (
        students.map((student) => (
          <StudentItem key={student.id} student={student} onDelete={onDelete} />
        ))
      )}
    </tbody>
  </table>
);

export default StudentList;
