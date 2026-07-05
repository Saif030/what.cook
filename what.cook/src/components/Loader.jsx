const Loader = () => {
    return (
        <div className="absolute inset-0 flex items-center bg-white/20 backdrop-blur-xs justify-center z-999">
            <div className="animate-spin rounded-full h-18 w-18 border-b-5 border-r-5 border-orange-500"></div>
        </div>
    );
};

export default Loader;