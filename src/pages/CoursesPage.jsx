import { useState } from "react"
import CourseCard from "../components/CourseCard"
import { courses } from "../data/courses"

function CoursesPage() {
  const [searchText, setSearchText] = useState("")

  const filteredCourses = courses.filter((course) => {
    const keyword = searchText.toLowerCase()
    return (
      course.code.toLowerCase().includes(keyword) ||
      course.name.toLowerCase().includes(keyword) ||
      course.englishName.toLowerCase().includes(keyword) ||
      course.category.toLowerCase().includes(keyword)
    )
  })

  return (
    <section className="page-section">
      <div className="section-heading">
        <h1>รายการรายวิชา</h1>
        <p>
          แสดงข้อมูลรายวิชาที่เกี่ยวข้องกับการพัฒนาเว็บแอปพลิเคชันและพื้นฐานทางคอมพิวเตอร์
        </p>
      </div>
      <div className="search-box">
        <label htmlFor="courseSearch">ค้นหารายวิชา</label>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            id="courseSearch"
            type="text"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="ค้นหาด้วยรหัสวิชา ชื่อวิชา หรือหมวดหมู่"
          />
          {/* เพิ่มปุ่ม Clear Search จะแสดงเมื่อมีการพิมพ์ข้อความเท่านั้น */}
          {searchText && (
            <button 
              onClick={() => setSearchText("")} 
              style={{ padding: "0 16px", borderRadius: "12px", border: "1px solid var(--border)", cursor: "pointer" }}
            >
              ล้างคำค้น
            </button>
          )}
        </div>
        {/* เพิ่มข้อความแสดงจำนวนที่ค้นพบ */}
        <p style={{ margin: "4px 0 0", fontSize: "14px", color: "var(--gray)" }}>
          พบรายวิชาทั้งหมด {filteredCourses.length} รายการ
        </p>
      </div>

      {filteredCourses.length === 0 ? (
        <p className="empty-message">ไม่พบรายวิชาที่ตรงกับคำค้นหา</p>
      ) : (
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  )
}
export default CoursesPage