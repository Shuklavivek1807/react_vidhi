import {useEffect, useState} from 'react'
import {Container} from 'reactstrap'
import img1 from '../../assests/images/about-us.png'
import img2 from '../../assests/images/red-live.png'
import img3 from '../../assests/images/hero-img1.png'
import img4 from '../../assests/images/branding.png'

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const image = [img1,img2,img3,img4]
    const handleImageClick = (imageUrl) => {
      setSelectedImage(imageUrl);
    };
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    
    return (
        <section>
            <div class="text-center mb-5 col-lg-12" style={{ paddingTop: "15px" }}><h2 class="fw-bold">Gallery</h2></div>
            <Container>
                {image.map((item,index)=>(
                    <span key={index} className="gallery-card" onClick={() => handleImageClick(item)}>
                    <img src={item} key={index} className={`gallery-img ${selectedImage === item ? 'zoomed' : ''}`} alt='1.jpg'/>
                    </span>
                ))}
                
            </Container>
        </section>
    )
}

export default Gallery;