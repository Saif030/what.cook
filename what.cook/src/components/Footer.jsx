import { mainlogo } from '../assets/assets.js'

const Footer = () => {
    return (
        <footer className="border-t border-gray-100 py-4 px-6">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between sm:gap-6 gap-4">
                <div className="flex items-center gap-2.5">
                    <img src={mainlogo} alt="Main Logo" className="h-11" />
                </div>
                <div className="text-sm text-gray-400">© 2026 what.cook. All rights reserved.</div>
            </div>
        </footer>
    );
};

export default Footer;