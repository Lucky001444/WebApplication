import React, { useState } from "react";

function RepairTable({ repairs, loading, onEdit, onUpdateStatus, onDelete, onExportCSV }) {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredRepairs = repairs.filter(item => {
    const matchSearch = item.device_name.toLowerCase().includes(searchText.toLowerCase()) ||
                        item.problem_desc.toLowerCase().includes(searchText.toLowerCase()) ||
                        item.reporter_name.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = (statusFilter === "ALL" || statusFilter === "") ? true : (item.status === statusFilter);
    return matchSearch && matchStatus;
  });

  return (
    <div className="table-card">
      <div className="toolbar">
        <h2>🗄️ ฐานข้อมูลงานซ่อม (DATABASE)</h2>
        <button className="btn-export" onClick={onExportCSV}>📥 สกัดข้อมูลเป็น CSV</button>
      </div>

      <div className="toolbar">
        <input className="search-box" type="text" placeholder="🔍 สแกนค้นหาชื่ออุปกรณ์, อาการ..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="ALL">แสดงสถานะทั้งหมด</option>
          <option value="รอดำเนินการ">รอดำเนินการ</option>
          <option value="กำลังซ่อม">กำลังซ่อม</option>
          <option value="เสร็จสิ้น">เสร็จสิ้น</option>
        </select>
      </div>

      {loading ? <div className="spinner"></div> : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>รหัส</th>
                <th>อุปกรณ์</th>
                <th>ปัญหา</th>
                <th>ผู้แจ้ง</th>
                <th>สถานะระบบ</th>
                <th>คำสั่งจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredRepairs.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px" }}>📡 ไม่พบข้อมูลในระบบ</td></tr>
              ) : (
                filteredRepairs.map((item) => (
                  <tr key={item.id}>
                    <td>#{item.id}</td>
                    <td style={{ color: "var(--primary-neon)" }}>{item.device_name}</td>
                    <td>{item.problem_desc}</td>
                    <td>{item.reporter_name}</td>
                    <td>
                      <span className={`badge ${item.status === "เสร็จสิ้น" ? "badge-completed" : item.status === "กำลังซ่อม" ? "badge-repairing" : "badge-pending"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {item.status !== "เสร็จสิ้น" && (
                          <button className="btn-success" onClick={() => onUpdateStatus(item.id, item.status)}>อัปเดต</button>
                        )}
                        {/* 🌟 เพิ่มปุ่มแก้ไขข้อมูล */}
                        <button style={{ padding: "8px 14px", fontSize: "13px" }} onClick={() => onEdit(item)}>แก้ไข</button>
                        <button className="btn-danger" onClick={() => onDelete(item.id)}>ลบ</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RepairTable;