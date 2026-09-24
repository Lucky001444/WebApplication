import CourseCard from "./CourseCard"

function CourseList({ courses, onDeleteCourse }) {
  if (courses.length === 0) {
    return (
      <section className="card">
        <h2>รายการข้อมูลรายวิชา</h2>
        <p className="empty-message">ยังไม่มีข้อมูลรายวิชาที่ตรงกับการค้นหา</p>
      </section>
    )
  }
  return (
    <section className="card">
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard
            key={`${course.source}-${course.id}`}
            course={course}
            onDeleteCourse={onDeleteCourse}
          />
        ))}
      </div>
    </section>
  )
}
export default CourseList