// เพิ่มปุ่ม Clear Message (เพิ่มรายการปรับแต่งที่ 5)
function StatusMessage({ type, message, onClear }) {
  if (!message) {
    return null
  }
  return (
    <div className={`status-message ${type}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>{message}</span>
      <button 
        onClick={onClear} 
        style={{ background: 'transparent', color: 'inherit', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        ✕
      </button>
    </div>
  )
}
export default StatusMessage