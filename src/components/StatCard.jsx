function StatCard({ title, value, description, icon }) {
  return (
    <div className="stat-card">
      <h3>{icon} {value}</h3>
      <p className="stat-title">{title}</p>
      <p className="stat-description">{description}</p>
    </div>
  )
}

export default StatCard