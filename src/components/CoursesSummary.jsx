function CoursesSummary({ totalCourses }) {
  return (
    <div className="courses-summary" style={{ textAlign: 'center', marginBottom: '20px', padding: '10px', backgroundColor: '#eef2f6', borderRadius: '8px' }}>
      <h3>สรุปจำนวนรายวิชา</h3>
      <p>มีรายวิชาทั้งหมด <strong>{totalCourses}</strong> รายการ</p>
    </div>
  );
}

export default CoursesSummary;