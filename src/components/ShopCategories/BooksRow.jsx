import { banksy, cookBook, howToGraff1, howToGraff2, schoolGraffitti, stencilHandbook, streetartManual, streetFonts } from '../../assets';
import styles, { layout } from '../../style';

const products = [
    {
      id: 1,
      name: 'The Street Art Manual',
      price: '£10.69',
      href: 'https://amzn.to/4dP1arw',
      imageSrc: streetartManual,
      imageAlt: 'street art manual',
    },
    {
        id: 2,
        name: 'Street Fonts: Graffiti Alphabets from Around the World',
        price: '£14.69',
        href: 'https://amzn.to/4cFjaUf',
        imageSrc: streetFonts,
        imageAlt: 'street fonts',
      },
      {
        id: 3,
        name: 'Graffiti School: A Student Guide with Teachers Manual',
        price: '£13.09',
        href: 'https://amzn.to/4cBjfIA',
        imageSrc: schoolGraffitti,
        imageAlt: 'school of graff',
      },
      {
        id: 4,
        name: 'The Stencil Graffiti Handbook: Tristan Manco',
        price: '£14.65',
        href: 'https://amzn.to/4dTP7sS',
        imageSrc: stencilHandbook,
        imageAlt: 'stencil graff handbook',
      },
      {
        id: 5,
        name: 'How to Draw Graffiti Art: Learning How to Draw Graffiti Art Vol 5',
        price: '£8.00',
        href: 'https://amzn.to/3X4so6C',
        imageSrc: howToGraff1,
        imageAlt: 'how to graff1',
      },
      {
        id: 6,
        name: 'How to Draw Graffiti Art: Learning How to Draw Graffiti Art Vol 3',
        price: '£8.00',
        href: 'https://amzn.to/4g1EkyU',
        imageSrc: howToGraff2,
        imageAlt: 'how to graff2',
      },
      {
        id: 7,
        name: 'Banksy: Wall and Piece',
        price: '£13.43',
        href: 'https://amzn.to/4g3BRnB',
        imageSrc: banksy,
        imageAlt: 'banksy wall & piece',
      },
      {
        id: 8,
        name: 'Graffiti Cookbook : A Guide to Techniques and Materials',
        price: '£11.05',
        href: 'https://amzn.to/4fYtSIm',
        imageSrc: cookBook,
        imageAlt: 'graff cook book',
      },
    // More products...
  ]
  
  export default function BooksRow() {
    return (
      <div className="bg-indigo-600">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className={`${styles.heading2} text-2xl font-bold tracking-tight `} >Books</h2>
            <a href="/Books" className="hidden text-sm font-medium text-white hover:text-orange-400 md:block font-raleway">
              Shop books
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
  