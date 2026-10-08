const API_URL = import.meta.env.VITE_API_URL;

export const getRepairs = async () => {
  const res = await fetch(`${API_URL}/repairs`);
  return res.json();
};

export const createRepair = async (data) => {
  const res = await fetch(`${API_URL}/repairs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("บันทึกข้อมูลไม่สำเร็จ");
  return res.json();
};

export const updateRepairStatus = async (id, status) => {
  await fetch(`${API_URL}/repairs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
};

export const deleteRepair = async (id) => {
  await fetch(`${API_URL}/repairs/${id}`, { method: "DELETE" });
};

// ... โค้ดเดิมข้างบน

export const updateRepairDetails = async (id, data) => {
  // สมมติว่า Backend มี Route รองรับการแก้ไขข้อมูลแบบเต็ม (หาก API หลักใช้ PUT /:id สำหรับเปลี่ยนสถานะ)
  // ในที่นี้จะสร้าง endpoint ย่อย /details เพื่อแยกจากการแก้อัปเดตสถานะเฉยๆ
  const res = await fetch(`${API_URL}/repairs/${id}/details`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("แก้ไขข้อมูลไม่สำเร็จ");
  return res.json();
};