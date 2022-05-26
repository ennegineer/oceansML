var sampledata;
var selectedYear;
var selectedArea; 

// Use the D3 library to read in samples.json
d3.json("static/data/china_prediction.json").then(function (data) {
  sampledata = data;
  // let years = list of years from data
  var years = sampledata.years;
  select = document.getElementById("selDataset");
  for (let i = 0; i < years.length; i++) {
    var opt = document.createElement("option");
    row = years[i];
    opt.value = row;
    opt.innerHTML = row;
    select.appendChild(opt);
  }

  var areas = sampledata.areas;
  select = document.getElementById("selAreas");
  for (let i = 0; i < areas.length; i++) {
    var opt = document.createElement("option");
    row = areas[i];
    opt.value = row;
    opt.innerHTML = row;
    select.appendChild(opt);
  }
  
  selectedYear = sampledata.years[0];
  selectedArea = sampledata.areas[0];
  optionChanged();
});

function updateYear(selYear) {
 selectedYear = selYear;
 optionChanged();
};

function updateArea (selArea) {
  selectedArea = selArea;
  optionChanged();
};

function optionChanged() {
  // Grab the metadata for the selected year
  // Loop through the array of data
  for (let i = 0; i < sampledata.metadata.length; i++) {
    row = sampledata.metadata[i];
    // Compare value to selected argument
    if (row.year == selectedYear) {
      var sums = row.Sum;
      var cods = row.Cods.sum;
      var flounders = row.Flounders.sum;
      var herrings = row.Herrings.sum;
      var coastal = row['Coastal fishes'].sum;
      var demersal = row['Demersal fishes'].sum;
      var pelagic = row['Pelagic fishes'].sum;
      var shads = row.Shads.sum;
      var cartil = row.Cartilaginous.sum;
      var tunas = row.Tunas.sum;
    }
  }

  // year info card
  d3.select("#sample-metadata").html(`<strong>Year</strong>: ${selectedYear} <br>
            <strong>Cods</strong>: ${cods}<br>
            <strong>Flounders</strong>:  ${flounders}<br>
            <strong>Herrings</strong>: ${herrings}<br>
            <strong>Coastal fish</strong>: ${coastal}<br>
            <strong>Demersal fish</strong>: ${demersal}<br>
            <strong>Pelagic fish</strong>: ${pelagic}<br>
            <strong>Shads</strong>: ${shads}<br>
            <strong>Cartilaginous</strong>: ${cartil}<br>
            <strong>Tunas</strong>: ${tunas}<br><br>
            <strong>Total</strong>: ${sums}<br>`);

  // Create a horizontal bar chart with a dropdown menu to display the
  // fish per region
  for (let j = 0; j < sampledata.metadata.length; j++) {
    row = sampledata.metadata[j];

    // Compare value to selected argument
    if (row[1] == selectedArea) {

      // var sums = row.Sum;
      var cods = row.Cods[selectedArea];
      var flounders = row.Flounders[selectedArea];
      var herrings = row.Herrings[selectedArea];
      var coastal = row['Coastal fishes'][selectedArea];
      var demersal = row['Demersal fishes'][selectedArea];
      var pelagic = row['Pelagic fishes'][selectedArea];
      var shads = row.Shads[selectedArea];
      var cartil = row.Cartilaginous[selectedArea];
      var tunas = row.Tunas[selectedArea];
      
      // console.log(Object.keys(row).filter(name => name != "year" && name != "Sum").map((fishname) => {return row[fishname][selectedArea][0]}))
    }
  }

  // Bar chart!
  let BarData = [
    {
      type: "bar",
      x: Object.keys(row).filter(name => name != "year" && name != "Sum").map((fishname) => {return row[fishname][selectedArea][0]}),
      y: Object.keys(row).filter(name => name != "year" && name != "Sum"),
      // text: otu_labels.slice(0, 10),
      orientation: "h",
      transforms: [
        {
          type: "sort",
          target: "x",
          order: "descending",
        },
      ],
      marker: { color: "#61d1fd" },
    },
  ];
  // Render the plot to the div tag with id "bar"
  Plotly.newPlot("bar", BarData);

}
