import React, { useState, useEffect } from 'react'

import './Intro.scss'

class txtType {
  constructor(callback) {
    this.toRotate = ["Problem Solver", "Software Engineer", "Full Stack Developer"]
    this.loopNum = 0
    this.txt = ''
    this.isDeleting = false
    this.tick(callback)
  }
  tick(callback) {
    const i = this.loopNum % this.toRotate.length
    const fullTxt = this.toRotate[i]

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1)
    }
    else {
      this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    callback(this.txt)

    let delta = 200 - Math.random() * 100

    if (this.isDeleting) { delta /= 2} 

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = 2000
      this.isDeleting = true
    }
    else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false
      this.loopNum++
      delta = 500
    }

    setTimeout(() => {
      this.tick(callback)
    }, delta)
  }
}

const Intro = () => {
  const [txt, setTxt] = useState('')
  
  useEffect(() => {
    new txtType(setTxt)
  }, [])

  return (
    <div id="intro">
      <h1>Hi! I'm Bill <span className="handwave" role="img" aria-label="handwave">👋</span></h1>
      <h2>I am a&nbsp;<span className="typewrite">{txt}</span></h2>
    </div>
  )
}

export default Intro
