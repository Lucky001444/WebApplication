import { useState } from "react";

const initialFormData = {
  fullName: "",
  studentId: "",
  phone: "", // [เพิ่มใหม่] Field เบอร์โทรศัพท์
  email: "",
  year: "",
  topic: "",
  skillLevel: "Beginner",
  learningGoal: "",
  agree: false,
};

function RegisterForm({ onAddRegister }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const maxGoalLength = 200; // [เพิ่มใหม่] กำหนดความยาวสูงสุด

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.fullName.trim() === "") {
      newErrors.fullName = "กรุณากรอกชื่อ - สกุล";
    }

    if (formData.studentId.trim() === "") {
      newErrors.studentId = "กรุณากรอกรหัสนักศึกษา";
    } else if (formData.studentId.trim().length < 6) {
      newErrors.studentId = "รหัสนักศึกษาควรมีอย่างน้อย 6 ตัวอักษร";
    }

    // [เพิ่มใหม่] Validation เบอร์โทรศัพท์
    if (formData.phone.trim() === "") {
      newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก (ตัวเลขเท่านั้น)";
    }

    // [เพิ่มใหม่] ตรวจสอบอีเมลด้วย Regular Expression
    if (formData.email.trim() === "") {
      newErrors.email = "กรุณากรอกอีเมล";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    if (formData.year === "") {
      newErrors.year = "กรุณาเลือกชั้นปี";
    }

    if (formData.topic === "") {
      newErrors.topic = "กรุณาเลือกหัวข้อที่สนใจ";
    }

    if (formData.learningGoal.trim() === "") {
      newErrors.learningGoal = "กรุณาระบุเป้าหมายการเรียนรู้";
    } else if (formData.learningGoal.trim().length < 10) {
      newErrors.learningGoal = "เป้าหมายการเรียนรู้ควรมีอย่างน้อย 10 ตัวอักษร";
    }

    if (!formData.agree) {
      newErrors.agree = "กรุณายืนยันความถูกต้องของข้อมูล";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newRegister = {
      id: Date.now(),
      ...formData,
    };

    onAddRegister(newRegister);
    setFormData(initialFormData);
    setErrors({});
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <section className="card">
      <h2>แบบฟอร์มลงทะเบียนความสนใจ</h2>
      <p className="section-description">
        กรอกข้อมูลให้ครบถ้วนเพื่อบันทึกความสนใจในการเรียนรู้หัวข้อด้านเว็บแอปพลิเคชัน
      </p>
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="fullName">ชื่อ - สกุล</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="กรอกชื่อ - สกุล"
            />
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="studentId">รหัสนักศึกษา</label>
            <input
              id="studentId"
              name="studentId"
              type="text"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="กรอกรหัสนักศึกษา"
            />
            {errors.studentId && <p className="error-message">{errors.studentId}</p>}
          </div>

          {/* [เพิ่มใหม่] Field เบอร์โทรศัพท์ */}
          <div className="form-group">
            <label htmlFor="phone">เบอร์โทรศัพท์</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="08X-XXX-XXXX"
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">อีเมล</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="year">ชั้นปี</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="">-- เลือกชั้นปี --</option>
              <option value="ปี 1">ปี 1</option>
              <option value="ปี 2">ปี 2</option>
              <option value="ปี 3">ปี 3</option>
              <option value="ปี 4">ปี 4</option>
            </select>
            {errors.year && <p className="error-message">{errors.year}</p>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="topic">หัวข้อที่สนใจ</label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
          >
            <option value="">-- เลือกหัวข้อ --</option>
            <option value="HTML, CSS และ JavaScript">HTML, CSS และ JavaScript</option>
            <option value="React Component">React Component</option>
            <option value="React State และ Event Handling">React State และ Event Handling</option>
            <option value="React Form และ Validation">React Form และ Validation</option>
            <option value="API และ Backend">API และ Backend</option>
          </select>
          {errors.topic && <p className="error-message">{errors.topic}</p>}
        </div>

        <div className="form-group">
          <label>ระดับทักษะปัจจุบัน</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="skillLevel"
                value="Beginner"
                checked={formData.skillLevel === "Beginner"}
                onChange={handleChange}
              />
              Beginner
            </label>
            <label>
              <input
                type="radio"
                name="skillLevel"
                value="Intermediate"
                checked={formData.skillLevel === "Intermediate"}
                onChange={handleChange}
              />
              Intermediate
            </label>
            <label>
              <input
                type="radio"
                name="skillLevel"
                value="Advanced"
                checked={formData.skillLevel === "Advanced"}
                onChange={handleChange}
              />
              Advanced
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="learningGoal">เป้าหมายการเรียนรู้</label>
          <textarea
            id="learningGoal"
            name="learningGoal"
            value={formData.learningGoal}
            onChange={handleChange}
            placeholder="ระบุสิ่งที่ต้องการเรียนรู้หรือพัฒนาจากหัวข้อนี้"
            rows="4"
            maxLength={maxGoalLength}
          ></textarea>
          {/* [เพิ่มใหม่] แสดงตัวอักษรคงเหลือ */}
          <small style={{ color: "#5f6368", textAlign: "right" }}>
            คงเหลือ: {maxGoalLength - formData.learningGoal.length} / {maxGoalLength} ตัวอักษร
          </small>
          {errors.learningGoal && <p className="error-message">{errors.learningGoal}</p>}
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            ข้าพเจ้ายืนยันว่าข้อมูลที่กรอกถูกต้อง
          </label>
          {errors.agree && <p className="error-message">{errors.agree}</p>}
        </div>

        <div className="form-preview">
          <h3>ตัวอย่างข้อมูลจาก Form</h3>
          <p><strong>ชื่อ:</strong> {formData.fullName || "-"}</p>
          <p><strong>รหัสนักศึกษา:</strong> {formData.studentId || "-"}</p>
          <p><strong>หัวข้อที่สนใจ:</strong> {formData.topic || "-"}</p>
          <p><strong>ระดับทักษะ:</strong> {formData.skillLevel}</p>
        </div>

        <div className="button-group">
          <button type="submit">บันทึกข้อมูล</button>
          <button type="button" className="secondary" onClick={handleReset}>
            ล้างข้อมูล
          </button>
        </div>
      </form>
    </section>
  );
}

export default RegisterForm;