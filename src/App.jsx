import { useState } from "react"
import "./App.css"
import Header from "./components/Header"
import StudentProfile from "./components/StudentProfile"
import ProgressCounter from "./components/ProgressCounter"
import TopicForm from "./components/TopicForm"
import TopicList from "./components/TopicList"
import Footer from "./components/Footer"

function App() {
  const [topics, setTopics] = useState([
    { id: 1, name: "เข้าใจแนวคิด State", level: "Beginner", completed: true },
    { id: 2, name: "ใช้ Event Handling กับปุ่ม", level: "Beginner", completed: false },
    { id: 3, name: "จัดการข้อมูล Array ด้วย State", level: "Intermediate", completed: false }
  ])

  const addTopic = (newTopic) => {
    setTopics([...topics, newTopic])
  }

  const toggleComplete = (topicId) => {
    const updatedTopics = topics.map((topic) => {
      if (topic.id === topicId) {
        return { ...topic, completed: !topic.completed }
      }
      return topic
    })
    setTopics(updatedTopics)
  }

  const deleteTopic = (topicId) => {
    const updatedTopics = topics.filter((topic) => topic.id !== topicId)
    setTopics(updatedTopics)
  }

  const markAllCompleted = () => {
    const updatedTopics = topics.map((topic) => ({
      ...topic,
      completed: true
    }))
    setTopics(updatedTopics)
  }

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <StudentProfile />
        <ProgressCounter />
        <TopicForm onAddTopic={addTopic} />
        <TopicList
          topics={topics}
          onToggleComplete={toggleComplete}
          onDeleteTopic={deleteTopic}
          onMarkAllCompleted={markAllCompleted}
        />
      </main>

      <Footer studentName="ใส่ชื่อ-นามสกุลจริงของคุณ" studentId="ใส่รหัสนักศึกษาของคุณ" />
    </div>
  )
}

export default App