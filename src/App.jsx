import { useEffect, useState } from "react"
import "./App.css"
import Header from "./components/Header"
import UsageTimer from "./components/UsageTimer"
import LearningForm from "./components/LearningForm"
import LearningList from "./components/LearningList"
import CourseLoader from "./components/CourseLoader"
import SummaryBox from "./components/SummaryBox"
import Footer from "./components/Footer"

const STORAGE_KEY = "lab9-learnings"

function App() {
  const [learnings, setLearnings] = useState([])

  // ✨ [ฟีเจอร์ 1 & 2] State สำหรับค้นหาและกรองหมวดหมู่
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("")

  // ✨ [ฟีเจอร์ 4] State สำหรับตรวจจับขนาดหน้าจอ
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // ✨ [ฟีเจอร์ 4 & 5] สร้าง Event Listener และ Cleanup Function สำหรับขนาดหน้าจอ
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener("resize", handleResize)

    // ✨ [ฟีเจอร์ 5] Cleanup Function
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // โหลดข้อมูลจาก LocalStorage
  useEffect(() => {
    const savedLearnings = localStorage.getItem(STORAGE_KEY)
    if (savedLearnings) {
      setLearnings(JSON.parse(savedLearnings))
    }
  }, [])

  // บันทึกข้อมูลลง LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(learnings))
  }, [learnings])

  // เปลี่ยน Title ของ Document
  useEffect(() => {
    document.title = `หัวข้อการเรียนรู้: ${learnings.length} รายการ`
  }, [learnings.length])

  const addLearning = (newLearning) => {
    setLearnings([...learnings, newLearning])
  }

  const toggleComplete = (learningId) => {
    const updatedLearnings = learnings.map((item) => {
      if (item.id === learningId) {
        return { ...item, completed: !item.completed }
      }
      return item
    })
    setLearnings(updatedLearnings)
  }

  const deleteLearning = (learningId) => {
    const updatedLearnings = learnings.filter((item) => item.id !== learningId)
    setLearnings(updatedLearnings)
  }

  const clearAllLearnings = () => {
    const confirmClear = window.confirm("ต้องการลบหัวข้อทั้งหมดหรือไม่")
    if (confirmClear) {
      setLearnings([])
    }
  }

  // ✨ [ฟีเจอร์ 3] ฟังก์ชันลบเฉพาะรายการที่เรียนรู้แล้ว
  const clearCompletedLearnings = () => {
    const confirmClear = window.confirm("ต้องการลบเฉพาะรายการที่เรียนรู้แล้วหรือไม่?")
    if (confirmClear) {
      const pendingLearnings = learnings.filter((item) => !item.completed)
      setLearnings(pendingLearnings)
    }
  }

  // ✨ [ฟีเจอร์ 1 & 2] กรองข้อมูลตามคำค้นหาและหมวดหมู่ ก่อนส่งไปแสดงผล
  const filteredLearnings = learnings.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = filterCategory === "" || item.category === filterCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="app">
      <Header />

      {/* ✨ [ฟีเจอร์ 4] UI แสดงขนาดหน้าจอ */}
      <div style={{ textAlign: "center", backgroundColor: "#e8f0fe", color: "#174ea6", padding: "10px", fontSize: "14px" }}>
        ความกว้างหน้าจอขณะนี้: <strong>{windowWidth} px</strong>
      </div>

      <main className="main-content">
        <UsageTimer />
        
        <SummaryBox learnings={learnings} />
        
        <LearningForm onAddLearning={addLearning} />

        {/* ✨ [ฟีเจอร์ 1 & 2] UI สำหรับช่องค้นหาและตัวกรอง */}
        <section className="card">
          <h2>ค้นหาและกรองหัวข้อ</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="ค้นหาชื่อหัวข้อ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">-- ทุกหมวดหมู่ --</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
            </select>
          </div>
        </section>

        <div className="list-toolbar">
          <h2>หัวข้อที่บันทึกไว้ ({filteredLearnings.length})</h2>

          {learnings.length > 0 && (
            <div style={{ display: "flex", gap: "10px" }}>
              {/* ✨ [ฟีเจอร์ 3] ปุ่มลบเฉพาะที่เสร็จแล้ว */}
              <button 
                onClick={clearCompletedLearnings} 
                style={{ backgroundColor: "#fbbc05", color: "#202124" }}
              >
                ล้างที่เรียนรู้แล้ว
              </button>
              
              <button className="danger" onClick={clearAllLearnings}>
                ลบทั้งหมด
              </button>
            </div>
          )}
        </div>

        {/* ใช้ filteredLearnings เพื่อแสดงข้อมูลที่ผ่านการกรองแล้ว */}
        <LearningList
          learnings={filteredLearnings}
          onToggleComplete={toggleComplete}
          onDeleteLearning={deleteLearning}
        />

        <CourseLoader />
      </main>

      <Footer />
    </div>
  )
}

export default App