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

  const loadCourses = async () => {
    try {
      setLoading(true)
      setMessage({ type: "loading", text: "กำลังโหลดข้อมูลรายวิชา..." })

      const data = await getCourses()
      setCourses(data)
      setMessage({ type: "success", text: "โหลดข้อมูลรายวิชาสำเร็จ" })
    } catch (error) {
      setMessage({ type: "error", text: error.message })
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
      setMessage({ type: "error", text: error.message })
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
    const confirmDelete = window.confirm("ยืนยันการลบข้อมูลรายวิชานี้หรือไม่")

    if (!confirmDelete) {
      return
    }

    try {
      await deleteCourse(id)
      setCourses(courses.filter((course) => course.id !== id))
      setMessage({ type: "success", text: "ลบข้อมูลรายวิชาสำเร็จ" })
    } catch (error) {
      setMessage({ type: "error", text: error.message })
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

        {loading ? (
          <p className="status-message loading">กำลังโหลดข้อมูล...</p>
        ) : (
          <CourseTable
            courses={courses}
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