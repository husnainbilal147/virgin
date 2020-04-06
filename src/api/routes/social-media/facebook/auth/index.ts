import { Router, Request, Response } from 'express';
import passport from "passport";
import strategy from "passport-facebook";
import { Container } from 'typedi';
import FacebookService from '../../../../../services/auth/social-media/FacebookService';
import LogActivityService from '../../../../../services/Logs/LogActivity';
var FB = require('fb').default;

const FacebookStrategy = strategy.Strategy;
const route = Router();

export default (app: Router) => {
  app.use('/auth/facebook', route);
  route.use(passport.initialize());

  passport.use(new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['email', 'user_posts']
      },
      function(accessToken, refreshToken, profile, done) {
        const { email, first_name, last_name } = profile._json;
        const userData = {
          email,
          firstName: first_name,
          lastName: last_name
        };
        done(null, profile);
      }
    )
  );

  route.get("/signin", passport.authenticate("facebook", { scope:['email', 'user_posts'] }));

  route.get('/callback', async (req: Request, response: Response) => {

    // const facebookService = Container.get(FacebookService);
    // const accessToken= await facebookService.GetAccessToken(req.query.code);

    FB.api('oauth/access_token', {
      client_id: process.env.FACEBOOK_CLIENT_ID ,
      client_secret: process.env.FACEBOOK_CLIENT_SECRET,
      redirect_uri: process.env.FACEBOOK_CALLBACK_URL,
      code: req.query.code
  }, function (res) {
      if(!res || res.error) {
          console.debug(!res ? 'error occurred' : res.error);
          return;
      }
  
      response.redirect(process.env.FACEBOOK_CALLBACK_URL_ACCESS_TOKEN + res.access_token);
      });
  });

  // route.get('/return', (req: Request, res: Response) => {

  //   return res.json({ 'access token: ': 'req.query.access_token' }).status(200);
  // });

  // route.get('/feed', async (req: Request, res: Response) => {

  //   // const facebookService = Container.get(FacebookService);
  //   // const accessToken= await facebookService.GetFeed(req.query.access_token);

  //   const logActivityService = Container.get(LogActivityService);
  //   logActivityService.Log(req.query.access_token);

  //   FB.setAccessToken(req.query.access_token);
  //   FB.api(
  //     "/me/feed",
  //     function (response) {
  //       if (response && !response.error) {

  //         return res.json({ 'data ': response }).status(200);
  //       }
  //     });
  // });
};
