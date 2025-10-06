const { nanoid } = require('nanoid')
const {URL} = require('../models/url')
async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({error: "url is required"})
    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })
    // return res.status(201).json({id: shortId})
    return res.render('home', {
      id: shortId,
    })
}

async function handleSetUrl(req, res) {
  try {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timeStamp: Date.now(),
          },
        },
      },
      { new: true } // return updated document
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(entry.redirectURL);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId})
    return res.json({totalclicks: result.visitHistory.length, analytics: result.visitHistory})
}

module.exports = {
    handleGenerateNewShortUrl,
    handleSetUrl,
    handleGetAnalytics
}