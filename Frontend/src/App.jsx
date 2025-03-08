import React, { useEffect, useState } from 'react'
import './App.css'
import Editor from 'react-simple-code-editor'
import 'prismjs/themes/prism-tomorrow.css'
import prism from 'prismjs'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'
import axios from 'axios'

const App = () => {

  const [code, setCode] = useState
  (`function sum(){
    return 1+1
  }`)

  const [review, setReview] =  useState(' ')
  const [loading, setLoading] = useState(false);


  useEffect(()=>{
    prism.highlightAll()
  },[])

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      setReview(response.data);
    } catch (error) {
      console.error('Error fetching review:', error);
      setReview('Error fetching review. Please try again.');
    } finally{
      setLoading(false)
    }
  
    
  }
  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize : 16,
              // border: 'none', /* Remove border */
              // outline: 'none', /* Remove focus outline */
              borderRadius : 5,
              height : "100%",
              width : "100%",
              
            }}
          >
            

          </Editor>
        </div>
        <button  type='submit' onClick={reviewCode} className='btn'>Review</button>
      </div>
      <div className="right">
      {loading ? <p className='loading'>Responding</p> : <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>}
      </div>
    </main>
  )
}



export default App
