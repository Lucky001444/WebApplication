function Header() { 
  const courseCode = "4123307";
  const courseName = "การพัฒนาเว็บแอปพลิเคชัน";

  return (
    <header className="header">
      <h1>{courseName}</h1>
      <p className="subtitle">รายวิชา {courseCode} Web Application Development</p>
      <p>Lab 6: JSX, Props และการแสดงผลข้อมูลใน React</p>
    </header>
  ); 
}

export default Header;