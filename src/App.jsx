import "./App.css";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";

//import images and fonts 
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

const fontFace = new FontFace(
  "Kunstler",
  `url(${base}/fonts/KUNSTLER.TTF)`
);

fontFace.load().then(() => {
  document.fonts.add(fontFace);
});

//image array
const initialImages = [
  { id: 1, url: `${base}/images/raspberry.png`, title: "Raspberry" },
  { id: 2, url: `${base}/images/aloe.png`, title: "Aloe" },
  { id: 3, url: `${base}/images/coffee.png`, title: "Coffee" },
  { id: 4, url: `${base}/images/nailpolish.png`, title: "Nail Polish" },
  { id: 5, url: `${base}/images/firewood.png`, title: "Firewood" },
  { id: 6, url: `${base}/images/cake.png`, title: "Cake" },
   { id: 7, url: `${base}/images/ginger.png`, title: "Ginger" },
  { id: 8, url: `${base}/images/milk.png`, title: "Milk" },
  { id: 9, url: `${base}/images/hay.png`, title: "Hay" },
  { id: 10, url: `${base}/images/mint.png`, title: "Mint" },
  { id: 11, url: `${base}/images/ink.png`, title: "Ink" },
  { id: 12, url: `${base}/images/gummy.png`, title: "Gummy" },
  { id: 13, url: `${base}/images/lemon.png`, title: "Lemon" },
  { id: 14, url: `${base}/images/cherryblossom.png`, title: "Cherry Blossom" },
  { id: 15, url: `${base}/images/aluminum.png`, title: "Aluminum" },
  { id: 16, url: `${base}/images/sunscreen.png`, title: "Sunscreen" },
   { id: 17, url: `${base}/images/vanilla.png`, title: "Vanilla" },
  { id: 18, url: `${base}/images/cedar.png`, title: "Cedar" },
  { id: 19, url: `${base}/images/creamsoda.png`, title: "Cream Soda" },
  { id: 20, url: `${base}/images/soil.png`, title: "Soil" },
  { id: 21, url: `${base}/images/clover.png`, title: "Clover" },
  { id: 22, url: `${base}/images/laundry.png`, title: "Laundry" },
  { id: 23, url: `${base}/images/melon.png`, title: "Melon" },
  { id: 24, url: `${base}/images/rose.png`, title: "Rose" },
  { id: 25, url: `${base}/images/mirepoix.png`, title: "Mirepoix" },
  { id: 26, url: `${base}/images/ocean.png`, title: "Ocean" },
  { id: 27, url: `${base}/images/gasoline.png`, title: "Gasoline" },
  { id: 28, url: `${base}/images/pine.png`, title: "Pine" },
  { id: 29, url: `${base}/images/cowhide.png`, title: "Cowhide" },
  { id: 30, url: `${base}/images/lilac.png`, title: "Lilac" },
  { id: 31, url: `${base}/images/mildew.png`, title: "Mildew" },
  { id: 32, url: `${base}/images/bubblegum.png`, title: "Bubblegum" },
  { id: 33, url: `${base}/images/pineapple.png`, title: "Pineapple" },
  { id: 34, url: `${base}/images/greentea.png`, title: "Green Tea" },
  { id: 35, url: `${base}/images/tobacco.png`, title: "Tobacco" },
  { id: 36, url: `${base}/images/rubber.png`, title: "Rubber" },
  { id: 37, url: `${base}/images/honey.png`, title: "Honey" },
  { id: 38, url: `${base}/images/cinnamon.png`, title: "Cinnamon" },
  { id: 39, url: `${base}/images/grass.png`, title: "Grass" },
  { id: 40, url: `${base}/images/plastic.png`, title: "Plastic" },
  { id: 41, url: `${base}/images/jasmine.png`, title: "Jasmine" },
  { id: 42, url: `${base}/images/wax.png`, title: "Wax" },
  { id: 43, url: `${base}/images/graphite.png`, title: "Graphite" },
  { id: 44, url: `${base}/images/bamboo.png`, title: "Bamboo" },
  { id: 45, url: `${base}/images/paint.png`, title: "Paint" },
  { id: 46, url: `${base}/images/almond.png`, title: "Almond" },
  { id: 47, url: `${base}/images/lavender.png`, title: "Lavender" },
  { id: 48, url: `${base}/images/marshmallow.png`, title: "Marshmallow" },
  { id: 49, url: `${base}/images/parchment.png`, title: "Parchment" },
  { id: 50, url: `${base}/images/apple.png`, title: "Apple" },
  { id: 51, url: `${base}/images/chlorine.png`, title: "Chlorine" },
  { id: 52, url: `${base}/images/popcorn.png`, title: "Popcorn" },
  { id: 53, url: `${base}/images/coconut.png`, title: "Coconut" },
  { id: 54, url: `${base}/images/wool.png`, title: "Wool" },
  { id: 55, url: `${base}/images/cherry.png`, title: "Cherry" },
  { id: 56, url: `${base}/images/curry.png`, title: "Curry" },
  { id: 57, url: `${base}/images/lime.png`, title: "Lime" },
  { id: 58, url: `${base}/images/blood.png`, title: "Blood" },
  { id: 59, url: `${base}/images/toast.png`, title: "Toast" },
];



export default function Gallery() {

  //USE STATES AND USE REF
  const [notes, setNotes] = useState(initialImages); // list of notes to choose from
  const [topNotes, setTopNotes] = useState([]); // notes put in top notes list
    const [midNotes, setMidNotes] = useState([]); // notes put in middle notes list
      const [bottomNotes, setBottomNotes] = useState([]); // notes put in bottom notes list
  const [draggedId, setDraggedId] = useState(null); 

const [scentName, setScentName] = useState("Name Your Scent Memory");
  const chartRef = useRef(null);

//handling start of drag
  const handleDragStart = (id, from) => {
    setDraggedId({ id, from });
  };

//function for if dropped into top notes
const handleDropTop = (e) => {
    console.log('Dragged:', draggedId);
    e.preventDefault();
    if (!draggedId || draggedId.from !== "gallery") return;

    const img = notes.find((i) => i.id === draggedId.id);
    if (!img) return;

    // limit to the 3 slots
    if (topNotes.length >= 3) {
      setDraggedId(null);
      return;
    }

    //add dragged image to top notes array
    if (!topNotes.some((i) => i.id === img.id)) {
      setTopNotes([...topNotes, img]);
    }

    //remove from notes list 
setNotes(notes.filter((i) => i.id !== draggedId.id));

  
    setDraggedId(null);
  };


  //function for if dropped in middle notes
  const handleDropMid = (e) => {
    e.preventDefault();
    if (!draggedId || draggedId.from !== "gallery") return;

    const img = notes.find((i) => i.id === draggedId.id);
    if (!img) return;

    // limit to the 4 slots
    if (midNotes.length >= 4) {
      setDraggedId(null);
      return;
    }

    //add to middle notes array
    if (!midNotes.some((i) => i.id === img.id)) {
      setMidNotes([...midNotes, img]);
    }
    //remove from notes list
setNotes(notes.filter((i) => i.id !== draggedId.id));

  
    setDraggedId(null);
  };

//if dropped into bottom row
  const handleDropBottom = (e) => {
    e.preventDefault();
    if (!draggedId || draggedId.from !== "gallery") return;

    const img = notes.find((i) => i.id === draggedId.id);
    if (!img) return;

    // limit to the 4 slots
    if (bottomNotes.length >= 4) {
      setDraggedId(null);
      return;
    }

    // move into bottom row array
    if (!bottomNotes.some((i) => i.id === img.id)) {
      setBottomNotes([...bottomNotes, img]);
    }
    //remove from notes list
setNotes(notes.filter((i) => i.id !== draggedId.id));

  
    setDraggedId(null);
  };



//for when image is dragged from notes chart back to main list
  const handleDropOnGallery = () => {
      console.log('Dragged:', draggedId);
  if (!draggedId) return;
let returned

  //remove  image from whatever row it came from
  switch (draggedId.from) {
    case "top":
              returned = topNotes.find(i => i.id === draggedId.id);
      setTopNotes(topNotes.filter((i) => i.id !== draggedId.id));
      break;
    case "middle":
            returned = midNotes.find(i => i.id === draggedId.id);
      setMidNotes(midNotes.filter((i) => i.id !== draggedId.id));
      break;
    case "bottom":
              returned = bottomNotes.find(i => i.id === draggedId.id);
      setBottomNotes(bottomNotes.filter((i) => i.id !== draggedId.id));
      break;
    default:
      break;
  }
//add back to notes list
if (returned) {
    setNotes([...notes, returned]);
  }

  setDraggedId(null);
};


//download the scent chart
  const downloadGallery = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current, { useCORS: true });
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "ScentMemory.png";
    link.click();

 
  };

  //make sure theres always "null" placeholders in array even if nothing is dragged yet 
const topSlots = 3;
const topslots = Array.from({ length: topSlots }, (_, i) => topNotes[i] || null);
const midSlots = 4;
const midslots = Array.from({ length: midSlots }, (_, i) => midNotes[i] || null);
const bottomSlots = 4;
const bottomslots = Array.from({ length: bottomSlots }, (_, i) => bottomNotes[i] || null);





//WHATS SHOWN IN BROWSER

  return (
    <div className="container">
     
     
      <div className="leftside">
 <div className="toptitle">
 <h1 className="title"> Feeling Nose-talgic?</h1>
 <h4 className="instructions"> Drag and Drop to Build Your Own Custom Scent Memory!</h4> </div>
 {/* list of notes to choose from*/}
        <div
          className="gallery"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnGallery}
        >
          {notes.map((img) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => handleDragStart(img.id, "gallery")}
              onDragOver={(e) => e.preventDefault()}
              className={`image-wrapper ${draggedId?.id === img?.id ? "dragged" : ""}`}
            >
              <img src={img.url} alt={img.title} />
              <span> {img.title}</span>
            </div>
          ))}
        </div>
      </div>



{/* SCENT CHART */}
    <div className ="rightside">
      
      <div className="noteChart"
       ref={chartRef}>
     <center> <h2 className="scentname">{scentName}</h2> </center>
         <div className="header"> <h4> Top Notes</h4> </div>
<center> 
  <div
  //top notes
  className="top-notes"
  onDragOver={(e) => e.preventDefault()}
  onDrop={handleDropTop}
>

  {topslots.map((img, id) => (
    <div
      key={id}
      draggable
      onDragStart={() => img && handleDragStart(img.id, "top")}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => img}
    className={`noteslot ${draggedId?.id === img?.id ? "dragged" : ""}`}
    >
      
    {img ? (  //if theres an image render it like this
    <div>
      <img src={img.url} alt={img.title} />
      <span>{img.title}</span>
    </div>
  ) : (
    <div style={{ width: "100%", height: "100%" }}></div>
  )}
    </div>
  ))}
</div> </center>
<div className="header">  <h4> Middle Notes</h4> </div>

<center> <div
  //middle notes
  className="middle-notes"
  onDragOver={(e) => e.preventDefault()}
  onDrop={handleDropMid}
>

  {midslots.map((img, id) => (
    <div
      key={id}
      draggable
      onDragStart={() => img && handleDragStart(img.id, "middle")}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => img}
 className={`noteslot ${draggedId?.id === img?.id ? "dragged" : ""}`}
    >
       
     {img ? (  //if theres an image render it like this
    <div>
      <img src={img.url} alt={img.title} />
      <span>{img.title}</span>
    </div>
  ) : (
    <div style={{ width: "100%", height: "100%" }}></div>
  )}
    </div>
  ))}
</div>
</center>
<div className="header"> <h4> Base Notes </h4> </div>
<center>
<div
  className="bottom-notes"
    //base notes
  onDragOver={(e) => e.preventDefault()}
  onDrop={handleDropBottom}
>

  {bottomslots.map((img, id) => (
    <div
      key={id}
      draggable
      onDragStart={() => img && handleDragStart(img.id, "bottom")}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => img}
 className={`noteslot ${draggedId?.id === img?.id ? "dragged" : ""}`}
    >
        {img ? ( //if theres an image render it like this
    <div>
     <center> <img src={img.url} alt={img.title} />
      <span>{img.title}</span> </center>
    </div>
  ) : (
    <div style={{ width: "100%", height: "100%" }}></div>
  )}
  </div>
  ))}
</div>
</center>
</div>



   <div 
   // menu with scent name input, button, and link to homepage
   className="menu">   
     <input
        type="text"
        value={scentName}
        onChange={(e) => setScentName(e.target.value)}
        className="scentnamer"
      />
  <button className="button" onClick={downloadGallery}>Download your scent!</button>  
  <a href="https://healrabbit.github.io/coresystemslabfall25"> home </a>
      </div>
</div>

    </div>
  );
}
