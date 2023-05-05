import Image from 'next/image';
import {Popover, Transition} from '@headlessui/react';
import {Fragment} from 'react';
// import {MenuIcon, XIcon} from '@heroicons/react/outline';
// import logo from '../public/logo.svg';

const navigation = [
  {name: 'Services', href: '#0'},
  {name: 'How it works', href: '#0'},
  {name: 'Team', href: '#0'},
  {name: 'FAQs', href: '#0'},
  {name: 'Testimonials', href: '#0'},
];

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
            <div className="hidden space-x-8 font-medium lg:block">
              {navigation.map((item, i) => (
                <a
                  key={i}
                  href="{item.href}"
                  className="transition-colors duration-300 hover:text-blue-600">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden font-medium lg:block">
              <a
                href="#0"
                className="transition-colors duration-300 hover:text-blue-600 ">
                095-333-409
              </a>
            </div>
            <div className="block lg:hidden">
              <Popover.Button className="focus:outline-none">
                {/* <MenuIcon className="w-8 h-8" /> */}
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1">
                <Popover.Panel className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right transform md:hidden">
                  <div className="overflow-hidden bg-white rounded-lg shadow-md p-2.5">
                    <div className="flex justify-end">
                      <Popover.Button href="/insights">
                        {/* <XIcon className="text-gray-300 w-7 h-7 hover:text-gray-600" /> */}
                      </Popover.Button>
                    </div>

                    <div className="pt-2 font-medium">
                      {navigation.map((item, i) => (
                        <a
                          key={i}
                          href="{item.href}"
                          className="block px-3 py-2 transition-colors duration-300 rounded hover:bg-gray-100 hover:text-blue-600">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
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
