import "./App.css";
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const initialImages = [
  { id: 1, url: `${base}/images/mothball.png`, title: "One"},
  {id: 2, url: `${base}/images/aloe.png`, title: "Two"},
  {id: 3, url: `${base}/images/coffee.png`, title: "Three"}, 
  { id: 4, url: `${base}/images/nailpolish.png`, title: "Four"},
  {id: 5, url: `${base}/images/firewood.png`, title: "Five"},
  {id: 6, url: `${base}/images/cake.png`, title: "Six"}, 
]

export default function Gallery(){
const [images, setImages] = useState(initialImages);
const [draggedId, setDraggedId] = useState(null);
const [hoveredId, setHoveredId] = useState(null);
const galleryRef = useRef(null);
const handleDragStart = (id) => setDraggedId(id);

//below is function to switch images when dropped 
const handleDrop = (targetId) => {


  if (draggedId === targetId) return;

const draggedIndex = images.findIndex (i => i.id === draggedId); //find index of image thats being dragged
const targetIndex = images.findIndex(i => i.id === targetId); //find index of image thats hovered over

const newImages = [...images]; // '...' is copy of images array and assigned to "newImages"

const [moved] = newImages.splice(draggedIndex, 1); //splice cuts dragged image out of copy
newImages.splice(targetIndex, 0, moved); //splice putting dragged image into array in "targetIndex" spot
// update real arrays and reset dragged and hovered states to empty
setImages(newImages);
setDraggedId(null);
setHoveredId(null);
};

  // const handleUpload = (e) => {
  //   //make array from uploaded files
  //   const files = Array.from(e.target.files)
  //   //set info for all added images
  //   const newImages = files.map((file,index) => ({
  //     id:  Date.now() + index,
  //     url: URL.createObjectURL(file),
  //     title: file.name,

  //   }))
  //   //updating images to include new images
  //   setImages([...images, ...newImages])
  //   }

const downloadGallery = async () =>  {
  //if gallery in DOM (loaded)
  if(!galleryRef.current) return;
//creating canvas element from gallery html
  const canvas = await html2canvas(galleryRef.current, { useCORS: true})

  //convert canvas to png
  const dataURL = canvas.toDataURL("image/png");

  //trigger download
  const link = document.createElement("a");

  link.href= dataURL;
  link.download = "gallery.png";
  link.click();

}

  // const removeImage = (id) => {
  
  //   setImages(images.filter((img) => img.id !== id))
  //      console.log(images.filter((img) => img.id !== id))
  // }

return(
  <div>

    <button onClick={downloadGallery}>
Download your scent! 
    </button>
  <div className="gallery" ref={galleryRef}> 
  {images.map(img => (
    <div key = {img.id}
    draggable
    onDragStart = {() => handleDragStart(img.id)}
    onDragOver = {(e) => {
e.preventDefault(); //e is js object, checking what default behavior is (stopping from being dragged ) and preventing it 
    }}
    onDragLeave = {() => setHoveredId(null)}
    onDrop = {() => handleDrop(img.id)}
    className = {`image-wrapper ${draggedId == img.id ? "dragged" : ""} 
    ${hoveredId == img.id && draggedId != img.id ? "hovered" : ""}`}
    >
      
    <img src={img.url} alt={img.title}/>

    </div>
  ))}
  </div>
  </div>
)
}