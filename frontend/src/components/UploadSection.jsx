export function UploadSection({ preview, loading, onFileChange, onSubmit }) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 space-y-4">
      {/* 이미지 업로드 영역 */}
      <label className="block cursor-pointer">
        <div className="border-2 border-dashed border-white/50 rounded-2xl p-8 text-center hover:border-white transition-colors">
          {preview ? (
            <img src={preview} alt="preview" className="w-full rounded-xl object-cover max-h-64" />
          ) : (
            <div className="space-y-2">
              <div className="text-4xl">🎪</div>
              <p className="text-white font-bold text-lg">라인업 포스터 업로드</p>
              <p className="text-white/60 text-sm">탭해서 사진 선택</p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
        />
      </label>

      {/* 분석 버튼 */}
      <button
        onClick={onSubmit}
        disabled={!preview || loading}
        className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all
          bg-white text-purple-600 hover:bg-white/90 active:scale-95
          disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span> 분석 중...
          </span>
        ) : '🔍 라인업 분석하기'}
      </button>
    </div>
  )
}