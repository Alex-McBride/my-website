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
      <Typography variant="body2">
        Kotlin, Java, Scala, Typescript, Javascript, Python, SQL
      </Typography>
    </SkillCard>
    <SkillCard title="Platforms and Frameworks">
      <Typography variant="body2">
        AWS, Infrastructure As Code (CloudFormation, CDK), Spark, ElasticSearch,
        React
      </Typography>
    </SkillCard>
    <SkillCard title="Methodologies">
      <Typography variant="body2">
        Continuous Deployment, Petabyte-scale DataLakes, Profiling and
        Optimisation, A/B Testing and Experimentation, Distributed Systems,
        Machine Learning
      </Typography>
    </SkillCard>
    <SkillCard title="Other Skills">
      <Typography variant="body2">
        I am learning 🇸🇪 Swedish (currently CEFR A2/B1 level)
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
