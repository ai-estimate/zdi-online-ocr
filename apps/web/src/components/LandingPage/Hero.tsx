import Image from 'next/image';
import {Popover} from '@headlessui/react';

export const Hero: React.FC = () => {
  return (
    <Popover className="relative">
      <div
        className="bg-right-top bg-no-repeat bg-cover xl:bg-bottom"
        style={{backgroundImage: `url(/assets/images/bg.jpg)`}}>
        <div className="container px-5 pb-16 mx-auto sm:pb-16 lg:pb-24 xl:pb-32">
          <header className="flex items-center justify-between pt-5">
            <div>
              <a href="#0">
                <Image
                  src="/assets/images/logo.png"
                  alt="NextSpell"
                  width={180}
                  height={30}
                  loading="eager"
                />
              </a>
            </div>
            <div className="hidden space-x-8 font-medium lg:block"></div>
            <div className="hidden font-medium lg:block">
              <a
                href="#0"
                className="transition-colors duration-300 hover:text-blue-600 ">
                095-333-409
              </a>
            </div>
          </header>
          <div className="mt-16 space-y-8 lg:mt-24 xl:mt-28">
            <div className="space-y-4">
              <h1 className="text-3xl font-black sm:w-2/3 sm:text-4xl md:max-w-xl md:text-5xl">
                Extract data from unstructured documents
              </h1>
              <p className="max-w-sm text-lg text-gray-700 md:max-w-md md:text-xl">
                Easily. Efficiently. Accurately.
              </p>
            </div>
            <button className="w-full px-8 py-3.5 transition duration-300 bg-blue-500 hover:bg-blue-600 shadow text-white font-semibold rounded-lg sm:w-auto">
              Start free trial
            </button>
          </div>
        </div>
      </div>
    </Popover>
  );
};
