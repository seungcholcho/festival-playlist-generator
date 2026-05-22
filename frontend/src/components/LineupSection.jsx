export function LineupSection({ lineup, selectedDay, setSelectedDay, selectedArtists, toggleArtist, playlistLoading, onGeneratePlaylist }) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 space-y-4">
      {/* 페스티벌 이름 */}
      <h2 className="text-white font-black text-xl text-center">{lineup.festival_name}</h2>

      {/* 날짜 탭 */}
      <div className="flex gap-2">
        {lineup.days.map((day, idx) => (
          <button
            key={day.date}
            onClick={() => setSelectedDay(idx)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all active:scale-95
              ${selectedDay === idx
                ? 'bg-white text-purple-600'
                : 'bg-white/20 text-white hover:bg-white/30'
              }`}
          >
            {day.date}
          </button>
        ))}
      </div>

      {/* 아티스트 목록 */}
      <div className="space-y-2">
        {lineup.days[selectedDay].artists.map((artist) => {
          const selected = selectedArtists.includes(artist)
          return (
            <button
              key={artist}
              onClick={() => toggleArtist(artist)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all active:scale-95
                ${selected
                  ? 'bg-white text-purple-600 font-bold'
                  : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                ${selected ? 'bg-purple-600 border-purple-600' : 'border-white/50'}`}>
                {selected && <span className="text-white text-xs">✓</span>}
              </span>
              {artist}
            </button>
          )
        })}
      </div>

      {/* 선택된 아티스트 + 생성 버튼 */}
      {selectedArtists.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-white/20">
          <button
            onClick={onGeneratePlaylist}
            disabled={playlistLoading}
            className="w-full py-4 rounded-2xl font-black text-lg bg-white text-purple-600
              hover:bg-white/90 active:scale-95 transition-all disabled:opacity-40"
          >
            {playlistLoading ? '⏳ 생성 중...' : '🎶 플레이리스트 만들기'}
          </button>
        </div>
      )}
    </div>
  )
}