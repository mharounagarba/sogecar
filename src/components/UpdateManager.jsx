import { useEffect, useState } from 'react'

export default function UpdateManager() {
  const [status, setStatus] = useState(null)
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    window.api.onUpdateAvailable(() => {
      setStatus('Mise à jour disponible...')
    })

    window.api.onUpdateProgress((p) => {
      setProgress(p.percent)
      setStatus(`Téléchargement : ${Math.round(p.percent)}%`)
    })

    window.api.onUpdateDownloaded(() => {
      setStatus('Mise à jour prête à installer')
    })
  }, [])

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, background: '#faf', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      {status && <p>{status}</p>}
      {progress && (
        <div style={{ background: '#eee', borderRadius: 4, overflow: 'hidden', width: 200 }}>
          <div style={{ background: '#0078D7', width: `${progress}%`, height: 8 }} />
        </div>
      )}
      {status === 'Mise à jour prête à installer' && (
        <button onClick={() => window.api.installUpdate()} style={{ marginTop: '1rem' }}>
          Redémarrer & mettre à jour
        </button>
      )}
    </div>
  )
}
