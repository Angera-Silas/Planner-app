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
 
  return (
    <div>
       
    </div>
  )
}