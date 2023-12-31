import React, { useEffect, useState } from 'react';
import { BsStopwatch } from 'react-icons/bs'
 
export default function MyCustomWidget() {
   const [stopwatchData, setStopwatchData] = useState([
  { id: 0, name: "Timer 1", time: 0, isRunning: false, lap: [], time_started: 0, pause: [] },
 ])
 const [selectedRow, setSelectedRow] = useState(0)

 useEffect(() => {
  const interval = setInterval(() => {
   setStopwatchData(stopwatchData.map((stopwatch) => {
    if (stopwatch.isRunning) {
     return { ...stopwatch, time: new Date() - stopwatch.time_started - stopwatch.pause.reduce((a, b) => a + b, 0) }
    }
    return stopwatch
   }))
  }, 10)
  return () => clearInterval(interval)
 }, [stopwatchData])
 const handleStart = (id) => {
  setStopwatchData(stopwatchData.map((stopwatch) => {
   if (stopwatch.id === id) {
    return { ...stopwatch, isRunning: true, time_started: new Date() - stopwatch.time - stopwatch.pause.reduce((a, b) => a + b, 0) }
   }
   return stopwatch
  }))
 }
 
 const handleStop = (id) => {
  setStopwatchData(stopwatchData.map((stopwatch) => {
   if (stopwatch.id === id) {
    return { ...stopwatch, isRunning: false, pause: [...stopwatch.pause, new Date() - stopwatch.time_started - stopwatch.pause.reduce((a, b) => a + b, 0)] }
   }
   return stopwatch
  }))
 }
 
 const handleReset = (id) => {
  setStopwatchData(stopwatchData.map((stopwatch) => {
   if (stopwatch.id === id) {
    return { ...stopwatch, time: 0, isRunning: false, lap: [] }
   }
   return stopwatch
  }))
 }
 
 const handleLap = (id) => {
  setStopwatchData(stopwatchData.map((stopwatch) => {
   if (stopwatch.id === id) {
    return { ...stopwatch, lap: [...stopwatch.lap, stopwatch.time] }
   }
   return stopwatch
  }))
 }
  return (
    <div className='stopwatch'>
      <div style={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
      <div style={{ textAlign: "left" }}>
       <h1 style={{ fontWeight: "bold", fontSize: 30 }}>Stopwatch</h1>
      </div>
     </div>
 
     <p className='main-time-label'>{stopwatchData[selectedRow]?.time > 0 ? new Date(stopwatchData[selectedRow]?.time).toISOString().slice(11, -1) : "00:00:00.000"}</p>
     <div className="main-button-controls">
      <button className={"control-buttons"} onClick={() => handleStart(stopwatchData[selectedRow].id)}>Start</button>
      <button className={"control-buttons"} onClick={() => handleLap(stopwatchData[selectedRow].id)}>Lap</button>
      <button className={"control-buttons"} onClick={() => handleStop(stopwatchData[selectedRow].id)}>Stop</button>
      <button className={"control-buttons"} onClick={() => handleReset(stopwatchData[selectedRow].id)}>Reset</button>
     </div>
     <p className='lap-label'>Laps</p>
     <div className='lap-container'>
      {stopwatchData[selectedRow]?.lap.length > 0 && stopwatchData[selectedRow]?.lap.map((lap, index) => (
       <div style={{ display: "flex", justifyContent: "space-between", width: "500px" }}>
        <p>Lap {index + 1}</p>
        <p className='lap-time-label' key={index}>{new Date(lap).toISOString().slice(11, -1)}</p>
       </div>
      ))}
     </div>
    </div>
  )
}