import React, { useState, useEffect } from 'react';
import styles from '../style';
import AuthService from '../services/AuthService';
import ProfileImageUpload from '../components/ProfileUpload';
import ProfileUpdate from './ProfileUpdate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
import { BackToTopButton } from '../components';


const ProfileSettings = () => {
    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        profession: '',
        bio: ''
    });
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userId = AuthService.getUser()?.id;
                if (!userId) {
                    throw new Error('User ID not found');
                }
                const profile = await AuthService.getProfile(userId);
                setProfileData(profile);
            } catch (error) {
                console.error('Error fetching profile data:', error.message);
            }
        };
        fetchProfileData();
    }, []);

    return (
        <section className='font-raleway'>
            <div className="bg-indigo-700 w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-slate-800">
                <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                    <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-slate-800 top-12">
                        <h2 className="pl-3 mb-4 text-2xl font-semibold font-raleway">Settings</h2>
                        <a href="#" className="flex items-center px-3 py-2.5 font-raleway font-bold bg-white  text-purple-950 border rounded-full">Profile Settings</a>
                        <a href="#" className="flex items-center px-3 py-2.5 font-raleway font-semibold  hover:text-purple-950 hover:border hover:rounded-full">Blog Posts</a>
                        <a href="#" className="flex items-center px-3 py-2.5 font-raleway font-semibold hover:text-purple-950 hover:border hover:rounded-full">Notifications</a>
                        <a href="#" className="flex items-center px-3 py-2.5 font-raleway font-semibold hover:text-purple-950 hover:border hover:rounded-full">Delete Account</a>
                    </div>
                </aside>
                <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                    <div className="p-2 md:p-4">
                        <div className="w-full px-6 pb-4 mt-8 sm:max-w-xl sm:rounded-lg font-raleway text-white">
                            <h2 className="pl-6 font-raleway text-2xl font-bold sm:text-xl pt-4 pb-6">Profile Picture</h2>
                            <div className="grid max-w-2xl mx-auto mt-2">
                                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                    {profileData && profileData.profile && (
                                        <ProfileImageUpload imageUrl={profileData.profile.profile_image_url} />
                                    )}
                                </div>

                                <div className="items-center mt-4 sm:mt-14 font-raleway text-white">

                                    <div className="mb-4 font-raleway">
                                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-800 dark:text-white">Bio</label>
                                        <div className="rounded-lg border border-indigo-300 p-2.5">
                                            <p className="text-sm text-white">
                                                {profileData && profileData.profile && profileData.profile.bio}
                                            </p>
                                        </div>
                                    </div>

                                    <h2 className="font-raleway text-2xl font-bold sm:text-xl pt-4 pb-6">Password</h2>
                                    <div className="flex items-center">
                                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                                            <label htmlFor="login-password">
                                                <span className="text-sm text-slate-800 font-raleway">Current Password</span>
                                                <div className="relative flex ">
                                                    <input type="password" id="login-password" className="w-full flex-shrink rounded-md transition focus-within:border-blue-600appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
                                                </div>
                                            </label>
                                            <label htmlFor="login-password">
                                                <span className="text-sm text-slate-800 font-raleway">New Password</span>
                                                <div className="relative flex">
                                                    <input type="password" id="login-password" className="w-full flex-shrink rounded-md transition focus-within:border-blue-600appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" />
                                                </div>
                                            </label>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-800 underline decoration-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    </div>
                                    <p className="mt-2">Can't remember your current password. <a className="text-sm font-semibold text-blue-600 underline decoration-2" href="#">Recover Account</a></p>
                                    <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Save Password</button>
                                    <hr className="mt-4 mb-8" />
                                    <div className="flex justify-end">
                                        {/* <button type="submit" className={`py-2 px-4 bg-blue-gradient font-raleway font-bold text-[18px] text-primary outline-none uppercase rounded-full ${styles}`}>SAVE</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <section className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                    <div className="p-2 md:p-4">
                        <div className='flex justify-center items-center h-full'>
                            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                                <h2 className="font-raleway text-white text-2xl font-bold sm:text-xl pt-6 pb-6">Profile Info</h2>
                                {profileData.profile ? (
                                    <ProfileUpdate profile={profileData.profile} onProfileUpdated={() => setIsProfileUpdated(true)} />

                                ) : (
                                    <FontAwesomeIcon icon={faSpinner} spin className="text-white text-2xl" />
                                )}
                            </div></div>
                    </div>
                </section>


            </div>
            <BackToTopButton />
            <div className={`${styles.paddingX} bg-indigo-700 w-full overflow-hidden`}>
                <Footer />
            </div>
        </section>
    );
}

export default ProfileSettings;
