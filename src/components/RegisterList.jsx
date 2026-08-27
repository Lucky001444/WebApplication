import RegisterItem from "./RegisterItem";

function RegisterList({ registers, onDeleteRegister }) {
  return (
    <section>
      {registers.length === 0 ? (
        <div className="empty-message">ยังไม่มีข้อมูลการลงทะเบียน</div>
      ) : (
        <div className="register-list">
          {registers.map((register) => (
            <RegisterItem
              key={register.id}
              register={register}
              onDeleteRegister={onDeleteRegister}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default RegisterList;