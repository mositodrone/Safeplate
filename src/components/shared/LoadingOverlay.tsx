
const LoadingOverlay = ({loading}) => {
  return (
    // 🔥 LOADING OVERLAY
    <div>
      {loading && (
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin shadow-md" />
      )}
    </div>
  )
}

export default LoadingOverlay