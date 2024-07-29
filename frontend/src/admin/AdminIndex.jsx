import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CanvasJSReact from '@canvasjs/react-charts'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

const AdminIndex = () => {
  const [topUsers, setTopUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/admin/top-users')
      .then(response => {
        setTopUsers(response.data)
        console.log(response.data[0]['postCount'])
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  var options = {}

  if (topUsers.length > 0) {
    options = {
      exportEnabled: true,
      animationEnabled: true,
      // title: {
      //   text: "Website Traffic Sources"
      // },
      data: [{
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y} posts",
        // showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y} posts",
        dataPoints: [
          { y: topUsers[0]['postCount'], label: topUsers[0]['authorUsername'] },
          { y: topUsers[1]['postCount'], label: topUsers[1]['authorUsername'] },
          { y: topUsers[2]['postCount'], label: topUsers[2]['authorUsername'] },
        ]
      }]
    }
  }


  return (
    <div className='text-center mb-10'>
      <h1>Top 3 users</h1>
      {
        topUsers.length > 0 ? (
          <CanvasJSChart options={options} />
        ) : (
          <div>No top users found.</div>
        )
      }
    </div>
  )
}

export default AdminIndex