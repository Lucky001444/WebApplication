import { Link, useParams, useNavigate } from "react-router" // เพิ่ม useNavigate
import { courses } from "../data/courses"

function CourseDetailPage() {
  const { courseCode } = useParams()
  const navigate = useNavigate() // เรียกใช้งาน hook
  const course = courses.find((item) => item.code === courseCode)

  if (!course) {
    return (
      <section className="page-section">
        <div className="not-found-box">
          <h1>ไม่พบข้อมูลรายวิชา</h1>
          <p>ไม่พบรายวิชารหัส {courseCode} ในระบบ</p>
          <button className="primary-button" onClick={() => navigate(-1)} style={{ cursor: "pointer", border: "none" }}>
            กลับไปหน้ารายวิชา
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="page-section">
      {/* เพิ่ม Breadcrumb ตรงนี้ */}
      <nav className="breadcrumb">
        <Link to="/">หน้าแรก</Link>
        <span>/</span>
        <Link to="/courses">รายวิชา</Link>
        <span>/</span>
        <span>{course.code}</span>
      </nav>

      <div className="detail-card">
        <div className="course-top">
          <span className="course-code">{course.code}</span>
          <span className={`level-badge ${course.level.toLowerCase()}`}>
            {course.level}
          </span>
        </div>
        <h1>{course.name}</h1>
        <p className="english-name">{course.englishName}</p>
        <div className="detail-meta">
          <span>หน่วยกิต: {course.credit}</span>
          <span>หมวด: {course.category}</span>
        </div>
        <h2>คำอธิบายรายวิชา</h2>
        <p>{course.description}</p>
        <h2>ผลลัพธ์การเรียนรู้ที่คาดหวัง</h2>
        <ul className="outcome-list">
          {course.outcomes.map((outcome, index) => (
            <li key={index}>{outcome}</li>
          ))}
        </ul>
        
        {/* เปลี่ยนจาก Link เป็นปุ่ม useNavigate(-1) */}
        <button 
          className="secondary-button" 
          onClick={() => navigate(-1)} 
          style={{ cursor: "pointer", marginTop: "16px", color: "var(--dark)" }}
        >
          กลับหน้าก่อนหน้า
        </button>
      </div>
    </section>
  )
}
export default CourseDetailPage