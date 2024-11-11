// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(data);
    // get the metadata field
let metadata = data.metadata;
console.log(metadata);

    // Filter the metadata for the object with the desired sample number
    let result = metadata.filter(sampleObj => sampleObj.id == sample)[0];
    console.log(result);

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (let [key, value] of Object.entries(result)) {
      console.log(`Appending metadata: ${key} = ${value}`);
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    }
  });
}


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(function (data) {
    console.log(data);

    // Get the samples field
    let samples = data.samples;
    console.log(samples);

    // Filter the samples for the object with the desired sample number
    let result = samples.filter(sampleObj => sampleObj.id == sample)[0];
    console.log(result);

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;
    console.log(otu_ids);
    console.log(otu_labels);
    console.log(sample_values);

    let topOtuIds = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    let topSampleValues = sample_values.slice(0, 10).reverse();
    let topOtuLabels = otu_labels.slice(0, 10).reverse();
    console.log(topOtuIds);
    console.log(topOtuLabels);
    console.log(topSampleValues);

    // Build a Bubble Chart
    let bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth",
        line: {
          color: 'black',   
          width: 0.5         
        }
      }
    };
    let bubbleData = [bubbleTrace];
    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Number of Bacteria" },
      hovermode: "closest"
    };
    console.log(bubbleData);
    console.log(bubbleLayout);

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    // Render the Bar Chart
    let barTrace = {
      x: topSampleValues,
      y: topOtuIds,
      text: topOtuLabels,
      type: "bar",
      orientation: "h"
    };

    let barData = [barTrace];
    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: "Number of Bacteria" }
    };
    console.log(barData);
    console.log(barLayout);


    Plotly.newPlot("bar", barData, barLayout);
  });
}




    // Function to run on page load
    function init() {
      d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        console.log(data);
        // Get the names field
        let sampleNames = data.names;
        console.log(sampleNames);
        // Use d3 to select the dropdown with id of `#selDataset`
        // Use the list of sample names to populate the select options
        // Hint: Inside a loop, you will need to use d3 to append a new
        // option for each sample name.
        let dropdown = d3.select("#selDataset");
        sampleNames.forEach((sample) => {
          dropdown.append("option").text(sample).property("value", sample);
        });

        // Get the first sample from the list
        // Build charts and metadata panel with the first sample
        let firstSample = sampleNames[0];
        console.log(firstSample);
        buildCharts(firstSample);
        buildMetadata(firstSample);
      });
    }


    // Function for event listener
    function optionChanged(newSample) {
      console.log(newSample);
      // Build charts and metadata panel each time a new sample is selected
      buildCharts(newSample);
      buildMetadata(newSample);
    }

    // Initialize the dashboard
    init();
  
