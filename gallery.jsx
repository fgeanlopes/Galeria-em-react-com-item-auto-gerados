import React,{useState, useEffect} from 'react';
import Image from 'next/image';
import Carousel from 'react-elastic-carousel';
import './style.scss';

export default function Gallery() {
    const [zoomGallery, setZoomGallery] = useState(false);
    const [zoomGalleryActiveIndex, setZoomGalleryActiveIndex] = useState(0);
    const [slideDesktop, setslideDesktop] = useState([]);
    const [slideMobile, setSlideMobile] = useState([]);
    const [gallery, setGallery] = useState([]);
    
    useEffect(()=>{ 
        setslideDesktop(generationItemSlide({"qtdImages":16, "name":"slide_2", "width":184, "height":150}));
        setSlideMobile(generationItemSlide({"qtdImages":16, "name":"slide_2_mobile", "width":900, "height":734}));
        setGallery(generationItemSlide({"qtdImages":16, "name":"slide_2_gallery", "width":1536, "height":1252}));
      },[]);

    function generationItemSlide ({qtdImages, name, width, height}) {
        let item = [];
        for (let index = 1; index <= qtdImages; index++) {
            if(index <= 9){
                item.push({"name":`/${name}_0${index}.jpg`, "width":width, "height":height});
            }else{
                item.push({"name":`/${name}_${index}.jpg`, "width":width, "height":height});
            }
        }
        return item;
    };

    function handleZoomGallery(e){
        setZoomGalleryActiveIndex(e);
        setZoomGallery(true);
    };
    
    function handleCloseGallery(){
        setZoomGallery(false);
        setZoomGalleryActiveIndex(0);
    };

    return(
        <>
            <div className="d-none d-xl-block">
                <Carousel itemsToShow={5} className={"slide"}>
                    {slideDesktop.map((item, index)=>(
                        <div className="item_slide" key={index} onClick={()=>{handleZoomGallery(index)}}>
                        <Image src={item.name} width={item.width} height={item.height} />
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className="d-xl-none">
                <Carousel itemsToShow={1} className={"slide"}>
                    {slideMobile.map((item, index)=>(
                    <div className="item_slide" key={index} onClick={()=>{handleZoomGallery(index)}}>
                        <Image src={item.name} width={item.width} height={item.height} />
                    </div>
                    ))}
                    {console.log(imgSlideMobile)}
                </Carousel>
            </div>

            {zoomGallery &&
                <div className="zoomGallery">
                {zoomGalleryActiveIndex >= 0 &&
                    <div className="viewGallery">
                    <div className="close" onClick={handleCloseGallery}>X</div>
                    <Carousel initialActiveIndex={zoomGalleryActiveIndex} className="slide">
                        {gallery.map((item, index)=>(
                        <div className="item_slide" key={index} onClick={()=>{handleZoomGallery(index)}}>
                            <Image src={item.name} width={item.width} height={item.height} />
                        </div>
                        ))}
                    </Carousel>
                    </div>
                }
                </div>
            } 
        </>
    )
}

export default Gallery;
