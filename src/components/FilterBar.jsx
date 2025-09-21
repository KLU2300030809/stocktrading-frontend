// FilterBar.jsx
export default function FilterBar({ onFilter }) {
  return (
    <div style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="Search stock..."
        onChange={(e) => onFilter(e.target.value)}
      />
    </div>
  );
}
