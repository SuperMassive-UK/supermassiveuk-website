/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "supermassiveuk-website",
      // removal: input?.stage === "production" ? "retain" : "remove",
      // protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: "dev-admin",
        },
      },
    };
  },
  async run() {
    const crossAccountRoleArnSecret = new sst.Secret("DomainRoleArn");

    // Define the cross-account provider (root account)
    const rootAccountProvider = new aws.Provider("rootAccountProvider", {
      assumeRole: {
        roleArn: crossAccountRoleArnSecret.value, // Replace with your Role ARN
        sessionName: "SstDeploymentSession",
        externalId: "SstDeployment", // Include if you set an External ID
      },
      region: "eu-west-1", // Route 53 is a global service, but Pulumi requires a region
    });

    const supermassiveUkHostedZoneIdSecret = new sst.Secret(
      "SuperMassiveUkHostedZoneId",
    );

    const acmCert = new sst.Secret("AcmCert");

    const astroSite = new sst.aws.Astro("SuperMassiveUK", {
      domain: {
        name: "supermassive.uk",
        dns: false,
        cert: acmCert.value,
        aliases: ["www.supermassive.uk"],
      },
      warm: 3,
      regions: ["eu-west-1", "eu-west-2"],
    });

    const cloudFrontDomain = astroSite.nodes.cdn?.url; // Replace this!

    if (!cloudFrontDomain) {
      throw new Error("No cloud front domain");
    }

    const rootDomainRecord = new aws.route53.Record(
      "supermassiveRootAlias",
      {
        zoneId: supermassiveUkHostedZoneIdSecret.value,
        name: "supermassive.uk",
        type: "A",
        aliases: [
          {
            name: cloudFrontDomain.apply((domain) =>
              domain.replace(/^https?:\/\//, ""),
            ),
            zoneId: "Z2FDTNDATAQYW2", // CloudFront hosted zone ID
            evaluateTargetHealth: false,
          },
        ],
      },
      { provider: rootAccountProvider },
    );

    const wwwRecord = new aws.route53.Record(
      "supermassiveWwwCname",
      {
        zoneId: supermassiveUkHostedZoneIdSecret.value,
        name: "www.supermassive.uk",
        type: "CNAME",
        ttl: 300,
        records: [
          cloudFrontDomain.apply((domain) =>
            domain.replace(/^https?:\/\//, ""),
          ),
        ],
      },
      { provider: rootAccountProvider },
    );
  },
});
