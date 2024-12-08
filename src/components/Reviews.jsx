import React from 'react';
import { FaUser } from 'react-icons/fa';
import styles from '../style';

const Reviews = () => {
    return (
        <section className="bg-indigo-600 p-4 rounded-lg">
            <div className="flex items-center mb-4">
                <FaUser className="w-10 h-10 me-4 text-white bg-gray-500 rounded-full" />
                <div className="font-medium text-white dark:text-white">
                    <p>
                        Jese Leos{' '}
                        <time
                            dateTime="2014-08-16 19:00"
                            className={`${styles.paragraph} block text-sm dark:text-slate-100`}
                        >
                            Joined on August 2014
                        </time>
                    </p>
                </div>
            </div>
            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            </div>
            <article className="md:gap-8 md:grid md:grid-cols-3">
                <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                    <div className="flex items-center mb-6">
                        <FaUser className="w-12 h-12 me-4 text-white bg-gray-500 rounded-full" />
                        <div>
                            <p className="font-medium">
                                Jennifer Curtis <time dateTime="2020-01-01 19:00">3 hrs</time>
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">CEO at ABC Corp</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate earum officiis assumenda, temporibus nostrum.
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                    <div className="flex items-center mb-6">
                        <FaUser className="w-12 h-12 me-4 text-white bg-gray-500 rounded-full" />
                        <div>
                            <p className="font-medium">
                                Mary Johnson <time dateTime="2020-01-01 19:00">5 hrs</time>
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Software Engineer at XYZ Corp</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Sed quod explicabo voluptatem repellat ea corporis modi distinctio recusandae?
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                    <div className="flex items-center mb-6">
                        <FaUser className="w-12 h-12 me-4 text-white bg-gray-500 rounded-full" />
                        <div>
                            <p className="font-medium">
                                John Smith <time dateTime="2020-01-01 19:00">7 hrs</time>
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Product Manager at ABC Corp</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Necessitatibus quas sequi aut quidem deleniti. Animi at quibusdam.
                    </p>
                </div>
            </article>
        </section>
    );
};

export default Reviews;
