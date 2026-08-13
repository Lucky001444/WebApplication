import "./App.css";
import Header from "./components/Header";
import CourseList from "./components/CourseList";
import ToolList from "./components/ToolList";
import Footer from "./components/Footer";
import CoursesSummary from "./components/CoursesSummary"; // นำเข้า Component ใหม่ (สำหรับข้อ 4)

function App() {
  const courses = [
    {
      id: 1,
      code: "4123307",
      name: "การพัฒนาเว็บแอปพลิเคชัน",
      englishName: "Web Application Development",
      credit: "3(2-2-5)",
      category: "Web Development",
      isCore: true,
      year: 2,         // เพิ่มชั้นปี
      semester: 1      // เพิ่มเทอม
    },
    {
      id: 2,
      code: "4121306",
      name: "การเขียนโปรแกรมเชิงวัตถุ",
      englishName: "Object-Oriented Programming",
      credit: "3(2-2-5)",
      category: "Programming",
      isCore: true,
      year: 1,
      semester: 2
    },
    {
      id: 3,
      code: "4122205",
      name: "ระบบฐานข้อมูลและการออกแบบ",
      englishName: "Database Systems and Design",
      credit: "3(2-2-5)",
      category: "Database",
      isCore: false,
      year: 2,
      semester: 1
    },
    {
      id: 4,
      code: "4121205",
      name: "อัลกอริทึมและการออกแบบโปรแกรม",
      englishName: "Algorithms and Program Design",
      credit: "3(2-2-5)",
      category: "Computer Science",
      isCore: true,
      year: 1,
      semester: 2
    },
    // เพิ่มวิชาที่ 5 (ข้อ 1)
    {
      id: 5,
      code: "4122201",
      name: "โครงสร้างข้อมูล",
      englishName: "Data Structures",
      credit: "3(2-2-5)",
      category: "Computer Science",
      isCore: true,
      year: 1,
      semester: 2
    },
    // เพิ่มวิชาที่ 6 (ข้อ 1)
    {
      id: 6,
      code: "4122301",
      name: "การวิเคราะห์และออกแบบระบบ",
      englishName: "System Analysis and Design",
      credit: "3(2-2-5)",
      category: "Software Engineering",
      isCore: false,
      year: 3,
      semester: 1
    }
  ];

  const tools = [
    { id: 1, name: "HTML", type: "frontend" },
    { id: 2, name: "CSS", type: "frontend" },
    { id: 3, name: "JavaScript", type: "frontend" },
    { id: 4, name: "React", type: "frontend" },
    { id: 5, name: "Vite", type: "tool" },
    { id: 6, name: "Node.js", type: "backend" },
    { id: 7, name: "npm", type: "tool" },
    { id: 8, name: "VS Code", type: "tool" }
  ];

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        {/* เรียกใช้ Component สรุปจำนวนวิชา (ข้อ 4) */}
        <CoursesSummary totalCourses={courses.length} /> 
        
        <CourseList courses={courses} />
        <ToolList tools={tools} />
      </main>

      {/* อย่าลืมลบคำว่า "พิมพ์ชื่อของคุณที่นี่" ออกก่อนส่งอาจารย์นะครับ ^^ */}
      <Footer
        studentName="นาย ธีรนันท์ ไชโย"
        studentId="68042380109"
      />
    </div>
  );
}

export default App;