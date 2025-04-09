import { createRoot } from "react-dom/client";
import Jokeone from "./jokeone";
const root = createRoot(document.getElementById('root'))
root.render(
    <>
    <Jokeone
    setup = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti, necessite'
    punchline = 'the first punchline prop'
    num ={ 30}
    funny = {true}
    />

<Jokeone
    setup = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti, necessite'
    punchline = 'the second punchline prop'
    num ={ 32}
    funny = {false}
    />
     <Jokeone
    setup = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti, necessite'
    punchline = 'the third punchline prop'
    num ={160}
    funny = {false}
    />
  
    </>
)