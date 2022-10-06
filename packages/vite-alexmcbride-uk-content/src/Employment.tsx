import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";

export function Employment() {
    return (
        <Stack sx={{ width: [1, 1, 1, 1, 2 / 3] }} spacing={1}>
            <Typography variant="h2">Employment</Typography>
            <Card>
                <CardHeader title="AdMargin" subheader="Contractor (Part-time), June 2022 - Present"/>
                <CardContent>
                    I am currently working as a part-time contractor with AdMargin. AdMargin is a digital signage and advertising solution used in the retail, corporate, and hospitality industries.
                </CardContent>
            </Card>
            <Card>
                <CardHeader title="Amazon" subheader="Software Development Engineer, July 2016 - March 2022"/>
                <CardContent>
                    <Typography>I have worked across a wide range of Amazon business areas including Advertising (targeting, reporting, analysis), HR applications, and Amazon Registry Services (managing gTLDs). Some of my most impactful deliveries include:</Typography>
                    <ul>
                        <li>Identified and implemented optimization in key advertising targeting system resulting in a 60% descaling of fleet size and $mm yearly cost savings.</li>
                        <li>Led replacement of online ML model-based advertising targeting system to an offline, batch system. This saved considerably on hardware costs and permitted much more complex modelling techniques to be used in the future.</li>
                        <li>Delivered a new type of advertising audience for endemic customers based on a model which matches customers and products with the highest propensity of purchase. Conversion results are significantly higher than traditional rule-based approaches.</li>
                        <li>Optimized audience overlap report generation to reduce computed overlaps by a factor of 100 using permission-aware filtering.</li>
                        <li>Delivered a new web-based advertising performance reporting tool to replace legacy Excel-based system. Initally rolled out to internal account managers, it received overwhelmingly positive feedback before being rolled out for advertiser self-service use in the Amazon DSP.</li>
                        <li>Worked on launching .moi and .bot, two new gTLDs operated by Amazon Registry Services. Worked with third-party registrars and registry back-end operators while complying with strict legal and data protection requirements.</li>
                    </ul>
                    <Typography>I left Amazon at the end of March 2022 to take a 3 month sabbatical.</Typography>
                </CardContent>
            </Card>
            <Card>
                <CardHeader title="Edesix" subheader="Software Developer, 2012-2015"/>
                <CardContent>
                    <Typography>Edesix makes body-worn video cameras for healthcare, law enforcement, and retail organizations. I worked for Edesix full-time for a year before enrolling at Strathclyde University, and worked there every summer between academic years. Edesix was acquired in 2018 and is now part of Motorola Solutions.</Typography>
                </CardContent>
            </Card>
        </Stack>
    )
}