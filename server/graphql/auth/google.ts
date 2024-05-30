import type { OAuth2Client } from 'google-auth-library'

export type VerifyGoogleInputType = {
  input: {
    idToken: string
  }
}

class Google {
  private oauth2

  constructor(oauth2: OAuth2Client) {
    this.oauth2 = oauth2
  }

  verifyGoogle = async (param: VerifyGoogleInputType) => {
    const res = await this.oauth2.verifyIdToken({
      idToken: param.input.idToken,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    })
    return res
  }
}

export default Google
