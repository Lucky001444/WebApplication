import pool from "../config/db.js";

export const getRepairs = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM repair_requests ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

export const createRepair = async (req, res) => {
  try {
    const { device_name, problem_desc, reporter_name } = req.body;
    if (!device_name || !problem_desc || !reporter_name) return res.status(400).json({ message: "กรอกข้อมูลไม่ครบ" });
    
    const [result] = await pool.query(
      "INSERT INTO repair_requests (device_name, problem_desc, reporter_name) VALUES (?, ?, ?)",
      [device_name, problem_desc, reporter_name]
    );
    res.status(201).json({ id: result.insertId, device_name, problem_desc, reporter_name, status: "รอดำเนินการ" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query("UPDATE repair_requests SET status = ? WHERE id = ?", [status, id]);
    res.json({ message: "อัปเดตสถานะสำเร็จ" });
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};

export const deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM repair_requests WHERE id = ?", [id]);
    res.json({ message: "ลบข้อมูลสำเร็จ" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data" });
  }
};

export const updateRepairDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { device_name, problem_desc, reporter_name } = req.body;
    
    if (!device_name || !problem_desc || !reporter_name) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    await pool.query(
      "UPDATE repair_requests SET device_name = ?, problem_desc = ?, reporter_name = ? WHERE id = ?",
      [device_name, problem_desc, reporter_name, id]
    );
    res.json({ message: "อัปเดตข้อมูลรายละเอียดสำเร็จ" });
  } catch (error) {
    res.status(500).json({ message: "Error updating repair details" });
  }
};