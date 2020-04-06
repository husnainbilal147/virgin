import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import LogActivityService from '../../../../services/Logs/LogActivity';
var FB = require('fb').default;

const route = Router();

export default (app: Router) => {
  app.use('/facebook', route);

  route.get('/return', (req: Request, res: Response) => {

    return res.json({ 'access token: ': req.query.access_token }).status(200);
  });

  route.get('/feed', async (req: Request, res: Response) => {

    // const facebookService = Container.get(FacebookService);
    // const accessToken= await facebookService.GetFeed(req.query.access_token);

    const logActivityService = Container.get(LogActivityService);
    logActivityService.Log(req.query.access_token);

    FB.setAccessToken(req.query.access_token);
    FB.api(
      "/me/feed",
      function (response) {
        if (response && !response.error) {

          return res.json({ 'data ': response }).status(200);
        }
      });
  });
};
