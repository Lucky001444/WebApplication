import { useState, useEffect } from "react";
import { getRepairs, createRepair, updateRepairStatus, deleteRepair, updateRepairDetails } from "./services/api";
import DashboardStats from "./components/DashboardStats";
import RepairForm from "./components/RepairForm";
import RepairTable from "./components/RepairTable";
import "./App.css";

function App() {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [editingRepair, setEditingRepair] = useState(null);
  
  // 🌟 อัปเกรด State Modal ให้รองรับโหมด "กดยืนยัน (Confirm)" และรับฟังก์ชันไปทำงานต่อ
  const [modal, setModal] = useState({ 
    isOpen: false, 
    type: "success", 
    title: "", 
    message: "",
    isConfirm: false, 
    onConfirm: null 
  });
  
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [isLightMode]);

  const fetchRepairs = async () => {
    setLoading(true);
    try {
      const data = await getRepairs();
      setRepairs(data);
    } catch (err) {
      console.error("Failed to load repairs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepairs();
  }, []);

  const handleShowModal = (type, title, message) => {
    setModal({ isOpen: true, type, title, message, isConfirm: false, onConfirm: null });
  };

  const handleSubmitRepair = async (formData) => {
    try {
      if (editingRepair) {
        await updateRepairDetails(editingRepair.id, formData);
        setEditingRepair(null);
        handleShowModal("success", "✅ UPDATE SUCCESS", "แก้ไขข้อมูลการแจ้งซ่อมในระบบเรียบร้อยแล้ว");
      } else {
        await createRepair(formData);
        handleShowModal("success", "✅ SYSTEM UPDATED", "เพิ่มข้อมูลแจ้งซ่อมใหม่เข้าสู่ระบบเรียบร้อยแล้ว");
      }
      fetchRepairs();
    } catch (error) {
      handleShowModal("danger", "🚨 ERROR", "ไม่สามารถบันทึกข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่อ");
    }
  };

  const handleEdit = (repair) => {
    setEditingRepair(repair);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingRepair(null);
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "รอดำเนินการ" ? "กำลังซ่อม" : "เสร็จสิ้น";
    if (currentStatus === "เสร็จสิ้น") return;
    await updateRepairStatus(id, nextStatus);
    fetchRepairs();
  };

  // 🌟 ฟังก์ชัน 1: สั่งเปิด Modal ดีไซน์ของเราเพื่อถามยืนยันการลบ
  const handleDelete = (id) => {
    setModal({
      isOpen: true,
      type: "danger",
      title: "⚠️ CONFIRM PURGE",
      message: "ยืนยันการลบข้อมูลออกจากฐานข้อมูลโฮโลแกรม? การกระทำนี้ไม่สามารถย้อนกลับได้",
      isConfirm: true,
      onConfirm: () => executeDelete(id) // ส่งฟังก์ชันที่ 2 ไปให้ปุ่มยืนยัน
    });
  };

  // 🌟 ฟังก์ชัน 2: ทำการลบข้อมูลจริงๆ เมื่อผู้ใช้กดยืนยันใน Modal
  const executeDelete = async (id) => {
    try {
      await deleteRepair(id);
      fetchRepairs();
      handleShowModal("success", "🗑️ PURGE SUCCESS", "ลบข้อมูลออกจากระบบฐานข้อมูลเรียบร้อยแล้ว");
    } catch (error) {
      handleShowModal("danger", "🚨 ERROR", "ไม่สามารถลบข้อมูลได้ กรุณาตรวจสอบการเชื่อมต่อ");
    }
  };

  const exportToCSV = () => {
    const headers = ["ID", "ชื่ออุปกรณ์", "อาการเสีย", "ผู้แจ้ง", "สถานะ"];
    const rows = repairs.map(item => [
      item.id, `"${item.device_name}"`, `"${item.problem_desc}"`, `"${item.reporter_name}"`, item.status
    ]);
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Repair_Report_AI_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="glow-cursor" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}></div>

      <button 
        className="theme-toggle-btn" 
        onClick={() => setIsLightMode(!isLightMode)}
      >
        {isLightMode ? "🌙 DARK MATRIX" : "☀️ LIGHT MATRIX"}
      </button>

      {/* 🌟 โครงสร้าง Modal ที่สามารถแสดงปุ่มยืนยัน / ยกเลิก ได้ */}
      {modal.isOpen && (
        <div className="modal-overlay">
          <div className={`modal-content ${modal.type}`}>
            <h3 style={{ color: modal.type === "danger" ? "var(--danger-neon)" : "var(--success-neon)" }}>
              {modal.title}
            </h3>
            <p>{modal.message}</p>
            <div className="modal-actions">
              {modal.isConfirm ? (
                <>
                  <button onClick={modal.onConfirm} style={{ borderColor: "var(--danger-neon)", color: "var(--danger-neon)" }}>
                    ยืนยันลบ (CONFIRM)
                  </button>
                  <button onClick={() => setModal({ ...modal, isOpen: false })}>
                    ยกเลิก (CANCEL)
                  </button>
                </>
              ) : (
                <button onClick={() => setModal({ ...modal, isOpen: false })}>
                  รับทราบ (ACKNOWLEDGE)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="glitch-wrapper">
          <h1 className="glitch-text" data-text="[ Equipment Repair Request System ]">[ Equipment Repair Request System ]</h1>
        </div>
        
        <DashboardStats repairs={repairs} />
        
        <RepairForm 
          onSubmitForm={handleSubmitRepair} 
          editingRepair={editingRepair} 
          onCancelEdit={handleCancelEdit} 
          onShowModal={handleShowModal} 
        />
        
        <RepairTable 
          repairs={repairs} 
          loading={loading}
          onEdit={handleEdit}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
          onExportCSV={exportToCSV}
        />
      </div>
    </>
  );
}

export default App;