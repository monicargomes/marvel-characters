const PRIV_KEY = //private key;
const PUBLIC_KEY = "ff0a364af171967c9afa65f48246de25";

function getUrl() {
  let ts = new Date().getTime();
  let hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  let url = "ts="+ts+"&apikey="+PUBLIC_KEY+"&hash="+hash;

  return url;
};
