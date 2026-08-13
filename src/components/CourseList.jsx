import SectionTitle from "./SectionTitle";
import CourseCard from "./CourseCard";

function CourseList({ courses }) { 
  return (
    <section className="section">
      <SectionTitle 
        title="ข้อมูลรายวิชา" 
        description="แสดงรายละเอียดวิชาเรียนทั้งหมด" 
      />
      
      {courses.length === 0 ? (
        <p>ไม่พบข้อมูลรายวิชา</p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              code={course.code}
              name={course.name}
              englishName={course.englishName}
              credit={course.credit}
              category={course.category}
              isCore={course.isCore}
              year={course.year}             // เพิ่มบรรทัดนี้
              semester={course.semester}     // เพิ่มบรรทัดนี้
            />
          ))}
        </div>
      )}
    </section>
  ); 
}

export default CourseList;