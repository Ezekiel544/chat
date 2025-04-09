export default function Jokeone(prop){
  console.log(prop);
    return(
         <>
           <header>{prop.setup}</header>
           <h3>{prop.punchline}</h3>
           <h5>{prop.num}</h5>
           <p>is this funny {prop.funny}</p>
           <hr />
           
         </>
    )
}