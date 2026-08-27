function Footer({ studentName, studentId }) {
  return (
    <footer className="footer">
      <p>Lab 7: State และ Event Handling ใน React</p>
      <p>จัดทำโดย {studentName} ({studentId}) รายวิชา 4123307 การพัฒนาเว็บแอปพลิเคชัน</p>
    </footer>
  )
}

export default Footer