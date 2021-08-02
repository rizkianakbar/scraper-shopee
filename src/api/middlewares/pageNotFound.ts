const notfound = (req: any, res: any): 404 => {
  const requestedUrl = req.originalUrl;
  const method = req.method;

  return JSON.parse(
    res.status(404).json({
      status: 404,
      message: 'Routes not found',
      url: requestedUrl,
      method: method,
    }),
  ) as 404;
};
export default notfound;
