import {CheckIcon} from '@heroicons/react/24/outline';

const plans = [
  {
    name: 'Basic plan',
    priceMonthly: 49,
    includedFeatures: [
      {name: 'Quia aspernatur harum.', icon: true},
      {name: 'Quia aspernatur harum.', icon: true},
      {name: 'Quia aspernatur harum.', icon: true},
      {name: 'Quia aspernatur harum.', icon: false},
      {name: 'Quia aspernatur harum.', icon: false},
      {name: 'Quia aspernatur harum.', icon: false},
    ],
    href: '#0',
  },
  {
    name: 'Premium plan',
    priceMonthly: 139,
    includedFeatures: [
      {name: 'Quia aspernatur harum.', icon: true},
      {name: 'Quia aspernatur harum.', icon: true},
      {name: 'Quia aspernatur harum.', icon: true},
      {name: 'Quia aspernatur harum.', icon: true},
      {name: 'Quia aspernatur harum.', icon: true},
      {name: 'Quia aspernatur harum.', icon: true},
    ],
    href: '#0',
  },
];

export const Plans = () => {
  return (
    <section className="py-12 lg:py-16 xl:py-28">
      <div className="container px-5 mx-auto">
        <div className="grid gap-6 lg:gap-10 xl:grid-cols-3">
          <div className="space-y-2 lg:space-y-4">
            <h2 className="text-2xl font-black sm:text-3xl">
              Our services and plans
            </h2>
            <p className="w-full text-gray-600 sm:w-1/2 xl:w-80 md:text-lg">
              Provident recusandae repellendus beatae autem veniam perspiciatis
              et.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:gap-10 xl:col-span-2">
            {plans.map((plan, i) => (
              <div
                key={i}
                className="p-5 space-y-5 transition-shadow duration-200 bg-white shadow rounded-xl hover:shadow-lg md:p-8">
                <div className="flex justify-between">
                  <h3 className="text-xl font-medium">{plan.name}</h3>
                  <div className="">
                    <span className="text-xl font-medium">
                      ${plan.priceMonthly}
                    </span>
                    <span className="text-gray-400">/mo</span>
                  </div>
                </div>
                <div className="border-t border-gray-200"></div>
                <div className="space-y-2.5">
                  {plan.includedFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-5">
                      {feature.icon === true ? (
                        <CheckIcon className="w-6 h-6 mr-4 text-blue-500" />
                      ) : (
                        <CheckIcon className="w-6 h-6 mr-4 text-gray-400" />
                      )}
                      {feature.name}
                    </div>
                  ))}
                </div>
                <a
                  href={plan.href}
                  className="block w-full py-3 font-semibold text-center text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600">
                  Choose Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
