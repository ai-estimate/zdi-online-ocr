import {CalculatorIcon, BriefcaseIcon} from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Step one',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos nesciunt repellat distinctio.',
    // icon: ChatIcon,
  },
  {
    title: 'Step two',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos nesciunt repellat distinctio.',
    // icon: ClipboardListIcon,
  },
  {
    title: 'Step three',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos nesciunt repellat distinctio.',
    icon: CalculatorIcon,
  },
  {
    title: 'Step four',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos nesciunt repellat distinctio.',
    icon: BriefcaseIcon,
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-12 lg:py-16 xl:py-28">
      <div className="container px-5 mx-auto">
        <div className="grid gap-6 lg:gap-10 xl:grid-cols-3">
          <div className="space-y-2 lg:space-y-4">
            <h2 className="text-2xl font-black sm:text-3xl">How it works</h2>
            <p className="w-full text-gray-600 sm:w-1/2 xl:w-80 md:text-lg">
              Voluptates aliquid est labore dignissimos similique incidunt porro
              temporibus. Omnis commodi dolorem.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:gap-10 xl:col-span-2">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative p-5 space-y-2 transition-shadow duration-200 bg-white shadow rounded-xl hover:shadow-lg md:p-8">
                <dt>
                  <div className="absolute flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
                    {/* <step.icon className="w-6 h-6" /> */}
                  </div>
                  <p className="ml-16 text-xl font-medium">{step.title}</p>
                </dt>
                <dd className="ml-16 text-gray-500">{step.description}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
