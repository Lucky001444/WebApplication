import { useEffect, useState } from "react"
import "./App.css"
import Header from "./components/Header"
import StatusMessage from "./components/StatusMessage"
import ApiInfo from "./components/ApiInfo"
import CourseForm from "./components/CourseForm"
import CourseList from "./components/CourseList"
import Footer from "./components/Footer"
import { initialCourses } from "./data/initialCourses"
import { fetchPostsWithFetch, createPostWithFetch } from "./services/fetchCourseApi"
import { fetchPostsWithAxios, createPostWithAxios } from "./services/axiosCourseApi"

function App() {
  const [courses, setCourses] = useState(initialCourses)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  
  // สร้าง State สำหรับช่องค้นหา (เพิ่มรายการปรับแต่งที่ 1)
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    document.title = `API Courses: ${courses.length} รายการ`
  }, [courses.length])

  const loadWithFetch = async () => {
    try {
      setLoading(true)
      setMessage({ type: "loading", text: "กำลังโหลดข้อมูลด้วย fetch..." })
      const apiCourses = await fetchPostsWithFetch()
      setCourses(apiCourses)
      setMessage({ type: "success", text: "โหลดข้อมูลด้วย fetch สำเร็จ" })
    } catch (error) {
      setMessage({ type: "error", text: error.message })
    } finally {
      setLoading(false)
    }
  }

  const loadWithAxios = async () => {
    try {
      setLoading(true)
      setMessage({ type: "loading", text: "กำลังโหลดข้อมูลด้วย Axios..." })
      const apiCourses = await fetchPostsWithAxios()
      setCourses(apiCourses)
      setMessage({ type: "success", text: "โหลดข้อมูลด้วย Axios สำเร็จ" })
    } catch (error) {
      setMessage({ type: "error", text: "ไม่สามารถโหลดข้อมูลด้วย Axios ได้" })
    } finally {
      setLoading(false)
    }
  }

  const resetLocalCourses = () => {
    setCourses(initialCourses)
    setMessage({ type: "info", text: "กลับไปใช้ข้อมูลรายวิชาเริ่มต้นแล้ว" })
  }

  const submitCourseWithFetch = async (courseData) => {
    try {
      setSubmitting(true)
      setMessage({ type: "loading", text: "กำลังส่งข้อมูลไปยัง API..." })
      const createdCourse = await createPostWithFetch(courseData)
      setCourses([createdCourse, ...courses])
      setMessage({ type: "success", text: "ส่งข้อมูลด้วย fetch สำเร็จ" })
    } catch (error) {
      setMessage({ type: "error", text: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  const submitCourseWithAxios = async (courseData) => {
    try {
      setSubmitting(true)
      setMessage({ type: "loading", text: "กำลังส่งข้อมูลไปยัง API..." })
      const createdCourse = await createPostWithAxios(courseData)
      setCourses([createdCourse, ...courses])
      setMessage({ type: "success", text: "ส่งข้อมูลด้วย Axios สำเร็จ" })
    } catch (error) {
      setMessage({ type: "error", text: "ไม่สามารถส่งข้อมูลด้วย Axios ได้" })
    } finally {
      setSubmitting(false)
    }
  }

  const deleteCourse = (courseId) => {
    // เพิ่มการยืนยันก่อนลบ (เพิ่มรายการปรับแต่งที่ 2)
    const confirmDelete = window.confirm("ยืนยันการลบรายการนี้หรือไม่")
    if (!confirmDelete) {
      return
    }
    const updatedCourses = courses.filter((course) => course.id !== courseId)
    setCourses(updatedCourses)
    setMessage({ type: "info", text: "ลบข้อมูลออกจากรายการบนหน้าเว็บแล้ว" })
  }

  // ตัวแปรสำหรับข้อมูลที่ผ่านการกรอง (เพิ่มรายการปรับแต่งที่ 1)
  const filteredCourses = courses.filter((course) => {
    const keyword = searchText.toLowerCase()
    return (
      course.code.toLowerCase().includes(keyword) ||
      course.name.toLowerCase().includes(keyword) ||
      course.category.toLowerCase().includes(keyword)
    )
  })

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <ApiInfo />
        <section className="toolbar card">
          <div>
            <h2>เครื่องมือเชื่อมต่อ API</h2>
            <p>เลือกวิธีการโหลดข้อมูลจาก API หรือกลับไปใช้ข้อมูลเริ่มต้น</p>
          </div>
          <div className="button-group">
            <button onClick={loadWithFetch} disabled={loading}>
              โหลดด้วย fetch
            </button>
            <button onClick={loadWithAxios} disabled={loading}>
              โหลดด้วย Axios
            </button>
            <button className="secondary" onClick={resetLocalCourses}>
              ข้อมูลเริ่มต้น
            </button>
          </div>
        </section>

        {/* เรียกใช้ StatusMessage และฟังก์ชัน Clear (เพิ่มรายการปรับแต่งที่ 5) */}
        <StatusMessage 
          type={message.type} 
          message={message.text} 
          onClear={() => setMessage({ type: "", text: "" })} 
        />
        
        <CourseForm
          onSubmitCourse={submitCourseWithFetch}
          submitting={submitting}
        />
        <section className="card">
          <div className="section-heading">
            <h2>ทดลองส่งข้อมูลด้วย Axios</h2>
            <p>ปุ่มด้านล่างเป็นตัวอย่างการส่งข้อมูลคงที่ไปยัง API ด้วย Axios</p>
          </div>
          <button
            className="secondary"
            disabled={submitting}
            onClick={() =>
              submitCourseWithAxios({
                code: "412API",
                name: "การเชื่อมต่อ API ในเว็บแอปพลิเคชัน",
                englishName: "API Integration in Web Application",
                credit: "Lab",
                category: "Backend"
              })
            }
          >
            ส่งข้อมูลตัวอย่างด้วย Axios
          </button>
        </section>

        <div className="card">
          <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2>รายการข้อมูลรายวิชา</h2>
              {/* แสดงจำนวนรายการ (เพิ่มรายการปรับแต่งที่ 4) */}
              <p>พบรายวิชาทั้งหมด {filteredCourses.length} รายการ (จากทั้งหมด {courses.length})</p>
            </div>
            {/* ช่องค้นหา (เพิ่มรายการปรับแต่งที่ 1) */}
            <input 
              type="text" 
              placeholder="ค้นหารายวิชา..." 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: '300px' }}
            />
          </div>
        </div>

        <CourseList courses={filteredCourses} onDeleteCourse={deleteCourse} />
      </main>
      <Footer />
    </div>
  )
}
export default App