# /define slack slash command

> `/define [word]`
> A slack slash integration for getting the dictionary definition of words

![Example](https://github.com/blovato/define/raw/master/screenshots/define.png "define example result")

## Development

Install Dependencies

```bash
$ npm install
```

### Running Locally with Slack

1. Start the express server by running:

    ```bash
    $ npm start
    ```

2. Start a server tunneling service like [ngrok](https://ngrok.com/) to expose a public url that Slack can request from.

3. Configure a [slack slash command](https://api.slack.com/custom-integrations) for a slack team that you have permissions to in, which points to your running ngrok tunnel (ex. `http://942b2fa3.ngrok.io/define`).

4. :rocket: In your slack team messages and channels you should have access to the `/define [word]` command.