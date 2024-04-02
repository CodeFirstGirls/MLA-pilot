import { SignJWT, jwtVerify } from 'jose'

export const generateToken = async (username: string) => {
  const jwt = await new SignJWT({ username: username })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .setIssuer('CFGAUTH')
    .setAudience('CFG')
    .sign(new TextEncoder().encode(process.env.JWT_SIGNING_KEY))
  console.log(jwt)
  return jwt
}

export const validateToken = async (token: string) => {
  const body = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SIGNING_KEY),
    { audience: 'CFG', issuer: 'CFGAUTH' },
  )
  return body
}

const test = async () => {
  const jwt = await generateToken('jeff')
  console.log(jwt)
  console.log(await validateToken(jwt))
}
