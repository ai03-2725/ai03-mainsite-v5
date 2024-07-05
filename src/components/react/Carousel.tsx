import { useEffect, useRef, useState, type FunctionComponent } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination, Thumbs, Autoplay } from 'swiper/modules';
import { getThumbnailUrl } from "@scripts/util";

// import spinnerSvg from 'node_modules/svg-loaders/svg-css-loaders/oval.svg'; // svgReference === '/src/image.svg'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { imageAltFromFilename } from "@scripts/imageAltFromFilename";

const swiperCustomStyles = `
.mySwiper .swiper-slide {
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}
`

export const Carousel: FunctionComponent<{
  slides: { url: string; thumbnailUrl?: string | undefined }[],
  ratio: number | undefined,
  showThumbnails: boolean | undefined,
}> = ({
  slides,
  ratio,
  showThumbnails
}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const currentSlide = useRef<number>(0)
    const [showExpanded, setShowExpanded] = useState<boolean>(false)
    const showExpandedMirrorRef = useRef<boolean>(showExpanded)

    const thumbnailsToggle = showThumbnails === undefined ? true : showThumbnails
    let pluginsList = [FreeMode, Navigation, Autoplay]
    if (thumbnailsToggle) {
      pluginsList.push(Thumbs)
    } else {
      pluginsList.push(Pagination)
    }

    // Handle esc keystroke for exiting fullscreen image view
    const escHandler = (event: KeyboardEvent) => {
      if (showExpandedMirrorRef.current && event.key === "Escape") {
        setShowExpanded(false)
      }
    }

    useEffect(() => {
      showExpandedMirrorRef.current = showExpanded
    }, [showExpanded])

    useEffect(() => {
      document.addEventListener("keydown", escHandler)

      return () => {
        document.removeEventListener("keydown", escHandler)
      }
    }, [])

    const autoplayOptions: any = {
      delay: 10 * 1000,
      pauseOnMouseEnter: true,
    }

    // TODO: Handle ratio properly

    return (
      // <div class="overflow-hidden rounded-[3.75px] bg-zinc-700 mx-2">
      <div class="overflow-hidden">

        {/* Styles */}
        <style>{swiperCustomStyles}</style>

        {/* Main */}
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }}
          spaceBetween={0}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper, autoScrollOffset: 0 }}
          modules={pluginsList}
          pagination={!thumbnailsToggle}
          onSlideChange={e => {currentSlide.current = e.activeIndex}}
          className="mySwiper2"
          autoplay={autoplayOptions}
          speed={425}
          loop={true}
        >
          {slides.map(slide =>
            <SwiperSlide key={slide.url} onClick={() => setShowExpanded(true)}>
              <div class={`w-full overflow-clip relative aspect-[1.618] cursor-pointer`}>
                <img src={slide.url} class={`absolute w-full h-full object-cover object-center m-0`} alt={imageAltFromFilename(slide.url)} loading="lazy" />
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Thumbs */}
        {thumbnailsToggle &&
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={0}
            slidesPerView={"auto"}
            freeMode={true}
            watchSlidesProgress={true}
            className="mySwiper"
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {slides.map(slide =>
              <SwiperSlide key={slide.url} className="!w-auto !overflow-clip">
                <div class="w-[80px] h-[80px] md:w-[120px] md:h-[120px] xl:w-[150px] xl:h-[150px] overflow-clip cursor-pointer">
                  <img src={slide.thumbnailUrl || getThumbnailUrl(slide.url)} alt=""  class="w-full h-full object-cover object-center m-0" loading="lazy" />
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        }

        {/* Full window view */}
        {showExpanded && 
          <div class="fixed top-0 left-0 w-full h-full z-50 cursor-pointer" onClick={() => setShowExpanded(false)} >
            <div class="relative w-full h-full">
              <div class="absolute w-full h-full bg-zinc-900 opacity-90 top-0 left-0" />
              <div class="absolute p-0 md:p-8 xl:p-16 w-full h-full flex items-center justify-center">
                <div class="flow-root">
                  {/* <Spinner size={64} fgColor="#FFFFFF"/> */}
                </div>
                <img 
                  src={slides[currentSlide.current].url} 
                  alt={imageAltFromFilename(slides[currentSlide.current].url)} 
                  loading="lazy" 
                  class="max-h-full m-0 rounded-0 md:rounded-[3.75px]" 
                />
              </div>
            </div>
          </div>
        }

      </div>
    )
  }