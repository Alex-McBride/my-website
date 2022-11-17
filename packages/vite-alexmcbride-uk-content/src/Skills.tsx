import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { ReactNode } from "react";

const SkillCard = (props: { title: string; children: ReactNode }) => (
  <Grid xs={12} sm={6}>
    <Card sx={{ height: "100%" }}>
      <CardHeader title={props.title} />
      <CardContent>{props.children}</CardContent>
    </Card>
  </Grid>
);

const SkillsGrid = () => (
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    <SkillCard title="Languages">
      <Typography>
        Kotlin, Java, Scala, TypeScript, JavaScript, Python, SQL; prior
        experience in C/C++, C#.
      </Typography>
    </SkillCard>
    <SkillCard title="Technologies">
      <Typography>
        AWS (wide variety of services), Infrastructure As Code (CloudFormation,
        CDK), Spark, ElasticSearch, React, Spring, Selenium, Cypress, Gradle,
        Git, Linux.
      </Typography>
    </SkillCard>
    <SkillCard title="Methodologies">
      <Typography>
        Continuous Deployment, Petabyte-scale DataLakes, Profiling and
        Optimisation, A/B Testing and Experimentation, Distributed Systems,
        Machine Learning (deep unsupervised clustering).
      </Typography>
    </SkillCard>
    <SkillCard title="Other Skills">
      <Typography>
        I am learning 🇸🇪 Swedish (currently CEFR A2/B1 level).
      </Typography>
    </SkillCard>
  </Grid>
);

export function Skills() {
  return (
    <Box sx={{ width: [1, 1, 1, 1, 2 / 3] }}>
      <Typography variant="h2">Skills</Typography>
      <SkillsGrid />
    </Box>
  );
}
