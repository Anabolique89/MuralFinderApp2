import { Fragment, useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { AdobeStock_259925422, ArtZoroLogoWhite, bannerShop, pinkwallpaper, creative, cute, jhgfd, jjnjkbj, OceanOfBlue, passion, swimBlue, wallpaper2, mural, muralcopy, prints, prints2, Img1, mural2, streetartManual, MeshBackground } from '../assets';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../style';
import WebFooter from '../components/WebFooter';
import { BackToTopButton } from '../components';
import WallpaperRow from '../components/ShopCategories/WallpapersRow';
import { BooksRow } from '../components/ShopCategories';
import ArtSuppliesRow from '../components/ShopCategories/ArtSuppliesRow';

const navigation = {
  categories: [
    {
      name: 'New',
      featured: [
        {
          name: 'Services',
          href: '#',
          imageSrc: Img1,
          imageAlt: 'New types of art supplies coming soon...',
        },
        {
          name: 'Murals',
          href: '#',
          imageSrc: mural,
          imageAlt: 'Section of painted jungle themed indoor mural',
        },
        {
          name: 'Artwork',
          href: '#',
          imageSrc: prints,
          imageAlt: 'custom neon artwork love',
        },
        {
          name: 'Poster Prints',
          href: '/PosterPrints',
          imageSrc: prints2,
          imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
        },
      ],
    },
    {
      name: 'Sale',
      featured: [
        {
          name: 'New Arrivals',
          href: '/Shop',
          imageSrc: jhgfd,
          imageAlt: 'new arrivals',
        },
        {
          name: 'Wallpaper',
          href: '/Wallpapers',
          imageSrc: mural2,
          imageAlt: 'Wallpaper oriental',
        },
        {
          name: 'Books',
          href: '/Books',
          imageSrc: streetartManual,
          imageAlt:'the street art manual book',
        },
        {
          name: 'Materials',
          href: '/Materials',
          imageSrc: cute,
          imageAlt: 'raw materials inspiration info',
        },
      ],
    },
  ],
  pages: [
    { name: 'Shop', href: '/Shop' },
    { name: 'Home', href: '/' },
  ],
}
const categories = [
  {
    name: 'ArtSupplies',
    href: '/ArtSupplies',
    imageSrc: pinkwallpaper,
  },
  {
    name: 'Materials',
    href: '/Materials',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg',
  },
  {
    name: 'Wallpaper',
    href: '/Wallpapers',
    imageSrc: wallpaper2,
  },
  {
    name: 'WallMurals',
    href: '#',
    imageSrc: jhgfd,
  },
  {
    name: 'PosterPrints',
    href: '/PosterPrints',
    imageSrc: jjnjkbj,
  },
  { name: 'Books', 
    href: '/Books', 
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg' },
]
// const collections = [
//   {
//     name: 'Handcrafted Collection',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
//     imageAlt: 'Brown leather key ring with brass metal loops and rivets on wood table.',
//     description: 'Keep your phone, keys, and wallet together, so you can lose everything at once.',
//   },
//   {
//     name: 'Organized Desk Collection',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg',
//     imageAlt: 'Natural leather mouse pad on white desk next to porcelain mug and keyboard.',
//     description: 'The rest of the house will still be a mess, but your desk will look great.',
//   },
//   {
//     name: 'Focus Collection',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-03.jpg',
//     imageAlt: 'Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.',
//     description: 'Be more productive than enterprise project managers with a single piece of paper.',
//   },
// ]

export default function Shop() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-indigo-600">
      {/* Mobile menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-indigo-600 bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto scrollbar-thin scrollbar-webkit bg-indigo-600 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-white"
              >
                <span className="sr-only">Close menu</span>
                <CloseIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200 font-raleway">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-200 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600 font-raleway"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-12 px-4 py-6 font-raleway">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative">
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                            <img alt={item.imageAlt} src={item.imageSrc} className="object-cover object-center" />
                          </div>
                          <a href={item.href} className={`${styles.paragraph} mt-6 block text-sm font-raleway`}>
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1 text-sm text-gray-200">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a href={page.href} className="-m-2 block p-2 font-medium font-raleway text-gray-200">
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

          </DialogPanel>
        </div>
      </Dialog>

      {/* Hero section */}
      <div className="relative bg-indigo-600 h-[70vh]">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            alt="banner"
            src={MeshBackground}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-indigo-600 opacity-60" />

        {/* Navigation */}
        <header className="relative z-10">
          <nav aria-label="Top">
        

            {/* Secondary navigation */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md backdrop-filter">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div>
                  <div className="flex h-16 items-center justify-between">
                    {/* Logo (lg+) */}
                    <div className="hidden lg:flex lg:flex-1 lg:items-center">
                      <a href="#">
                        <span className="sr-only">MuralFinder</span>
                        <img
                          alt=""
                          src={ArtZoroLogoWhite}
                          className="h-8 w-auto "
                        />
                      </a>
                    </div>

                    <div className="hidden h-full lg:flex">
                      {/* Flyout menus */}
                      <PopoverGroup className="inset-x-0 bottom-0 px-4">
                        <div className="flex h-full justify-center space-x-8">
                          {navigation.categories.map((category) => (
                            <Popover key={category.name} className="flex">
                              <div className="relative flex">
                                <PopoverButton className="group relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out font-raleway">
                                  {category.name}
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out group-data-[open]:bg-white"
                                  />
                                </PopoverButton>
                              </div>

                              <PopoverPanel
                                transition
                                className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                              >
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-indigo-600 shadow" />

                                <div className="relative bg-indigo-600">
                                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                            <img
                                              alt={item.imageAlt}
                                              src={item.imageSrc}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-4 block font-semibold text-white font-raleway">
                                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1 font-raleway underline text-orange-400">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </PopoverPanel>
                            </Popover>
                          ))}

                          {navigation.pages.map((page) => (
                            <a
                              key={page.name}
                              href={page.href}
                              className="flex items-center text-sm font-medium text-white font-raleway"
                            >
                              {page.name}
                            </a>
                          ))}
                        </div>
                      </PopoverGroup>
                    </div>

                    {/* Mobile menu and search (lg-) */}
                    <div className="flex flex-1 items-center lg:hidden">
                      <button type="button" onClick={() => setMobileMenuOpen(true)} className="-ml-2 p-2 text-white">
                        <span className="sr-only">Open menu</span>
                        <MenuIcon aria-hidden="true" className="h-6 w-6" />
                     
                      </button>

                      {/* Search */}
                      <a href="#" className="ml-2 p-2 text-white">
                        <span className="sr-only">Search</span>
                        <SearchIcon aria-hidden="true" className="h-6 w-6" />
                      
                      </a>
                    </div>

                    {/* Logo (lg-) */}
                    <a href="#" className="lg:hidden">
                      <span className="sr-only">Your Company</span>
                      <img alt="" src={ArtZoroLogoWhite} className="h-8 w-auto" />
                    </a>

                    <div className="flex flex-1 items-center justify-end">
                      <a href="#" className="hidden text-sm font-medium text-white lg:block">
                        Search
                      </a>

                      <div className="flex items-center lg:ml-8">

                        {/* Cart */}
                        <div className="ml-4 flow-root lg:ml-8">
                          <a href="#" className="group -m-2 flex items-center p-2">
                            {/* <ShoppingBagIcon aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-white" /> */}
                            {/* <span className="ml-2 text-sm font-medium text-white">0</span>
                            <span className="sr-only">items in cart, view bag</span> */}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-10 text-center sm:py-16 lg:px-0">
          <h1 className={`${styles.heading2} lg:text-6xl tracking-tight text-4xl font-bold`}>New arrivals are here</h1>
          <p className="mt-4 text-xl text-white font-raleway" >
            The new arrivals have, well, newly arrived. Check out the latest options from our summer small-batch release
            while they're still in stock.
          </p>
          <p className="mt-4 text-sm italic text-dimWhite font-raleway" >
       As an Amazon Associate I earn from qualifying purchases. 
          </p>
          {/* <a
            href="#"
            className={`py-1 px-2 mt-6 bg-blue-gradient font-raleway font-bold text-[18px] text-primary outline-none uppercase rounded-full ${styles}`}
          >
            Shop New Arrivals
          </a> */}
        </div>
      </div>

      <main>
        {/* Category section */}
        <section aria-labelledby="category-heading" className="pt-14 sm:pt-22 xl:mx-auto xl:max-w-7xl xl:px-8">
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2 id="category-heading" className={`${styles.heading2} tracking-tight text-2xl`}>
              Shop by Category
            </h2>
            <a href="#" className= "hidden text-sm font-semibold text-white hover:text-orange-400 sm:block font-raleway">
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>

          <div className="mt-4 flow-root">
            <div className="-my-2">
              <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible scrollbar-thin scrollbar-webkit">
                <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                    >
                      <span aria-hidden="true" className="absolute inset-0">
                        <img alt="" src={category.imageSrc} className="h-full w-full object-cover object-center" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-indigo-800 opacity-50"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-white font-raleway">{category.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 px-4 sm:hidden">
            <a href="#" className="block text-sm font-semibold text-white hover:text-orange-400 font-raleway">
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </section>
<ArtSuppliesRow />
<WallpaperRow />
<BooksRow />
        {/* Featured section */}
        <section
          aria-labelledby="social-impact-heading"
          className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <img
                alt="brick wall"
                src={AdobeStock_259925422}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative bg-indigo-900 bg-opacity-55 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2 id="social-impact-heading" className={`${styles.heading2} hover:text-orange-500 sm:text-4xl font-bold tracking-tight`}>
                  <span className="block sm:inline font-raleway">Level up</span>
                  <span className="block sm:inline font-raleway"> your game</span>
                </h2>
                <p className={`${styles.paragraph} mt-3 text-2xl text-white`}>
                We support local and global artists and help them develop their 
                online presence on a social media app dedicated to visual arts of all kinds. 
                </p>
                <a
                  href="/Login"
                  className={`py-1 px-2 mt-6 bg-blue-gradient font-raleway font-bold text-[18px] text-primary outline-none uppercase rounded-full sm:w-auto ${styles}`}
                >
                  CREATE PROFILE
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Collection section */}
        {/* <section
          aria-labelledby="collection-heading"
          className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
        >
          <h2 id="collection-heading" className="text-2xl font-bold tracking-tight text-gray-900">
            Shop by Collection
          </h2>
          <p className="mt-4 text-base text-gray-500">
            Each season, we collaborate with world-class designers to create a collection inspired by the natural world.
          </p>

          <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            {collections.map((collection) => (
              <a key={collection.name} href={collection.href} className="group block">
                <div
                  aria-hidden="true"
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
                >
                  <img
                    alt={collection.imageAlt}
                    src={collection.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">{collection.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{collection.description}</p>
              </a>
            ))}
          </div>
        </section> */}

        {/* Featured section */}
        {/* <section aria-labelledby="comfort-heading" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <img
                alt=""
                src="https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-02.jpg"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2 id="comfort-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Simple productivity
                </h2>
                <p className="mt-3 text-xl text-white">
                  Endless tasks, limited hours, a single piece of paper. Not really a haiku, but we're doing our best
                  here. No kanban boards, burndown charts, or tangled flowcharts with our Focus system. Just the
                  undeniable urge to fill empty circles.
                </p>
                <a
                  href="#"
                  className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                >
                  Shop Focus
                </a>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <BackToTopButton />
            <div className={`${styles.paddingX} bg-indigo-600 w-full overflow-hidden`}>
                <WebFooter />
            </div>
    
    </div>
  )
}