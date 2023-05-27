export type ScanResult = {
  data: Array<{
    name: string;
    version: string;
    dockerImage: string;
    sbomFile: string;
    results: Array<{
      label: string;
      version: string;
    }>;
  }>;
};

export const ScanResult: ScanResult = {
  data: [
    {
      name: "project-d-circleci",
      version: "latest",
      dockerImage: "project-d-circleci:latest",
      sbomFile: "33.cyclonedx.json",
      results: [
        {
          label: "@babel/plugin-transform-react-jsx-self",
          version: "7.21.0",
        },
        {
          label: "@babel/plugin-transform-react-jsx-source",
          version: "7.19.6",
        },
        {
          label: "@vitejs/plugin-react",
          version: "3.1.0",
        },
      ],
    },
  ],
};
