import React, { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import { ChevronDown, Flame } from 'lucide-react'

const LANGS = [
  { id: 'english',  flag: '🇺🇸', name: 'English'  },
  { id: 'japanese', flag: '🇯🇵', name: 'Japanese' },
  { id: 'korean',   flag: '🇰🇷', name: 'Korean'   },
]

function CoinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#92400e"/>
      <circle cx="12" cy="12" r="9" fill="#f59e0b"/>
      <circle cx="12" cy="12" r="7" fill="#fbbf24"/>
      <text x="12" y="16.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#78350f" fontFamily="serif">Q</text>
    </svg>
  )
}

export default function Header({ title }) {
  const { user, updateUser } = useApp()
  const [open, setOpen] = useState(false)
  const cur = LANGS.find(l => l.id === user?.language) || LANGS[0]

  return (
    <header style={{height:64,background:'rgba(13,17,23,.85)',backdropFilter:'blur(12px)',borderBottom:'1px solid #21262d',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',position:'sticky',top:0,zIndex:30}}>
      <h1 style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:20,color:'#fff'}}>{title}</h1>

      <div style={{display:'flex',alignItems:'center',gap:12}}>
        {user && (
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{display:'flex',alignItems:'center',gap:6,padding:'6px 12px',borderRadius:10,background:'rgba(249,115,22,.08)',border:'1px solid rgba(249,115,22,.18)'}}>
              <Flame size={13} color="#fb923c"/>
              <span style={{color:'#fb923c',fontWeight:700,fontSize:13}}>{user?.streak || 0}</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:6,padding:'6px 12px',borderRadius:10,background:'rgba(245,158,11,.08)',border:'1px solid rgba(245,158,11,.18)'}}>
              <CoinIcon/>
              <span style={{color:'#fbbf24',fontWeight:700,fontSize:13}}>{user?.coins || 0}</span>
            </div>
          </div>
        )}
        <div style={{position:'relative'}}>
          <button onClick={()=>setOpen(!open)} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 12px',borderRadius:10,background:'#161b22',border:'1px solid #21262d',color:'#fff',cursor:'pointer',fontSize:13,fontFamily:'Space Grotesk,sans-serif',transition:'border-color .15s'}} onMouseEnter={e=>e.currentTarget.style.borderColor='#30363d'} onMouseLeave={e=>e.currentTarget.style.borderColor='#21262d'}>
            <span style={{fontSize:18}}>{cur.flag}</span>
            <span style={{fontWeight:500}}>{cur.name}</span>
            <ChevronDown size={12} color="#8b949e" style={{transform:open?'rotate(180deg)':'none',transition:'transform .2s'}}/>
          </button>
          {open&&(
            <div style={{position:'absolute',right:0,top:'calc(100% + 8px)',background:'#161b22',border:'1px solid #21262d',borderRadius:12,overflow:'hidden',boxShadow:'0 20px 40px rgba(0,0,0,.5)',zIndex:50,minWidth:160}}>
              {LANGS.map(l=>(
                <button key={l.id} onClick={()=>{updateUser({language:l.id});setOpen(false);}} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 16px',width:'100%',background:'transparent',border:'none',color:l.id===cur.id?'#58a6ff':'#e6edf3',cursor:'pointer',fontSize:13,fontFamily:'Space Grotesk,sans-serif',textAlign:'left'}} onMouseEnter={e=>e.currentTarget.style.background='#21262d'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <span style={{fontSize:18}}>{l.flag}</span>{l.name}{l.id===cur.id&&<span style={{marginLeft:'auto'}}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
