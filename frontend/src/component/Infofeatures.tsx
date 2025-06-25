import { download, owner, support, template } from "../assets";

type Feature = {
  icon: string;
  title: string;
  description: string;
  // linkText: string;
};

const features: Feature[] = [
  {
    icon: template,
    title: "Ready-to-Use Templates",
    description:
      "Choose from hundreds of professionally designed logo templates",
    // linkText: "Browse Templates",
  },
  {
    icon: download,
    title: "Instant Download",
    description: "Get your logo files immediately after purchase",
    // linkText: "How it works",
  },
  {
    icon: owner,
    title: "Full Ownership Rights",
    description: "You get complete commercial rights to use your logo anywhere",
    // linkText: "Learn more",
  },
  {
    icon: support,
    title: "Creative Guidance",
    description: "Need help? Our branding experts are here to assist you",
    // linkText: "Get Support",
  },
];

const Infofeatures = () => {
  return (
    <section className="bg-gray-50 py-12 px-12">
      <div className="bg-white rounded shadow-sm p-6 sm:p-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="text-center px-4">
            <img
              src={feature.icon}
              alt={feature.title}
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-base font-semibold text-indigo-950">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
            {/* <a
              href="#"
              className="text-sm font-semibold text-indigo-950 mt-2 inline-block hover:underline"
            >
              {feature.linkText}
            </a> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Infofeatures;
