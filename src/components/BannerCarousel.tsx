import { useEffect, useState } from 'react';

interface Banner {
  title: string;
  image: string;
}

const banners: Banner[] = [
  { title: "Gamer Paradise", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200" },
  { title: "Smart Tech", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200" },
  { title: "Urban Style", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200" }
];

export function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSlideClass = (index: number) => {
    if (index === currentSlide) return 'active';
    if (index === (currentSlide - 1 + banners.length) % banners.length) return 'prev';
    if (index === (currentSlide + 1) % banners.length) return 'next';
    return 'hidden';
  };

  return (
    <section className="mt-8 px-4 overflow-hidden">
      <div className="banner-container">
        {banners.map((banner, index) => (
          <div key={index} className={`slide ${getSlideClass(index)}`}>
            <img src={banner.image} alt={banner.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white z-20">
              <h2 className="text-4xl font-bold mb-2">{banner.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}