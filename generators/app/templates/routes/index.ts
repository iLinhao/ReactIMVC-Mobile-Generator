import os from 'os';

export function test(app: {
  use: (pattern?: string, ...args: Function[]) => void
}) {
  app.use('/test', (req, res, next) => {
    const address = os.networkInterfaces()?.WLAN?.[1]?.address
    res.json(address)
  })
}
