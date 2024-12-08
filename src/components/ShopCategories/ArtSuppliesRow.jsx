import { banksy, cookBook, howToGraff1, howToGraff2, MegaSet, MolotovThick, MolotowOneForAll, molotowSet, schoolGraffitti, stencilHandbook, streetartManual, streetFonts, ThickSIngleMolotov } from '../../assets';
import styles, { layout } from '../../style';

const products = [
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
  
  export default function ArtSuppliesRow() {
    return (
      <div className="bg-indigo-600">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className={`${styles.heading2} text-2xl font-bold tracking-tight `} >Art Supplies</h2>
            <a href="/ArtSupplies" className="hidden text-sm font-medium text-white hover:text-orange-400 md:block font-raleway">
              Shop art supplies
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
  
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="h-100 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-82 xl:h-90 ">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="h-full w-full object-cover object-center "
                  />
                </div>
                <h3 className={`${styles.paragraph} mt-4 font-semibold`}>
                  <a href={product.href}>
                    <span className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                <p className="mt-1 text-sm font-medium text-white mb-8">{product.price}</p>
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
  