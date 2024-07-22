const ShortedURL = require("../modal/urlsshortner.modal");
const generateShortURL = async (req, res) => {
  try {
    const { originalurl } = req.body;

    if (!originalurl) {
      return res.status(400).json({ message: "Original URL is required" });
    }
    // Dynamically import nanoid
    const { nanoid } = await import('nanoid');
    const shorID = nanoid(10);

    const generatedShorturl = await ShortedURL.create({
      originalurl,
      shortUrl: shorID,
    });
    return res.status(201).json(generatedShorturl);
  } catch (error) {
    console.error("Error generating short URL:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

const getShortURL = async(req, res)=> {

    try {
        const urls = await ShortedURL.find({})
        return res.status(200).json(urls)
    } catch (error) {
        
    }

}

module.exports = {generateShortURL, getShortURL};
