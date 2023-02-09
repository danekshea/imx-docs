const { url } = require('../docusaurus.config');

module.exports = {
  mainSidebar: [
    {
      type: 'category',
      label: 'Core SDK C Sharp',
      items: [
        "overview",
        "installation",
        "initialization",
        "additional-info",
        {
          type: 'link',
          label: 'Examples',
          href: `https://github.com/immutable/imx-core-sdk-csharp/tree/v0.1.1/Src/Examples`,
        },
        {
          type: 'link',
          label: 'API client Reference',
          href: `${url}/sdk-references/core-sdk-csharp/0-1-1/apiclient`,
        },
        {
          type: 'link',
          label: 'Package reference',
          href: `https://www.nuget.org/packages/Imx.Sdk`,
        },
        {
          type: 'link',
          label: 'Github',
          href: `https://github.com/immutable/imx-core-sdk-csharp/tree/v0.1.1`,
        },
      ],
    },
  ],
};
