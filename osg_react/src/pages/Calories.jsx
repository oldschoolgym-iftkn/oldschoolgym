import { useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CaloriesComponent from '../components/Calories';

const Calories = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <div className="flex flex-col min-h-screen text-center App">
            <Header main full noFixed />
            <main className="">
                <CaloriesComponent />
            </main>
            <Footer />
        </div>
    );
};

export default Calories;
