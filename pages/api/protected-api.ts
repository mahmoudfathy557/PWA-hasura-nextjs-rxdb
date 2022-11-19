import { withApiAuthRequired, getSession, getAccessToken, Session } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

// Serverless function
// Protected API, requests to '/api/protected' without a valid session cookie will fail

type GetSession = {
 user: Session | null | undefined,
 idToken: Session | null | undefined,
 accessToken: Session | null | undefined,
}

async function handle(req: NextApiRequest, res: NextApiResponse) {
 const { user, idToken, accessToken }: GetSession = getSession(req, res)




 // Verifying JWT Token to see if it's valid

 var client = jwksClient({
  jwksUri: 'https://dev-uehvkpra.us.auth0.com/.well-known/jwks.json'
 });
 function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
   var signingKey = key.publicKey || key.rsaPublicKey;
   callback(null, signingKey);
  });
 }

 jwt.verify(idToken, getKey, { complete: true }, function (err, decoded) {
  if (err) {

   return res.status(401).json({
    error: err.message,
    session: 'true',

    id: user.sub,
    nickname: user.nickname,
    accessToken,
    idToken
   })

  }

  try {
   res.status(200).json({
    session: 'true',
    id: user.sub,
    nickname: user.nickname,
    accessToken,
    idToken
   })
  } catch (e) {
   res.status(500).json({ error: 'Unable to fetch', description: e })
  }

 });





}

export default withApiAuthRequired(handle)
