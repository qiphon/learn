report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../../../backstop_data/bitmaps_reference/backstop_default_map_0_document_0_phone.png",
        "test": "../../../backstop_data/bitmaps_test/20200111-200536/backstop_default_map_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_map_0_document_0_phone.png",
        "label": "map",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.38",
          "analysisTime": 20
        },
        "diffImage": "../../../backstop_data/bitmaps_test/20200111-200536/failed_diff_backstop_default_map_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../../../backstop_data/bitmaps_reference/backstop_default_map_0_document_1_ipad.png",
        "test": "../../../backstop_data/bitmaps_test/20200111-200536/backstop_default_map_0_document_1_ipad.png",
        "selector": "document",
        "fileName": "backstop_default_map_0_document_1_ipad.png",
        "label": "map",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "ipad",
        "error": "Reference file not found /run/media/qiphon/新加卷/qiphon/mygit/yd-learn/docs/js&qa/demo/yd-qa/backstop_data/bitmaps_reference/backstop_default_map_0_document_1_ipad.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});