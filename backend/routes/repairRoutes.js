import express from "express";
import { 
  getRepairs, 
  createRepair, 
  updateStatus, 
  deleteRepair,
  updateRepairDetails 
} from "../controllers/repairController.js";

const router = express.Router();

router.get("/", getRepairs);
router.post("/", createRepair);
router.put("/:id", updateStatus); // สำหรับเปลี่ยนสถานะ
router.put("/:id/details", updateRepairDetails); // 🌟 เพิ่ม Route ใหม่สำหรับแก้ไขข้อมูลเต็ม
router.delete("/:id", deleteRepair);

export default router;