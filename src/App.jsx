import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import RegisterForm from "./components/RegisterForm";
import RegisterList from "./components/RegisterList";
import SummaryBox from "./components/SummaryBox";
import Footer from "./components/Footer";

function App() {
  const [registers, setRegisters] = useState([]);

  const addRegister = (newRegister) => {
    setRegisters([...registers, newRegister]);
  };

  const deleteRegister = (registerId) => {
    // [เพิ่มใหม่] การยืนยันก่อนลบข้อมูล
    const confirmDelete = window.confirm("คุณต้องการลบข้อมูลรายการนี้ใช่หรือไม่?");
    if (confirmDelete) {
      const updatedRegisters = registers.filter(
        (register) => register.id !== registerId
      );
      setRegisters(updatedRegisters);
    }
  };

  const clearAllRegisters = () => {
    // [เพิ่มใหม่] การยืนยันก่อนลบข้อมูลทั้งหมด
    const confirmClear = window.confirm("คุณแน่ใจหรือไม่ที่จะลบข้อมูลทั้งหมด?");
    if (confirmClear) {
      setRegisters([]);
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <SummaryBox registers={registers} />

        <RegisterForm onAddRegister={addRegister} />

        <div className="list-header">
          <h2>ข้อมูลที่บันทึกแล้ว</h2>
          {registers.length > 0 && (
            <button className="danger" onClick={clearAllRegisters}>
              ลบทั้งหมด
            </button>
          )}
        </div>

        <RegisterList
          registers={registers}
          onDeleteRegister={deleteRegister}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;