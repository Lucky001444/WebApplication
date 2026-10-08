import React, { useState, useEffect } from "react";

function RepairForm({ onSubmitForm, editingRepair, onCancelEdit, onShowModal }) {
  const [formData, setFormData] = useState({ device_name: "", problem_desc: "", reporter_name: "" });

  useEffect(() => {
    if (editingRepair) {
      setFormData({
        device_name: editingRepair.device_name,
        problem_desc: editingRepair.problem_desc,
        reporter_name: editingRepair.reporter_name
      });
    } else {
      setFormData({ device_name: "", problem_desc: "", reporter_name: "" });
    }
  }, [editingRepair]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.device_name || !formData.problem_desc || !formData.reporter_name) {
      // 🌟 เปลี่ยนจาก alert เป็นการเรียกใช้ Modal กลางจอ
      return onShowModal("danger", "🚨 ACCESS DENIED", "กรุณากรอกข้อมูลให้ครบทุกช่อง");
    }
    await onSubmitForm(formData);
    setFormData({ device_name: "", problem_desc: "", reporter_name: "" });
  };

  return (
    <div className="form-card" style={{ borderColor: editingRepair ? "var(--warning-neon)" : "var(--border-neon)" }}>
      <h2 style={{ color: editingRepair ? "var(--warning-neon)" : "var(--text-main)" }}>
        {editingRepair ? "✏️ แก้ไขข้อมูลแจ้งซ่อม (EDIT MODE)" : "➕ เพิ่มรายการแจ้งซ่อมใหม่ลงระบบ"}
      </h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input name="device_name" value={formData.device_name} onChange={handleChange} placeholder="ชื่ออุปกรณ์ / รหัสครุภัณฑ์ (เช่น PC-01, Notebook)" />
        <textarea name="problem_desc" value={formData.problem_desc} onChange={handleChange} placeholder="รายละเอียดอาการเสียหรือปัญหาที่พบ..." rows="3"></textarea>
        <input name="reporter_name" value={formData.reporter_name} onChange={handleChange} placeholder="ชื่อผู้แจ้งซ่อม / สังกัด" />
        
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={{ flex: 1, borderColor: editingRepair ? "var(--warning-neon)" : "var(--primary-neon)", color: editingRepair ? "var(--warning-neon)" : "var(--primary-neon)" }}>
            {editingRepair ? "บันทึกการแก้ไข (UPDATE)" : "ส่งคำสั่งแจ้งซ่อม (INITIALIZE)"}
          </button>
          
          {editingRepair && (
            <button type="button" className="btn-danger" onClick={onCancelEdit} style={{ flex: 0.3 }}>
              ยกเลิก
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default RepairForm;