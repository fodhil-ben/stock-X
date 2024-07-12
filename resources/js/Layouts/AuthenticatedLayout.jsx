import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { OrderItemsProvider } from '@/Providers/OrderItemsProvider';

import Echo from 'laravel-echo';

import Pusher from 'pusher-js';


export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [flashMsg, setFlashMsg] = useState('');
    const [notifProducts, setNotifProducts] = useState([])
    useEffect(()=>{
        // window.Pusher = Pusher;
        // window.Echo = new Echo({
        //     broadcaster: 'reverb',
        //     key: import.meta.env.VITE_REVERB_APP_KEY,
        //     wsHost: import.meta.env.VITE_REVERB_HOST,
        //     wsPort: import.meta.env.VITE_REVERB_PORT,
        //     wssPort: import.meta.env.VITE_REVERB_PORT,
        //     forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
        //     enabledTransports: ['ws'],
        // });
        // const channel = window.Echo.channel('product');
        // channel
        // .listen('ProductEndedInStock', (e)=>{
        //     console.log(e.product.id)
        //     if (!notifProducts.some(product => product.id === e.product.id)){
        //         setNotifProducts(prev => [...prev, e.product])
        //         setFlashMsg(`Product with name: ${e.product.name} will end soon `)
        //     }
        //     console.log(notifProducts)
        // })
        
        setTimeout(() => {
            setFlashMsg(null);
        }, 5000);
        // return ()=>{
        //     channel.stopListening('ProductEndedInStock')
        // }
    }, [notifProducts])

        return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {
                                (auth.permissions['view-dashboard']) && 
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                                }
                                <NavLink href={route('categories.index')} active={route().current('categories.index')}>
                                    Categories
                                </NavLink>
                                <NavLink href={route('products.index')} active={route().current('products.index')}>
                                    Products
                                </NavLink>
                                <NavLink href={route('orders.index')} active={route().current('orders.index')}>
                                    Orders
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative flex items-center">
                                <Dropdown>
                                <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                Notif {notifProducts.length > 0 && notifProducts.length}

                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        {
                                            notifProducts.length > 0
                                            ?notifProducts.map(n=>(
                                                <div key={n.id} className=' border-b-2 border-gray-400 p-2 hover:bg-gray-400'> {n.name} </div>
                                            ))
                                            : <div className='p-2'>No Notifications</div>
                                        }
                                    </Dropdown.Content>
                                </Dropdown>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                {auth.user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                        />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                        />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow flex justify-between">
                    <div className="max-w-7xl py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    <div className='py-6 px-4'>{flashMsg}</div>
                </header>
            )}

            <main className='mx-[10%] mt-10'>{children}</main>
        </div>
    );
}
