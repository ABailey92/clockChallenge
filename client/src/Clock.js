import { useState, useEffect } from 'react'
import styled from 'styled-components'

// styled components includes keyframes which allows for the use of css animations with styled components
import { keyframes } from 'styled-components'

//This animation moves the item downward from -5px initially(0%) to back at the starting point(0px). Time is indicated by the opacity change. Translate can move an item on the Y axis (vertically) or X axis (horizontally)

const animation = keyframes`
0%{
  transform: translateY(-5px);
  opacity: 0.5
}

100%{
  transform: translateY(0px);
  opacity: 1
}
`

const Container = styled.div`
height: 100vh;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
color: #e76f51;
`

const ClockFace = styled.div`

display: flex;
padding: 2.5rem;
background: url('https://lenadesign.org/wp-content/uploads/2020/05/screenshot-2020-05-06-at-19.24.17.png') no-repeat fixed center; ;
border-top: 2px solid #e76f51;
border-left: 2;
border-radius: 10px;
align-items: center;
justify-content: center;
font-size: 10vh;
box-shadow: 10px 20px 50px #e9c46a;
min-width: 500px;

`


const SecondsDiv = styled.div`
margin: 2px;
padding: 5px;
animation: ${animation} 1s linear infinite;
`

//format time takes the date and makes it into an array of strings separated by the colon
const formatTime = (times) => {
  return times.split(/[\s, :]/)
}

//the minutes div will not being running until 60 seconds pass which is indicated by seconds div equaling '00'

const MinutesDiv = styled.div`
margin: 2px;
padding: 5px;
animation: ${animation} 1s linear infinite;
animation-play-state: ${() => { return formatTime(new Date().toLocaleString())[ 4 ] !== '00' && 'paused'}}
`

// similarily the hour div will not begin running until both minute and seconds div are '00'

const HourDiv = styled.div`
margin: 2px;
padding: 5px;
animation: ${animation} 1s linear infinite;
animation-play-state: ${() => { return formatTime(new Date().toLocaleString())[ 3 ] !== '00' || formatTime(new Date().toLocaleString())[ 4 ] !== '00' ? 'paused' : 'running'}}
`



const Clock = () => {
  const [ time, setTime ] = useState(new Date())
  
  
  const updateTime = () => {
    setTime(new Date())
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      updateTime()
    }, 1000)
    
    return () => {
      clearInterval(interval)
    }
  })
  
  
  return (
    <div>
      <Container>
        <ClockFace>

      <HourDiv>
        { formatTime(time.toLocaleTimeString())[ 0 ] }
          </HourDiv>
          :
      <MinutesDiv>
        { formatTime(time.toLocaleTimeString())[ 1 ] }
          </MinutesDiv>
          :
      <SecondsDiv>
        { formatTime(time.toLocaleTimeString())[ 2] }
          </SecondsDiv>
          <div>
            {' '}
          </div>
      <div>
        { formatTime(time.toLocaleTimeString())[ 3 ] }
          </div>
        </ClockFace>
      </Container>
    </div>
  )
}

export default Clock
