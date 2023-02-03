import React, {useState} from 'react'

import { LoginCredentials } from '../models/LoginCredentials'

function Homepage() : JSX.Element {
    const [slideIndex, setSlideIndex]=useState<number>(0)
    // const [slideNum, setSlideNum] = useState<number>(0)

    function currentSlide(n: number){
        setSlideIndex(n);
        return showSlides(slideIndex);
    }

    function slideNumber(m: number) {
        setSlideIndex(slideIndex+m);
        return showSlides(slideIndex);
    }

    function showSlides(x: number){
        let slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLDivElement>;
        let dots = document.getElementsByClassName('dot');
        if(x>slides.length-1) setSlideIndex(0)
        if(x<0) setSlideIndex(slides.length-1)
        for(let i=0; i<slides.length; i++){
            slides[i].style.display = 'none';
            dots[i].className = dots[i].className.replace("active","")
        }
        slides[slideIndex].style.display='block';
        dots[slideIndex].className += "active"
        // let slides = 
    }

    return(
        <div className="Homepage">
            {/* Put in navigation bar */}
            
            <h1 className='homeh1'>Welcome to the homepage!</h1>
            
            <section>
                <h2>Technologies used in this</h2>
                <div className="slideshow-container">
                    <div>
                        <div className="mySlides">
                            <img src="" alt="" style={{width: '100%'}}/>
                            <div className="Slide_captions">Some caption</div>
                        </div>
                        <div className="mySlides">
                            <img src="" alt="" style={{width: '100%'}}/>
                            <div className="Slide_captions">Some caption</div>
                        </div>
                        <div className="mySlides">
                            <img src="" alt="" style={{width: '100%'}}/>
                            <div className="Slide_captions">Some caption</div>
                        </div>
                        <div className="mySlides">
                            <img src="" alt="" style={{width: '100%'}}/>
                            <div className="Slide_captions">Some caption</div>
                        </div>

                        <button className="prev" onClick={()=>slideNumber(-1)}>❮</button>
                        <button className="next" onClick={()=>slideNumber(1)}>❯</button>

                    </div>
                </div>
                <br/>
                <div>
                    <span className='dot' onClick={()=>currentSlide(0)}></span>
                    <span className='dot' onClick={()=>currentSlide(1)}></span>
                    <span className='dot' onClick={()=>currentSlide(2)}></span>
                </div>
            </section>

            <footer>

            </footer>
        </div>
    )

}

export default Homepage