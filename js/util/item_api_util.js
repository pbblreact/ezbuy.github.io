const google_api_key = "AIzaSyDGc_MuGwVP7WZqfHcZD4tYp_d2Wgo4-BY";
const ebay_api_key = "JayLi-EaziBuy-PRD-02217b503-cd7976e9"

const buildData = (image_url) => {
  return JSON.stringify({
    "requests":[
      {
        "image":{
        "source":{
          "imageUri": image_url
        }
      },
        "features":[
          {
            "type":"LABEL_DETECTION",
            "maxResults": 4
          }
        ]
      }
    ]
  })
}

const buildAmazonRequest = (keywords) => {
  function sha256(stringToSign, secretKey) {
  var hex = CryptoJS.HmacSHA256(stringToSign, secretKey);
  return hex.toString(CryptoJS.enc.Base64);
}

function timestamp() {
    var date = new Date();
    var y = date.getUTCFullYear().toString();
    var m = (date.getUTCMonth() + 1).toString();
    var d = date.getUTCDate().toString();
    var h = date.getUTCHours().toString();
    var min = date.getUTCMinutes().toString();
    var s = date.getUTCSeconds().toString();

    if(m.length < 2) { m = "0" + m; }
    if(d.length < 2) { d = "0" + d; }
    if(h.length < 2) { h = "0" + h; }
    if(min.length < 2) { min = "0" + min; }
    if(s.length < 2) { s = "0" + s}

    var date = y + "-" + m + "-" + d;
    var time = h + ":" + min + ":" + s;
    return date + "T" + time + "Z";
}

function getAmazonItemInfo(keywords) {
    var PrivateKey = "";
    var PublicKey = "";
    var AssociateTag = "";

    var parameters = [];
    parameters.push("AWSAccessKeyId=" + PublicKey);
    parameters.push("Keywords=" + keywords.split(" ").join("%20"));
    parameters.push("Operation=ItemSearch");
    parameters.push("ResponseGroup=Images%2CItemAttributes%2COffers");
    parameters.push("SearchIndex=All");
    parameters.push("Service=AWSECommerceService");
    parameters.push("Timestamp=" + encodeURIComponent(timestamp()));
    parameters.push("Version=2011-08-01");
    parameters.push("AssociateTag=" + AssociateTag);

    parameters.sort();
    var paramString = parameters.join('&');

    var signingKey = "GET\n" + "webservices.amazon.com\n" + "/onca/xml\n" + paramString

    var signature = sha256(signingKey,PrivateKey);
        signature = encodeURIComponent(signature);

    var amazonUrl =  "http://webservices.amazon.com/onca/xml?" + paramString + "&Signature=" + signature;
    return amazonUrl;
  }
  debugger
  return getAmazonItemInfo(keywords);
}


export const fetchLabel = (image_url) => {
  return $.ajax({
    method: 'POST',
    url: "https://vision.googleapis.com/v1/images:annotate?key=" + google_api_key,
    headers: {
      "Content-Type": "application/json",
    },
    data: buildData(image_url),
    dataType: "json"
  });
};

export const fetchEbayItems = (key_word) => {
  return $.ajax({
    method: 'GET',
    url: "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.12.0&SECURITY-APPNAME="+ebay_api_key + "&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + key_word + "&paginationInput.entriesPerPage=9",
    dataType: 'jsonp'
  });
};

export const fetchYoutubeItems = (key_words) => {
  return $.ajax({
    method: 'GET',
    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + key_words + "&type=video&maxResults=9&videoCaption=closedCaption&key="+ google_api_key
  });
};

export const fetchAmazonItems = (keywords) => {
  return $.ajax({
    method: 'GET',
    url: buildAmazonRequest(keywords),
    dataType: 'jsonp'
  });
};
