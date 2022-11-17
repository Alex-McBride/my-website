import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

export function Employment() {
  return (
    <Stack sx={{ width: [1, 1, 1, 1, 2 / 3] }} spacing={1}>
      <Typography variant="h2">Employment</Typography>
      <Card>
        <CardHeader
          title="AdMargin"
          subheader="Contractor (Part-time), June 2022 - Present"
        />
        <CardContent>
          I am currently working as a part-time contractor with AdMargin.
          AdMargin is a digital signage and advertising solution used in the
          retail, corporate, and hospitality industries.
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          title="Amazon"
          subheader="Software Development Engineer II, July 2016 - March 2022"
        />
        <CardContent>
          <Typography>
            I have worked across a wide range of Amazon business areas including
            Advertising (targeting, reporting, analysis), HR applications, and
            Amazon Registry Services (managing gTLDs). Some of my most impactful
            deliveries include:
          </Typography>
          <ul>
            <li>
              Led replacement of Amazon Advertising's ML model-based advertising
              targeting system evaluating 10s of millions of customers a day.
              Wrote critical-path model evaluation code, negotiated
              multi-stakeholder buy-in for necessary changes in interlinked
              systems, and coordinated final testing and flipover to the new
              system. This reduced hardware costs by 40%, significantly reduced
              operational load, and unlocked use of state-of-the-art modelling
              approaches to improve targeting performance.
            </li>
            <li>
              Identified and implemented optimization in a key advertising
              targeting system which was quickly approaching hard scaling
              limits. This reduced CPU load dramatically, resulting in a 60%
              descaling of fleet size (over a million dollar saving on yearly
              hardware expenditure), and freed up engineering resources
              previously assigned to optimise this system to work on
              rearchitecting it to avoid hitting that scaling limit. The yearly
              savings of expenditure because of my change was 10% of an
              organisation-wide savings goal to increase free cash flow.
            </li>
            <li>
              Delivered a new type of advertising audience for endemic customers
              based on a model which matches customers and products with the
              highest propensity of purchase, based on their Amazon activity.
              Conversion results were significantly higher than traditional
              rule-based targeting approaches.
            </li>
            <li>
              Worked on launching .moi and .bot, two new gTLDs operated by
              Amazon Registry Services. Worked with third-party registrars and
              registry back-end operators while complying with strict legal and
              data protection requirements.
            </li>
          </ul>
          <Typography>
            I left Amazon at the end of March 2022 to take a 3 month sabbatical.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Edesix" subheader="Software Developer, 2012-2015" />
        <CardContent>
          <Typography>
            Edesix makes body-worn video cameras for healthcare, law
            enforcement, and retail organizations. My key deliveries include:
          </Typography>
          <ul>
            <li>
              Prototyped an Android client app and Linux server running on the
              body-worn video camera to allow viewing of recordings while out in
              the field. Delivered solution under challenging hardware
              constraints (200MHz ARM processor, limited storage space) which
              involved performing real-time transcoding of video container
              format from the proprietary one on the camera to MKV.
            </li>
            <li>
              Wrote the software for a project Edesix delivered for Ingenico,
              one of the world's leading payment terminal manufacturers. The
              software controlled a charge/discharge circuit to cycle batteries
              on returned payment terminals, determining if they needed to be
              replaced. In the first year over 200,000 batteries were tested
              that would otherwise have been thrown away, generating
              environmental and cost savings.
            </li>
          </ul>
          <Typography>
            I worked for Edesix full-time from 2012-2013 before enrolling at
            Strathclyde University, and was invited back to Edesix to work there
            every summer between semesters.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
