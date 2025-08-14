module.exports = ({ env }) => {
  return {
    graphql: {
      config: {
        endpoint: "/graphql",
        shadowCRUD: true,
        playgroundAlways: false,
        defaultLimit: 100,
        depthLimit: 20,
        amountLimit: 100000,
        apolloServer: {
          tracing: false,
        },
      },
    },
    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
          baseUrl: process.env.CDN_URL,
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_ACCESS_SECRET,
          region: process.env.AWS_REGION,
          params: {
            Bucket: process.env.AWS_BUCKET,
          },
          cdn: {
            url: process.env.CDN_URL, // Replace with your CDN URL
          },
        },
        actionOptions: {
          upload: {
            beforeUpload(file: { cdnUrl: string; hash: any; ext: any }) {
              file.cdnUrl = `${process.env.CDN_URL}/${file.hash}${file.ext}`;
              return file;
            },
          },
          uploadStream: {},
          delete: {},
        },
      },
    },
    "import-export-entries": {
      enabled: true,
    },
    seo: {
      enabled: true,
    },
    //...
    'sitemap': {
    enabled: true,
    config: {
      cron: '0 0 0 * * *',
      limit: 45000,
      xsl: true,
      autoGenerate: true,
      caching: true,
      allowedFields: ['id', 'uid'],
      excludedTypes: [],
    },
  },
  };
};
