import { Service, Inject, Token } from 'typedi';
var FB = require('fb').default;

@Service()
export default class FacebookService {
 
  public async GetAccessToken(code: string){
    try {
         await FB.api('oauth/access_token', {
            client_id: process.env.FACEBOOK_CLIENT_ID ,
            client_secret: process.env.FACEBOOK_CLIENT_SECRET,
            redirect_uri: process.env.FACEBOOK_CALLBACK_URL,
            code: code
        }, function (res) {
            
            if(!res || res.error) {
                console.debug(!res ? 'error occurred' : res.error);
                return;
            }

            return res.access_token;
        });
      
    } catch (e) {
      throw e;
    }
  }
}
