#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const app = new cdk.App();
new InfrastructureStack(app, 'InfrastructureStack', {
  env: {
     account: "166739014910",
     region: 'us-east-1' // Annoyingly, CF only accepts certs that are in us-east-1. Just deploy everything there to avoid cross-region dependencies
  }
});