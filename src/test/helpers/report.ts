const report = require("multiple-cucumber-html-reporter");

//handle report work
report.generate({
  jsonDir: "./report/",
  reportPath: "./report/",
  metadata: {
    browser: {
      name: "chrome",
      version: "60",
    },
    device: "Local test machine",
    platform: {
      name: "window",
      version: "16.04",
    },
  },
  customData: {
    title: "PWO Automated Tests",
    data: [
      { label: "Project", value: "PWO Automated Tests" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "B11221.34321" },
      { label: "Execution Start Time", value: "Nov 19th 2017, 02:31 PM EST" },
      { label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
    ],
  },
});