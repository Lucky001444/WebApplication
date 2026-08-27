function RegisterItem({ register, onDeleteRegister }) {
  return (
    <article className="register-item">
      <div className="register-header">
        <h3>{register.fullName}</h3>
        <span className={`skill-badge ${register.skillLevel.toLowerCase()}`}>
          {register.skillLevel}
        </span>
      </div>

      <div className="register-detail">
        <p><strong>รหัสนักศึกษา:</strong> {register.studentId}</p>
        {/* [เพิ่มใหม่] แสดงเบอร์โทรศัพท์ */}
        <p><strong>เบอร์โทรศัพท์:</strong> {register.phone}</p>
        <p><strong>อีเมล:</strong> {register.email}</p>
        <p><strong>ชั้นปี:</strong> {register.year}</p>
        <p><strong>หัวข้อที่สนใจ:</strong> {register.topic}</p>
        <p><strong>เป้าหมาย:</strong> {register.learningGoal}</p>
      </div>

      <button
        className="danger"
        onClick={() => onDeleteRegister(register.id)}
      >
        ลบข้อมูล
      </button>
    </article>
  );
}

export default RegisterItem;