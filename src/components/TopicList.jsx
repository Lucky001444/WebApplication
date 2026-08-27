import TopicItem from "./TopicItem"

function TopicList({ topics, onToggleComplete, onDeleteTopic, onMarkAllCompleted }) {
  const completedCount = topics.filter((topic) => topic.completed).length
  const beginnerCount = topics.filter((topic) => topic.level === "Beginner").length
  const intermediateCount = topics.filter((topic) => topic.level === "Intermediate").length
  const advancedCount = topics.filter((topic) => topic.level === "Advanced").length

  return (
    <section className="card">
      <h2>รายการหัวข้อการเรียนรู้</h2>

      <div className="list-summary">
        <p>ทั้งหมด: {topics.length}</p>
        <p>Beginner: {beginnerCount}</p>
        <p>Intermediate: {intermediateCount}</p>
        <p>Advanced: {advancedCount}</p>
        <p>เรียนแล้ว: {completedCount}</p>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <button onClick={onMarkAllCompleted}>ทำเครื่องหมายว่าเรียนแล้วทั้งหมด</button>
      </div>

      {topics.length === 0 ? (
        <p className="empty-message">ยังไม่มีหัวข้อการเรียนรู้</p>
      ) : (
        <ul className="topic-list">
          {topics.map((topic) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              onToggleComplete={onToggleComplete}
              onDeleteTopic={onDeleteTopic}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default TopicList