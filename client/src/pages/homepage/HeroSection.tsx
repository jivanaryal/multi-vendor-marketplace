import image from '../../assets/images/login_image.jpg';

const HeroSection = () => {
  return (
    <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${image})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Marketplace</h1>
        <p className="text-lg md:text-2xl mb-8">Discover products from various vendors, all in one place.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
