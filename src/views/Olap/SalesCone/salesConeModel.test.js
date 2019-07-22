import salesConeModel from "./salesConeModel";


it('dynamicCUP converting', () => {

  let data = {
      "headerColumns": [
        [
          {
            "index": 0,
            "name": "[Подразделения].[Подразделение]",
            "UName": null,
            "Caption": "Подразделение",
            "LName": null,
            "LNum": null,
            "DisplayInfo": null
          }
        ],
        [
          {
            "index": 0,
            "hierarchy": "[Даты].[Дата]",
            "UName": "[Даты].[Дата].&[2018-06-11T00:00:00]",
            "Caption": "11.06.2018",
            "LName": "[Даты].[Дата].[Дата]",
            "LNum": 1,
            "DisplayInfo": 0
          }
        ],
        [
          {
            "index": 0,
            "hierarchy": "[Даты].[Дата]",
            "UName": "[Даты].[Дата].&[2018-06-12T00:00:00]",
            "Caption": "12.06.2018",
            "LName": "[Даты].[Дата].[Дата]",
            "LNum": 1,
            "DisplayInfo": 131072
          }
        ],
        [
          {
            "index": 0,
            "hierarchy": "[Даты].[Дата]",
            "UName": "[Даты].[Дата].&[2018-06-13T00:00:00]",
            "Caption": "13.06.2018",
            "LName": "[Даты].[Дата].[Дата]",
            "LNum": 1,
            "DisplayInfo": 131072
          }
        ],
        [
          {
            "index": 0,
            "hierarchy": "[Даты].[Дата]",
            "UName": "[Даты].[Дата].&[2018-06-14T00:00:00]",
            "Caption": "14.06.2018",
            "LName": "[Даты].[Дата].[Дата]",
            "LNum": 1,
            "DisplayInfo": 131072
          }
        ],
        [
          {
            "index": 0,
            "hierarchy": "[Даты].[Дата]",
            "UName": "[Даты].[Дата].&[2018-06-15T00:00:00]",
            "Caption": "15.06.2018",
            "LName": "[Даты].[Дата].[Дата]",
            "LNum": 1,
            "DisplayInfo": 131072
          }
        ],
        [
          {
            "index": 0,
            "hierarchy": "[Даты].[Дата]",
            "UName": "[Даты].[Дата].&[2018-06-16T00:00:00]",
            "Caption": "16.06.2018",
            "LName": "[Даты].[Дата].[Дата]",
            "LNum": 1,
            "DisplayInfo": 131072
          }
        ],
        [
          {
            "index": 0,
            "hierarchy": "[Даты].[Дата]",
            "UName": "[Даты].[Дата].&[2018-06-17T00:00:00]",
            "Caption": "17.06.2018",
            "LName": "[Даты].[Дата].[Дата]",
            "LNum": 1,
            "DisplayInfo": 131072
          }
        ],
      ],
      "rows": [
        [
          {
            "index": 0,
            "hierarchy": "[Подразделения].[Подразделение]",
            "UName": "[Подразделения].[Подразделение].[Общий КУП]",
            "Caption": "Общий КУП",
            "LName": "[Подразделения].[Подразделение].[(All)]",
            "LNum": 0,
            "DisplayInfo": 0
          },
          {
            "Value": "1.4798E2",
            "FmtValue": "147,98",
            "ordinal": 0
          },
          {
            "Value": "1.6723E2",
            "FmtValue": "167,23",
            "ordinal": 1
          },
          {
            "Value": "1.7052E2",
            "FmtValue": "170,52",
            "ordinal": 2
          },
          {
            "Value": "1.5839E2",
            "FmtValue": "158,39",
            "ordinal": 3
          },
          {
            "Value": "1.4889E2",
            "FmtValue": "148,89",
            "ordinal": 4
          },
          {
            "Value": "1.5927E2",
            "FmtValue": "159,27",
            "ordinal": 5
          },
          {
            "Value": "1.8736E2",
            "FmtValue": "187,36",
            "ordinal": 6
          }
        ],,
        [
          {
            "index": 0,
            "hierarchy": "[Подразделения].[Подразделение]",
            "UName": "[Подразделения].[Подразделение].&[208]",
            "Caption": "Минимаркет 08",
            "LName": "[Подразделения].[Подразделение].[Подразделение]",
            "LNum": 1,
            "DisplayInfo": 0
          },
          {
            "Value": "2.5135E2",
            "FmtValue": "251,35",
            "ordinal": 7
          },
          {
            "Value": "2.0117E2",
            "FmtValue": "201,17",
            "ordinal": 8
          },
          {
            "Value": "2.5774E2",
            "FmtValue": "257,74",
            "ordinal": 9
          },
          {
            "Value": "1.61E2",
            "FmtValue": "161",
            "ordinal": 10
          },
          {
            "Value": "1.8771E2",
            "FmtValue": "187,71",
            "ordinal": 11
          },
          {
            "Value": "1.8917E2",
            "FmtValue": "189,17",
            "ordinal": 12
          },
          {
            "Value": "2.0393E2",
            "FmtValue": "203,93",
            "ordinal": 13
          }
        ],
      ],
    }

  let res = salesConeModel.convertTableDataToChartData(data);
  expect(res.labels.length).toEqual(7);

})
