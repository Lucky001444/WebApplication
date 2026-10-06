import { useEffect, useState } from "react"
import "./App.css"
import Header from "./components/Header"
import StatusMessage from "./components/StatusMessage"
import CourseForm from "./components/CourseForm"
import CourseTable from "./components/CourseTable"
import Footer from "./components/Footer"
import { getCourses, createCourse, updateCourse, deleteCourse } from "./services/courseApi"

function App() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [message, setMessage] = useState({ type: "", text: "" })
  
  // 1. (รายการเพิ่มเติม) State สำหรับเก็บข้อความค้นหา 
  const [searchText, setSearchText] = useState("")

  const loadCourses = async () => {
    try {
      setLoading(true)
      setMessage({ type: "loading", text: "กำลังโหลดข้อมูลรายวิชา..." })
      const data = await getCourses()
      setCourses(data)
      setMessage({ type: "success", text: "โหลดข้อมูลรายวิชาสำเร็จ" })
    } catch (error) {
      // 2. (รายการเพิ่มเติม) ปรับ Error Message ให้เข้าใจง่ายขึ้นเมื่อโหลดไม่สำเร็จ
      setMessage({ 
        type: "error", 
        text: "ไม่สามารถเชื่อมต่อ Backend ได้ กรุณาตรวจสอบว่า Server กำลังทำงานอยู่" 
      })
      console.error("Error loading courses:", error) 
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])

  useEffect(() => {
    document.title = `Full Stack Courses: ${courses.length} รายการ`
  }, [courses.length])

  // (ฟังก์ชันเสริมช่องค้นหา) ตัวแปรรองรับข้อมูลที่ถูกกรองจากการค้นหา
  const filteredCourses = courses.filter((course) => {
    const keyword = searchText.toLowerCase()
    return (
      course.code.toLowerCase().includes(keyword) ||
      course.name_th.toLowerCase().includes(keyword) ||
      course.name_en.toLowerCase().includes(keyword) ||
      course.category.toLowerCase().includes(keyword)
    )
  })

  const handleSubmitCourse = async (courseData) => { 
    try {
      setSubmitting(true)

      if (editingCourse) {
        const result = await updateCourse(editingCourse.id, courseData)
        setCourses(
          courses.map((course) =>
            course.id === editingCourse.id ? result.course : course
          )
        )
        setEditingCourse(null)
        setMessage({ type: "success", text: "แก้ไขข้อมูลรายวิชาสำเร็จ" })
      } else {
        const result = await createCourse(courseData)
        setCourses([result.course, ...courses])
        setMessage({ type: "success", text: "เพิ่มข้อมูลรายวิชาสำเร็จ" })
      }
    } catch (error) {
      // (จุดปรับปรุง Error Message) เมื่อบันทึกไม่สำเร็จ
      setMessage({ 
        type: "error", 
        text: "ไม่สามารถบันทึกข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่อ" 
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditCourse = (course) => { 
    setEditingCourse(course)
    setMessage({ type: "info", text: `กำลังแก้ไขรายวิชา ${course.code}` })

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  
  const handleCancelEdit = () => { 
    setEditingCourse(null)
  }

  const handleDeleteCourse = async (id) => { 
    // 3. (รายการเพิ่มเติม) เพิ่มระบบหน้าต่างยืนยันก่อนลบ (Confirm Dialog)
    const confirmDelete = window.confirm("ยืนยันการลบข้อมูลนี้หรือไม่")
    if (!confirmDelete) {
      return
    }

    try {
      await deleteCourse(id)
      setCourses(courses.filter((course) => course.id !== id))
      setMessage({ type: "success", text: "ลบข้อมูลรายวิชาสำเร็จ" })
    } catch (error) {
      setMessage({ type: "error", text: "ไม่สามารถลบข้อมูลได้" })
    }
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        
        <section className="summary-grid">
          <article className="summary-card">
            <h3>{courses.length}</h3>
            <p>จำนวนรายวิชา</p>
          </article>
          <article className="summary-card">
            <h3>React</h3>
            <p>Frontend</p>
          </article>
          <article className="summary-card">
            <h3>Express</h3>
            <p>Backend</p>
          </article>
          <article className="summary-card">
            <h3>MySQL</h3>
            <p>Database</p>
          </article>
        </section>
        
        <StatusMessage type={message.type} message={message.text} />
        
        <CourseForm
          onSubmitCourse={handleSubmitCourse}
          editingCourse={editingCourse}
          onCancelEdit={handleCancelEdit}
          submitting={submitting}
        />

        {/* 4. (รายการเพิ่มเติม) UI ช่องค้นหา */}
        <section className="card">
          <div className="form-group">
            <label htmlFor="search">ค้นหารายวิชา</label>
            <input
              id="search"
              type="text"
              placeholder="ค้นหาจากรหัส ชื่อภาษาไทย/อังกฤษ หรือหมวดหมู่..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </section>

        {loading ? (
          // 5. (รายการเพิ่มเติม) ใช้ Loading Spinner แทนข้อความธรรมดา
          <div className="spinner" aria-label="กำลังโหลดข้อมูล"></div>
        ) : (
          <CourseTable
            courses={filteredCourses}
            onEditCourse={handleEditCourse}
            onDeleteCourse={handleDeleteCourse}
          />
        )}

        <section className="card">
          <div className="section-heading">
            <h2>ทดสอบการเชื่อมต่อระบบ</h2>
            <p>
              กดปุ่มด้านล่างเพื่อโหลดข้อมูลล่าสุดจากฐานข้อมูลอีกครั้ง
            </p>
          </div>
          <button onClick={loadCourses} disabled={loading}>
            โหลดข้อมูลใหม่
          </button>
        </section>
      </main>
      <Footer />
    </div>
  )
}
export default App