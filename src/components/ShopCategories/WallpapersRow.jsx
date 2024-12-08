import { graff3, graff4, graffs, graffwaall2, graffWall, ModernGraffWall, n, retroGraff } from '../../assets';
import styles, { layout } from '../../style';

const products = [
    {
      id: 1,
      name: 'Wallpaper Graffiti',
      price: '£39.95',
      href: 'https://amzn.to/3T1RJwI',
      imageSrc: graffWall,
      imageAlt: 'murimage Photo Wallpaper Graffiti 366 x 254 cm Including Paste Wall Mural Grafitti',
    },
    {
        id: 2,
        name: 'Graffiti Wall Urban Art Wall Mural Photo Wallpaper ',
        price: '£38.99',
        href: 'https://amzn.to/3T4RwJl',
        imageSrc: graffwaall2,
        imageAlt: 'Wall Art Desire Graffiti Wall Urban Art Wall Mural Photo Wallpaper',
      },
      {
        id: 3,
        name: 'Graffiti Style Curtain for Bedroom Kids',
        price: '£32.99',
        href: 'https://amzn.to/4dStIkt',
        imageSrc: graff4,
        imageAlt: 'Hippie Graffiti Style Curtain for Bedroom Kids',
      },
      {
        id: 4,
        name: 'Graffiti Urban Art Black and White Photo Wallpaper',
        price: '£39.99',
        href: 'https://amzn.to/3AAHcCC',
        imageSrc: graff3,
        imageAlt: 'Graffiti Urban Art Black and White Photo Wallpaper',
      },
      {
        id: 5,
        name: 'Colorful Graffiti Photography Backdrop Retro',
        price: '£10.99',
        href: 'https://amzn.to/472WDzx',
        imageSrc: retroGraff,
        imageAlt: 'Colorful Graffiti Photography Backdrop Retro',
      },
      {
        id: 6,
        name: 'Modern Graffiti Colorful Wallpaper',
        price: '£36.99 (£13.21 / square meter)',
        href: 'https://amzn.to/3ADP5XT',
        imageSrc: ModernGraffWall,
        imageAlt: 'Wall Mural Decoration Poster Picture Design',
      },
      {
        id: 7,
        name: '80s Backdrop Retro Hip Hop Graffiti',
        price: '£20.99',
        href: 'https://amzn.to/4dtKzcZ',
        imageSrc: n,
        imageAlt: ' Graffiti Photoshoot Banner 80s Themed Party Supplies Photography Props',
      },
      {
        id: 8,
        name: 'Wallpaper - Murals - Wall',
        price: '£36.99(£13.21 / square meter)',
        href: 'https://amzn.to/3yUYRV6',
        imageSrc: graffs,
        imageAlt: 'Wallpaper - Murals - Wall - Mural - Photo - 3D - modern - Graffiti',
      },


    // More products...
  ]
  
  export default function WallpaperRow() {
    return (
      <div className="bg-indigo-600">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className={`${styles.heading2} text-2xl font-bold tracking-tight `} >Wallpaper</h2>
            <a href="/Wallpapers" className="hidden text-sm font-medium text-white hover:text-orange-400 md:block font-raleway">
              Shop wallpaper
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
  
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className={`${styles.paragraph} mt-4 font-semibold`}>
                  <a href={product.href}>
                    <span className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                <p className="mt-1 text-sm font-medium text-white mb-8 font-raleway">{product.price}</p>
              </div>
            ))}
          </div>
  
          <div className="mt-8 text-sm md:hidden">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Shop the collection
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
  