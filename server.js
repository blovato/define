import bodyParser from 'body-parser';
import { fetchUrl } from 'fetch';
import express from 'express';
const app = express();

const slackToken = process.env.SLACK_TOKEN;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.post('/define', (req, res) => {
  const { text, token, user_name } = req.body;
  if (!text) return res.sendStatus(400);
  if (token !== slackToken) return res.sendStatus(401);
  console.log(`${user_name} asked to define '${text}'`);

  fetchUrl(`https://owlbot.info/api/v1/dictionary/${text}?format=json`, (error, meta, body) => {
    const parsedBody = JSON.parse(body.toString()) || [];
    if (!parsedBody.length) return res.sendStatus(400);

    const attachments = parsedBody.map((definition, index) => {
      // the person who wrote this api spelled 'definition' wrong :(
      return {
        title: `${text} (${definition.type})`,
        title_link: `https://www.merriam-webster.com/dictionary/${text}`,
        text: ': ' + definition.defenition,
        footer: definition.example || '',
        color: "#c33f47",
      };
    });

    res.send({
      response_type: 'in_channel',
      attachments: attachments || null,
      "ts": new Date(),
    });
  });
});

const port = process.env.PORT || 3700;

app.listen(port, () => {
  console.info(`server running at localhost:${port}`);
});
