import { useState } from "react";
import StudentList from "./components/StudentList";

const initialStudents = [
  { id: 1, name: "Nguyễn Văn A", score: 8.5, class: "D25CQCC01" },
  { id: 2, name: "Trần Thị B", score: 4.5, class: "D25CQCC01" },
  { id: 3, name: "Lê Văn C", score: 7, class: "D25CQCC02" },
];

const emptyForm = { name: "", score: "", class: "" };

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const { name, score, class: className } = form;

    if (!name.trim() || score === "" || !className.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    const numScore = Number(score);
    if (Number.isNaN(numScore) || numScore < 0 || numScore > 10) {
      setError("Điểm phải nằm trong khoảng 0 - 10!");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      score: numScore,
      class: className.trim(),
    };
    setStudents((prev) => [...prev, newStudent]);
    setForm(emptyForm);
    setError("");
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredStudents = students.filter(({ score }) => {
    if (filter === "good") return score >= 8;
    if (filter === "fail") return score < 5;
    return true;
  });

  const total = students.length;
  const average =
    total === 0 ? 0 : students.reduce((sum, { score }) => sum + score, 0) / total;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>Quản lý Điểm Sinh viên</h1>

      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input name="name" placeholder="Họ tên" value={form.name} onChange={handleChange} />
        <input name="score" type="number" step="0.1" placeholder="Điểm số" value={form.score} onChange={handleChange} />
        <input name="class" placeholder="Lớp" value={form.class} onChange={handleChange} />
        <button type="submit">Thêm</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <button onClick={() => setFilter("all")}>Tất cả</button>
        <button onClick={() => setFilter("good")}>Giỏi (>= 8)</button>
        <button onClick={() => setFilter("fail")}>Trượt (&lt; 5)</button>
      </div>

      <p>{`Tổng số sinh viên: ${total} | Điểm trung bình: ${average.toFixed(2)}`}</p>

      <StudentList students={filteredStudents} onDelete={handleDelete} />
    </div>
  );
};

export default App;
