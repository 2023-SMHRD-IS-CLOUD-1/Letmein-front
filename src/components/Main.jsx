import React, { useEffect, useState } from 'react'
import { SectionsContainer, Section } from 'react-fullpage';
import img1 from '../images/Main.gif'
import img2 from '../images/001.png'
import img3 from '../images/002.png'
import '../css/main.css';
const Main = () => {
  const [Title, setTitle] = useState('');
  const [count, setCount] = useState(0);
  const completionWord = "Meet your own fashion coordinator at Let Me In";

  useEffect(()=>{
    const typingInterval = setInterval(()=>{
      setTitle((prevTitleValue)=> {
        let result = prevTitleValue ? prevTitleValue + completionWord[count] : completionWord[0];
        setCount(count+1)

        if (count >= completionWord.length) {
          setCount(0);
          setTitle('');
        }
        return result;
      });
    },150);
    return () => {
      clearInterval(typingInterval);
    }
  })
  const options = {
    activeClass: 'active', // the class that is appended to the sections links
    anchors: ['One', 'Two', 'Three'], // the anchors for each sections
    arrowNavigation: true, // use arrow keys
    navigation: false, // use dots navigatio
    scrollBar: false, // use the browser default scrollbar
    delay : 800
  };

  useEffect(()=>{
    const typingInterval = setInterval(()=>{
      setTitle((prevTitleValue)=> {
        let result = prevTitleValue ? prevTitleValue + completionWord[count] : completionWord[0];
        setCount(count+1)

        if (count >= completionWord.length) {
          setCount(0);
          setTitle('');
        }
        return result;
      });
    },150);
    return () => {
      clearInterval(typingInterval);
    }
  })

  return (
    <div className='main-container'>
    <div style={{ position: 'relative', width: 'auto' , height:'730px'}}>
     
      <SectionsContainer {...options}>
        <Section>
          <img src={img1} style={{width:'480px',height:'750px'}}/>
          </Section>
        <Section>
          <img src={img2} style={{width:'480px'}}/>
        </Section>
        <Section><img src={img3} style={{width:'480px'}}/></Section>
     </SectionsContainer>
    </div>
    </div>
  )
}

export default Main