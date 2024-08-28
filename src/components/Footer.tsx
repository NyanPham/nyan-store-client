import { Link } from 'react-router-dom'
import nyanLogo from '../imgs/nyan-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
    faTwitter,
    faInstagram,
    faCcMastercard,
    faCcPaypal,
    faCcVisa,
} from '@fortawesome/free-brands-svg-icons'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Footer = () => {
    function onSubscribeHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        alert("In Development feature. Coming soon!")
    }

    return (
        <footer className="shadow-top mt-10">
            <div className="grid grid-cols-1 pb-4 pt-6 mx-1 gap-1 border-b border-gray-800/10 md:py-4 md:grid-cols-2 md:gap-4 md:mx-8 lg:gap-8 lg:py-8 lg:mx-16 lg:grid-cols-4 ">
                <div className="text-center">
                    <LazyLoadImage
                        className="w-32 aspect-40/15 mx-auto"
                        src={nyanLogo}
                        alt="Nyan Store"
                        width={128}
                        height={48}
                    />
                    <p className="text-base text-gray-400 font-normal text-center mt-3">
                        Nyan Store, find and express yourself in the most authentic way
                    </p>
                </div>
                <div className="text-center mt-6 md:text-left md:mt-0">
                    <h3 className="text-base text-cyan-400 font-medium uppercase">Our society</h3>
                    <div className="flex flex-wrap justify-center md:grid md:justify-start grid-cols-2 grid-rows-4 gap-y-1 gap-x-2 mt-3">
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            About
                        </Link>
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            Contact
                        </Link>
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            Our Products
                        </Link>
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            Join Us
                        </Link>
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            FAQ
                        </Link>
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            CGV
                        </Link>
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            Terms of Service
                        </Link>
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>
                <div className="text-center mt-6 md:text-left md:mt-0">
                    <h3 className="text-base text-cyan-400 font-medium uppercase">Follow us</h3>
                    <div className="flex flex-col gap-1 mt-3">
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            phamthanhnhanussh@gmail.com
                        </Link>
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            Thanh Da, Binh Thanh District, HCMC
                        </Link>
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            +84 947 057 091
                        </Link>
                    </div>
                </div>
                <div className="text-center mt-6 md:text-left md:mt-0">
                    <h3 className="text-base text-cyan-400 font-medium uppercase">Contact us</h3>
                    <div className="flex flex-col gap-1 mt-3">
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                            <span className="ml-3">Facebook</span>
                        </Link>
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            <FontAwesomeIcon icon={faTwitter} />
                            <span className="ml-3">Twitter</span>
                        </Link>
                        <Link
                            to="/"
                            className="text-sm text-gray-400 font-light transition duration-300 hover:text-cyan-500 active:text-cyan-400 "
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                            <span className="ml-3">Instagram</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between items-center gap-4 py-4 md:items-center md:flex-row md:px-8 lg:py-5 lg:px-16">
                <div className="flex items-center justify-center gap-8 w-4/5 md:justify-evenly md:w-1/4">
                    <FontAwesomeIcon icon={faCcPaypal} className="text-3xl text-cyan-400" />
                    <FontAwesomeIcon icon={faCcVisa} className="text-3xl text-cyan-400" />
                    <FontAwesomeIcon icon={faCcMastercard} className="text-3xl text-cyan-400" />
                </div>
                <form className="flex items-center w-4/5 md:w-2/5" onSubmit={onSubscribeHandler}>
                    <label htmlFor="subscribe-email" className="hidden">
                        Subscribe to our email
                    </label>
                    <input
                        className="w-full py-2 pl-7 pr-14 bg-slate-200 rounded-l-full font-medium text-slate-700 placeholder:font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                        placeholder="Subscribe to our Newsletter"
                        type="text"
                        id="subscribe-email"
                    />
                    <button
                        className="py-2 px-8 rounded-r-full bg-cyan-400 text-base text-white tracking-wider font-semibold transition duration-300 hover:bg-gray-700 hover:text-cyan-400 active:bg-gray-900 active:text-cyan-300"
                        type="submit"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
            <div className="p-3 bg-slate-700 text-white text-center">
                &copy; 2024 Built by Nhan Pham. All Right Reserved
            </div>
        </footer>
    )
}

export default Footer
