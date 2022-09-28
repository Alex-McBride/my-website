import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import { DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { CloudFrontWebDistribution, HttpVersion, OriginAccessIdentity, ViewerCertificate } from 'aws-cdk-lib/aws-cloudfront';
import { ARecord, HostedZone, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { BlockPublicAccess, Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';


export class InfrastructureStack extends cdk.Stack {
  private domainName = "alexmcbride.uk";

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const zone = HostedZone.fromLookup(this, "Zone", { domainName: this.domainName });
    const originAccessIdentity = new OriginAccessIdentity(this, "CloudFront-OAI", {
      comment: `For ${this.domainName}`
    })

    const contentBucket = new Bucket(this, "ContentBucket", {
      bucketName: this.domainName,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      // Happy to accept risk of deleting the bucket and taking down my site to make it easier to iterate on this
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY
    });

    contentBucket.grantRead(originAccessIdentity);

    const tlsCert = new DnsValidatedCertificate(this, "SiteCert", {
      domainName: this.domainName,
      subjectAlternativeNames: [`www.${this.domainName}`],
      hostedZone: zone,
      region: 'us-east-1' // CF annoyingly only supports certs present in us-east-1...
    });

    const distribution = new CloudFrontWebDistribution(this, "CloudFrontDistribution", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: contentBucket,
            originAccessIdentity,
          },
          behaviors: [{ isDefaultBehavior: true }]
        },
      ],
      errorConfigurations: [{
        errorCode: 404,
        responsePagePath: "/404.html",
        responseCode: 404
      }],
      httpVersion: HttpVersion.HTTP2_AND_3, // Shiny new HTTP3 support
      viewerCertificate: ViewerCertificate.fromAcmCertificate(tlsCert, { aliases: [this.domainName, `www.${this.domainName}`]})
    });

    this.addDnsRecords(zone, RecordTarget.fromAlias(new CloudFrontTarget(distribution)));

    new BucketDeployment(this, "BucketDeployment", {
      destinationBucket: contentBucket,
      sources: [
        Source.asset("../vite-alexmcbride-uk-content/dist")
      ],
      distribution
    });
  }

  private addDnsRecords(zone: IHostedZone, cfTarget: RecordTarget) {
    // Point our domain to our CF distribution
    new ARecord(this, "DomainToCfARecord", {
      zone,
      target: cfTarget,
    });
    // TODO add more records (MX for mail?)
  }
}
