export default function LearningPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Learning Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Courses</h2>
          <p>Your enrolled courses will appear here</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Progress</h2>
          <p>Your learning progress will be shown here</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Certificates</h2>
          <p>Your earned certificates will be listed here</p>
        </div>
      </div>
    </div>
  );
}