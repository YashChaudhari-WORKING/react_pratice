import { useState } from "react"

function App() {
  const [text,settext]= useState("");
  const [data,setdata]=useState({ hits: [] });
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [fav,setfav]=useState([]);
  async function handlesearch(){
    const link = `https://api.edamam.com/api/recipes/v2?type=public&q=${text}&app_id=faf56951&app_key=%20f219e935448a371b7d6b877c447e3e77%09&excluded=string`
    try {
       await fetch(link).then(response => response.json())
       .then(data => {
        setdata(data);
       })
    } catch (error) {
      console.log("try error",error);
    }
  }
  const toggleDescription = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
 };
  function handlefav(index){
    const s = data.hits[index];
    console.log(s.recipe.label);
    const result = fav.find(x=>x.text===s.recipe.label);
    if(!result){
      
      setfav([...fav,{text:s.recipe.label}]);
    }
    console.log(fav);
  }
  function handlefavdel(index){
   const result = fav.filter((x,i)=>{
   return x.text != fav[index].text;
   })
   setfav(result)
  }
  return (
    <>
    
  <div>
    <h1>find the recipe that you like</h1>
    <input type="text" onChange={(e)=>settext(e.target.value)}/>
    <button onClick={handlesearch}>search</button>
  </div>
  {data.hits.map((hit,index) => (
   <div key={hit.recipe.uri}>
      <img src={hit.recipe.images.THUMBNAIL.url} alt="not found" />
      <h3>{index+1} - {hit.recipe.label}</h3>
      <p>
        {expandedIndex === index ? (<><p>{hit.recipe.ingredientLines.join(', ')}</p>
      <button onClick={()=>handlefav(index)}>fav</button> </>): `...`}
               </p>
               <button onClick={() => toggleDescription(index)}>
                  {expandedIndex === index ? "Show Less" : "Show More"}
               </button>
      <p>----------------------------------------------------------------------------------------------</p>
   </div>
))}
<div>
      <h1>most fav items</h1>
      {
        fav.map((items,index)=>(
          <h6 key={index}>
            {items.text}
            <button onClick={()=>handlefavdel(index)}>delete</button>
          </h6>
        ))
      }
    </div>
    </>
  )
}
export default App
