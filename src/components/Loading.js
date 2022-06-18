import React from 'react'
import ReactLoading from 'react-loading'

export const Loading = () => {
  return (
    <div>
      {/* <ReactLoading
        type="spinningBubbles"
        color="#0000FF"
        height={100}
        width={50}
      /> */}
      {/* <ReactLoading type="cubes" color="#0000FF"
        height={100} width={50} delay={100}/> */}
      <ReactLoading type="spin" color="#0000FF"
        height={100} width={50} />
    </div>
  )
}
