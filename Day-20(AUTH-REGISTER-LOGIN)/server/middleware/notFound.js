const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route not found: ${req.originalUrl}`,
      statusCode: 404,
      details: []
    }
  });
};

module.exports = notFound;