import React from "react";

function DashboardStats({ repairs }) {
  const totalCount = repairs.length;
  const pendingCount = repairs.filter(i => i.status === "รอดำเนินการ").length;
  const repairingCount = repairs.filter(i => i.status === "กำลังซ่อม").length;
  const completedCount = repairs.filter(i => i.status === "เสร็จสิ้น").length;

  return (
    <div className="dashboard-grid">
      <div className="stat-card">
        <h3>{totalCount}</h3>
        <p>📝 รายการแจ้งซ่อมทั้งหมด</p>
      </div>
      <div className="stat-card">
        <h3 style={{ color: "var(--danger-neon, #ef4444)" }}>{pendingCount}</h3>
        <p>⏳ รอดำเนินการ</p>
      </div>
      <div className="stat-card">
        <h3 style={{ color: "var(--warning-neon, #fbbf24)" }}>{repairingCount}</h3>
        <p>⚙️ กำลังประมวลผล / กำลังซ่อม</p>
      </div>
      <div className="stat-card">
        <h3 style={{ color: "var(--success-neon, #10b981)" }}>{completedCount}</h3>
        <p>✅ ซ่อมเสร็จสิ้น</p>
      </div>
    </div>
  );
}

export default DashboardStats;