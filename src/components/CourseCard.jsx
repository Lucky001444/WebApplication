// รับ Props year และ semester เพิ่มเข้ามา
function CourseCard({ code, name, englishName, credit, category, isCore, year, semester }) {
  return (
    <article className="course-card">
      <div className="course-header">
        <h3>{code}</h3>
        {isCore && <span className="badge core">รายวิชาหลัก</span>}
      </div>

      <h4>{name}</h4>
      <p className="english-name">{englishName}</p>

      <div className="course-meta">
        <span>หน่วยกิต: {credit}</span>
        <span>หมวด: {category}</span>
        {/* เพิ่มการแสดงผลปีและเทอม */}
        <span>ชั้นปีที่: {year}</span>
        <span>ภาคเรียนที่: {semester}</span>
      </div>
    </article>
  );
}

export default CourseCard;