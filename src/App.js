import React, { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { getStats } from './features/user/userSlice'

function App() {
  const stats = useSelector(state => state.user.stats)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [platform, setPlatform] = useState('pc')
  const [region, setRegion] = useState('us')
  const [tag, setTag] = useState('')

  useEffect(() => {
    if (stats) {
      console.log(stats)
      setLoading(false)
    }
  }, [stats])

  const fetchData = async () => {
    setLoading(true)
    const data = {
      platform,
      region,
      tag
    }
    const res = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
      })
      const json = await res.json()
      dispatch(getStats({platform, region, tag, stats: json}))
  }
  return (
    <div className='container'>
      <h1>Please enter your information:</h1>
      <form className='player-info'>
        <label htmlFor='platform'>Platform</label>
        <select name='platform' onChange={e => setPlatform(e.target.value)} value={platform}>
          <option value='pc'>PC</option>
        </select>
        <label htmlFor='region'>Region</label>
        <select name='region' onChange={e => setRegion(e.target.value)} value={region}>
          <option value='us'>US</option>
          <option value='eu'>EU</option>
        </select>
        <label htmlFor='tag'>Tag</label>
        <input type='text' value={tag} onChange={e => setTag(e.target.value)} placeholder='Enter your tag'/>
        <button type='button' onClick={fetchData}>Get stats</button>
      </form>
      {loading && 
        <p>Loading...</p>
      }
      {!loading && stats && 
      <>
      <h2>{stats.username}</h2>
        <div className='portrait'>
          <img src={stats.portrait} alt='Portrait' className='icon'/>
          <img src={stats.levelFrame} alt='Level Frame' className='border'/>
        </div>
        <h3>Level: {stats.level}</h3>
        <h3>Quickplay Time: {stats.playtime.quickplay}</h3>
        <h3>Comp Time: {stats.playtime.competitive}</h3>
      </>
      }
    </div>
  )
}

export default App
