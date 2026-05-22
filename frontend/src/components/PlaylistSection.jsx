export function PlaylistSection({ playlist }) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 space-y-4">
      <h2 className="text-white font-black text-xl text-center">🎵 플레이리스트</h2>
      
      {playlist.playlist.map((item) => (
        <div key={item.artist} className="bg-white/10 rounded-2xl p-4 space-y-2">
          <h3 className="text-white font-black text-base">{item.artist}</h3>
          {item.tracks.length > 0 ? (
            <div className="space-y-1">
              {item.tracks.map((track, idx) => (
                <div key={track} className="flex items-center gap-3 py-1">
                  <span className="text-white/40 text-xs w-4">{idx + 1}</span>
                  <span className="text-white/90 text-sm">{track}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-sm">곡 정보를 찾을 수 없어요</p>
          )}
        </div>
      ))}
    </div>
  )
}