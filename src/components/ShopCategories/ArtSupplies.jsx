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
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import styles, { layout } from '../../style';
import WebFooter from '../WebFooter';
import BackToTopButton from '../BackToTopButton';
import { ArtZoroLogoWhite, banksy, cookBook, cute, howToGraff1, howToGraff2, Img1, jhgfd, MegaSet, MolotovThick, MolotowOneForAll, molotowSet, mural, mural2, prints, prints2, schoolGraffitti, stencilHandbook, streetartManual, streetFonts } from '../../assets';

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

  const products1 = [
    {
      id: 1,
      name: 'Molotow One4All 227HS 10 Set - Basic Set 1 - 4mm Paint Marker Pens',
      price: '£37.99',
      href: 'https://amzn.to/3AGzh6C',
      imageSrc: molotowSet,
      imageAlt: 'molotow marker Set',   
    },
    {
        id: 2,
        name: 'Molotow One4All 627HS 6 Pen Set 15mm Paint Marker Pens',
        price: '£42.13',
        href: 'https://amzn.to/4dY0f8d',
        imageSrc: MolotovThick,
        imageAlt: 'thick molotov marker set',
      },
      {
        id: 3,
        name: 'Molotow One4All Acrylic Twin Marker Complete Set ',
        price: '£184.73',
        href: 'https://amzn.to/3T74NB7',
        imageSrc: MolotowOneForAll,
        imageAlt: 'marker set molotov',
      },
      {
        id: 4,
        name: 'Molotow One4All 127HS Acryl Marker Display-Set Complete',
        price: '£174.99',
        href: 'https://amzn.to/3MkIGTV',
        imageSrc: MegaSet,
        imageAlt: 'Mega Marker Set',
      },
 
    // More products...
  ]

export default function ArtSupplies() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-indigo-600">
      <div>
        {/* Mobile menu */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-indigo-600 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-200"
                >
                  <span className="sr-only">Close menu</span>
                  <CloseIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Links */}
              <TabGroup className="mt-2">
                <div className="border-b border-gray-200">
                  <TabList className="-mb-px flex space-x-8 px-4">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-200 data-[selected]:border-indigo-800 data-[selected]:text-white"
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </TabList>
                </div>
                <TabPanels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <TabPanel key={category.name} className="space-y-12 px-4 py-6">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                        {category.featured.map((item) => (
                          <div key={item.name} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-indigo-600 group-hover:opacity-75">
                              <img alt={item.imageAlt} src={item.imageSrc} className="object-cover object-center" />
                            </div>
                            <a href={item.href} className="mt-6 block text-sm font-medium text-white font-raleway">
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
                    <a href={page.href} className="-m-2 block p-2 font-medium text-gray-200">
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

            </DialogPanel>
          </div>
        </Dialog>

        <header className="relative">
          <nav aria-label="Top">

            {/* Secondary navigation */}
            <div className="bg-indigo-600 shadow-sm">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:flex-1 lg:items-center">
                    <a href="/">
                      <span className="sr-only">Mural Finder</span>
                      <img
                        alt=""
                        src={ArtZoroLogoWhite}
                        className="h-8 w-auto"
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
                              <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-200 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:text-indigo-900 font-raleway ">
                                {category.name}
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-[open]:bg-indigo-800"
                                />
                              </PopoverButton>
                            </div>

                            <PopoverPanel
                              transition
                              className="group absolute inset-x-0 top-full z-20 bg-indigo-600 text-sm text-gray-200 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-indigo-600 shadow" />
                              {/* Fake border when menu is open */}
                              <div aria-hidden="true" className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8">
                                <div className="h-px w-full bg-transparent transition-colors duration-200 ease-out group-data-[open]:bg-gray-200" />
                              </div>

                              <div className="relative">
                                <div className="mx-auto max-w-7xl px-8">
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
                                        <a href={item.href} className="mt-4 block font-medium text-gray-200">
                                          <span aria-hidden="true" className="absolute inset-0 z-10" />
                                          {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
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
                            className="flex items-center text-sm font-medium text-gray-200 hover:text-gray-800 font-raleway"
                          >
                            {page.name}
                          </a>
                        ))}
                      </div>
                    </PopoverGroup>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(true)}
                      className="-ml-2 rounded-md bg-transparent p-2 text-white"
                    >
                      <span className="sr-only">Open menu</span>
                      <MenuIcon aria-hidden="true" className="h-6 w-6" />
                    </button>

                    {/* Search */}
                    <a href="#" className="ml-2 p-2 text-white hover:text-orange-400">
                      <span className="sr-only">Search</span>
                      <SearchIcon aria-hidden="true" className="h-6 w-6" />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="/" className="lg:hidden">
                    <span className="sr-only">Mural Finder</span>
                    <img
                      alt=""
                      src={ArtZoroLogoWhite}
                      className="h-8 w-auto"
                    />
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    <a href="#" className="hidden text-sm font-medium text-gray-200 hover:text-orange-400 lg:block">
                      Search
                    </a>

                    {/* <div className="flex items-center lg:ml-8"> */}
                      {/* Help */}
                      {/* <a href="#" className="p-2 text-gray-400 hover:text-gray-500 lg:hidden">
                        <span className="sr-only">Help</span> */}
                        {/* <QuestionMarkCircleIcon aria-hidden="true" className="h-6 w-6" /> */}
                      {/* </a>
                      <a href="#" className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block">
                        Help
                      </a> */}

                      {/* Cart */}
                      {/* <div className="ml-4 flow-root lg:ml-8"> */}
                        {/* <a href="#" className="group -m-2 flex items-center p-2"> */}
                          {/* <ShoppingBagIcon
                            aria-hidden="true"
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          /> */}
                          {/* <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                          <span className="sr-only">items in cart, view bag</span>
                        </a> */}
                      {/* </div> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>

      <div>
    
        <main>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">

          <h1 className={`${styles.heading2} lg:text-6xl tracking-tight text-2xl font-bold flex justify-center mt-6 mb-2`}>Art Supplies</h1>

            {/* Product grid */}
            <section aria-labelledby="products-heading" className="mt-8">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {products1.map((product) => (
                  <a key={product.id} href={product.href} className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
                      <img
                        alt={product.imageAlt}
                        src={product.imageSrc}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-base font-medium text-white">
                      <h3 className={`font-bold font-raleway`}>{product.name}</h3>
                      <p className={`${styles.paragraph} mt-1 text-sm`}>{product.price}</p>
                    </div>
                    <p className={`${styles.paragraph} mt-1 text-sm`}>{product.description}</p>
                  </a>
                ))}
              </div>
            </section>

            {/* <section aria-labelledby="featured-heading" className="relative mt-16 overflow-hidden rounded-lg lg:h-96">
              <div className="absolute inset-0">
                <img
                  alt=""
                  src="https://tailwindui.com/img/ecommerce-images/category-page-01-featured-collection.jpg"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div aria-hidden="true" className="relative h-96 w-full lg:hidden" />
              <div aria-hidden="true" className="relative h-32 w-full lg:hidden" />
              <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
                <div>
                  <h2 id="featured-heading" className="text-xl font-bold text-white">
                    Workspace Collection
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">
                    Upgrade your desk with objects that keep you organized and clear-minded.
                  </p>
                </div>
                <a
                  href="#"
                  className="mt-6 flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 px-4 py-3 text-base font-medium text-white hover:bg-opacity-10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-full"
                >
                  View the collection
                </a>
              </div>
            </section> */}

        
          </div>
        </main>
        <BackToTopButton />
            <div className={`${styles.paddingX} bg-indigo-600 w-full overflow-hidden`}>
                <WebFooter />
            </div>
       
      </div>
    </div>
  )
}
